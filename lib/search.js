"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const eSearchException_1 = require("./eSearchException");
class SearchImpl {
    static createQueryBuilder(tableName = "searchlist", config, client) {
        if (_.isEmpty(config) || _.isUndefined(config)) {
            throw new eSearchException_1.ESearchException(403, "未定义搜索配置文件");
        }
        //TODO: 检查client
        const instance = new SearchImpl();
        instance.config = _.get(config, 'mwcSearch.searchItems', null);
        instance.init();
        instance.table(tableName);
        instance.searchClient = client;
        return instance;
    }
    field(fields, append = true) {
        if (!append) {
            this.fields = fields;
        }
        else {
            this.fields.push(...fields);
        }
        return this;
    }
    where(condition, operate, value) {
        if (!_.isUndefined(value) && !_.isUndefined(operate)) {
            if (_.isArray(condition)) {
                return this;
            }
            if ((operate === "IN" || operate == "NOT IN") && _.isArray(value)) {
                this.where(`${condition} ${operate} ("${value.join('","')}")`);
            }
            else if (_.isNumber(value)) {
                this.where(`${condition} ${operate} ${value}`);
            }
            else if (_.isString(value)) {
                value = value.replace(/[\"\'\\]/g, '');
                this.where(`${condition} ${operate} "${value}"`);
            }
            else {
                throw new eSearchException_1.ESearchException(403, "查询条件不符合规范");
            }
            return this;
        }
        if (!_.isUndefined(operate)) {
            if (_.isArray(condition)) {
                return this;
            }
            if (_.isNumber(operate)) {
                this.where(`${condition}=${operate}`);
            }
            else if (_.isString(operate)) {
                operate = operate.replace(/[\"\'\\]/g, '');
                this.where(`${condition}="${operate}"`);
            }
            return this;
        }
        if (_.isArray(condition)) {
            this.conditionItems.push(...condition);
        }
        else if (_.isString(condition)) {
            this.conditionItems.push(condition);
        }
        return this;
    }
    orWhere(condition) {
        if (_.isArray(condition) && condition.length) {
            this.conditionItems.push(`(${condition.join(') OR (')})`);
        }
        return this;
    }
    order(sort, sortType) {
        if (_.isUndefined(sortType)) {
            //检查排序
            if (_.isString(sort)
                && (_.indexOf(sort, " ") > 0
                    || _.indexOf(_.toUpper(sort), "ASC") > 0
                    || _.indexOf(_.toUpper(sort), "DESC") > 0)) {
                this.sortItem = sort;
                return this;
            }
            this.sortItem = _.toString(_.get(this.config, `sortItem.${sort}`, this.sortItem));
        }
        else {
            this.sortItem = `${sort} ${_.toString(sortType)}`;
        }
        return this;
    }
    /**
     * 分页
     * @param start
     * @param limit
     */
    limit(start, limit) {
        if (_.isUndefined(limit)) {
            this.offset = 0;
            this.limitNum = start;
        }
        else if (_.isNumber(limit)) {
            this.offset = start;
            this.limitNum = limit;
        }
        return this;
    }
    /**
     * 分页
     * @param page
     * @param pageSize
     */
    page(page, pageSize = 20) {
        page = _.toInteger(page);
        pageSize = _.toInteger(pageSize);
        page = page < 1 ? 1 : page;
        pageSize = pageSize < 1 ? 20 : pageSize;
        this.offset = (page - 1) * pageSize;
        this.limitNum = pageSize;
        return this;
    }
    /**
     * 表名
     * @param tableName
     */
    table(tableName) {
        this.tableName = tableName;
        return this;
    }
    /**
     * 查询详情
     * @param fields
     */
    async getOne(fields = []) {
        if (fields.length) {
            this.field(fields, false);
        }
        this.ignoreDefaultCondition(true)
            .limit(0, 1);
        const resp = await this.query();
        return _.get(resp, 'list.0', null);
    }
    /**
     * 批量查询
     * @param fields
     */
    async select(fields = []) {
        if (fields.length) {
            this.field(fields, false);
        }
        const resp = await this.query();
        return resp;
    }
    /**
     * 搜索打标签
     * @param params
     */
    searchTag(params) {
        const data = [
            params.mobile || '',
            params.mwId || '',
            params.appId || '',
            params.deviceId || '',
            params.openId || '',
        ];
        this.where(`SEARCHER_USER_SOURCE("${data.join('","')}")`);
        return this;
    }
    /**
     * 固定的解析
     * @param params
     */
    parse(params) {
        //经纬度
        if (params.longitude && params.latitude
            && (params.latitude > -90 && params.latitude < 90)
            && (params.longitude > -180 && params.longitude < 180)) {
            this.where(`_GEO_DISTANCE(location,'km',${params.longitude},${params.latitude})`);
        }
        if (params.shopId && _.toInteger(params.shopId) > 0) {
            this.where(`ShopID=${_.toInteger(params.shopId)}`);
        }
        if (params.kw) {
            params.kw = _.replace(params.kw, /[\'\"\\]/g, '');
            this.where(`kw="${params.kw}"`);
        }
        return this;
    }
    /**
     * 根据店铺Id，查询详情
     * @param shopId
     * @param fields
     * @param append
     */
    async getOneByShopId(shopId, fields = []) {
        this.where(`ShopID=${shopId}`)
            .limit(0, 1)
            .ignoreDefaultCondition(true);
        if (fields.length) {
            this.field(fields, false);
        }
        return this.getOne();
    }
    async query() {
        try {
            const resp = await this.searchClient.call('oldSearch', this.buildSql());
            return resp;
        }
        catch (e) {
            throw new eSearchException_1.ESearchException(503, e.message || "搜索异常");
        }
    }
    buildSql() {
        const fields = this.fields.join(",") || "*";
        let where = "";
        if (!this.ignoreDefaultConditionItems) {
            this.conditionItems.push(...this.defaultConditionItems);
        }
        if (!_.isEmpty(this.conditionItems)) {
            where = `WHERE (${this.conditionItems.join(") AND (")})`;
        }
        const sql = `SELECT ${fields} FROM ${this.tableName} ${where} ORDER BY ${this.sortItem} LIMIT ${this.offset},${this.limitNum}`;
        return sql;
    }
    ignoreDefaultCondition(isIgnore = true) {
        this.ignoreDefaultConditionItems = isIgnore;
        return this;
    }
    /**
     * 初始化构建条件
     */
    init() {
        this.conditionItems = [];
        this.fields = this.config.fields;
        this.tableName = "searchlist";
        this.sortItem = _.get(this.config.preSetSorts, 'default', 'Distance ASC,ShopID ASC');
        this.offset = 0;
        this.limitNum = this.config.pageSize;
        this.ignoreDefaultConditionItems = false;
        this.defaultConditionItems = this.config.conditions;
    }
    /**
     * 自定义搜索地址和参数
     * @param fields
     * @param url 搜索的地址
     * @param params 搜索需要传的其他参数
     */
    async selectWithAnotherCondition(url, params = {}, fields = []) {
        if (fields.length) {
            this.field(fields, false);
        }
        const resp = await this.queryWithAnotherCondition(url, params);
        return resp;
    }
    async queryWithAnotherCondition(url, params) {
        try {
            if (!url) {
                throw new eSearchException_1.ESearchException(403, "未定义搜索地址");
            }
            const paramsObj = {
                sql: this.buildSql()
            };
            if (JSON.stringify(params) !== '{}') {
                Object.assign(paramsObj, Object.assign({}, params));
            }
            const resp = await this.searchClient.call(url, paramsObj);
            return resp;
        }
        catch (e) {
            throw new eSearchException_1.ESearchException(503, e.message || "搜索异常");
        }
    }
    setCondition(conditions) {
        if (!_.isEmpty(conditions)) {
            this.defaultConditionItems = conditions;
        }
        return this;
    }
}
exports.SearchImpl = SearchImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTRCO0FBQzVCLHlEQUFvRDtBQUVwRCxNQUFhLFVBQVU7SUFjckIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQW9CLFlBQVksRUFBRSxNQUFXLEVBQUUsTUFBVztRQUNsRixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM5QyxNQUFNLElBQUksbUNBQWdCLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsZ0JBQWdCO1FBRWhCLE1BQU0sUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDbEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixRQUFRLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMvQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQWdCLEVBQUUsU0FBa0IsSUFBSTtRQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBNEIsRUFBRSxPQUF1QixFQUFFLEtBQTZDO1FBQ3hHLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FB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