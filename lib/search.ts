import * as _ from "lodash";
import {ESearchException} from "./eSearchException";

export class SearchImpl{
  private conditionItems: string[];
  private defaultConditionItems: string[];
  private fields: string[];
  private tableName: string;
  private sortItem: string;
  private offset: number;
  private limitNum: number;
  private ignoreDefaultConditionItems: boolean;
  
  private config;
  private searchClient;


  static createQueryBuilder(tableName: string = "searchlist", config: any, client: any): SearchImpl {
    if (_.isEmpty(config) || _.isUndefined(config)) {
      throw new ESearchException(403, "未定义搜索配置文件");
    }
    //TODO: 检查client

    const instance = new SearchImpl();
    instance.config = _.get(config, 'mwcSearch.searchItems', null);
    instance.init();
    instance.table(tableName);
    instance.searchClient = client;
    return instance;
  }

  field(fields: string[], append: boolean = true): this {
    if (!append) {
      this.fields = fields;
    } else {
      this.fields.push(...fields);
    }
    return this;
  }

  where(condition: string | string[], operate?: string|number, value?: number | string | string[] | number[]): this {
    if (!_.isUndefined(value) && !_.isUndefined(operate)) {
      if (_.isArray(condition)) {return this;}
      if ((operate === "IN" || operate == "NOT IN") && _.isArray(value)) {
        this.where(`${condition} ${operate} ("${value.join('","')}")`)
      } else if (_.isNumber(value)) {
        this.where(`${condition} ${operate} ${value}`)
      } else if (_.isString(value)) {
        value = value.replace(/[\"\'\\]/g, '');
        this.where(`${condition} ${operate} "${value}"`)
      } else {
        throw new ESearchException(403, "查询条件不符合规范");
      }
      return this;
    }

    if (!_.isUndefined(operate)) {
      if (_.isArray(condition)) {return this;}
      if (_.isNumber(operate)) {
        this.where(`${condition}=${operate}`)
      } else if (_.isString(operate)) {
        operate = operate.replace(/[\"\'\\]/g, '');
        this.where(`${condition}="${operate}"`)
      }
      return this;
    }

    if (_.isArray(condition)) {
      this.conditionItems.push(...condition);
    } else if (_.isString(condition)) {
      this.conditionItems.push(condition);
    }
    return this;
  }

  orWhere(condition: string[]) {
    if (_.isArray(condition) && condition.length) {
      this.conditionItems.push(`(${condition.join(') OR (')})`)
    }
    return this;
  }

  order(sort: string | number, sortType?: "ASC" | "DESC"): this {
    if (_.isUndefined(sortType)) {
      //检查排序
      if (_.isString(sort)
        && (
            _.indexOf(sort, " ")  > 0
            ||_.indexOf(_.toUpper(sort), "ASC") > 0
            ||  _.indexOf(_.toUpper(sort), "DESC") > 0
          )
      ) {
        this.sortItem = sort;
        return this;
      }
      this.sortItem = _.toString(_.get(this.config, `sortItem.${sort}`, this.sortItem));
    } else {
      this.sortItem = `${sort} ${_.toString(sortType)}`;
    }
    return this;
  }

  /**
   * 分页
   * @param start
   * @param limit
   */
  limit(start: number, limit?: number): this {
    if (_.isUndefined(limit)) {
      this.offset = 0;
      this.limitNum = start;
    } else if(_.isNumber(limit)){
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
  page(page: number, pageSize: number = 20): this {
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
  table(tableName: string): this {
    this.tableName = tableName;
    return this;
  }


  /**
   * 查询详情
   * @param fields
   */
  async getOne(fields: string[] = []): Promise<any> {
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
  async select(fields: string[] = []): Promise<any> {
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
  searchTag(params: {
    mobile?: string,
    mwId?: number,
    appId?: string,
    deviceId?: string,
    openId?: string,
  }): this {
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
  parse(params: {
    latitude?: number|string,
    longitude?: number|string,
    shopId?: number|string,
    kw?: string,
  }): this {
    //经纬度
    if (params.longitude && params.latitude
      && (params.latitude > -90 && params.latitude < 90)
      && (params.longitude > -180 && params.longitude < 180)
    ) {
      this.where(`_GEO_DISTANCE(location,'km',${params.longitude},${params.latitude})`);
    }
    if (params.shopId && _.toInteger(params.shopId) > 0) {
      this.where(`ShopID=${_.toInteger(params.shopId)}`);
    }
    if (params.kw) {
      params.kw = _.replace(params.kw, /[\'\"\\]/g, '');
      this.where(`kw="${params.kw}"`)
    }
    return this;
  }



  /**
   * 根据店铺Id，查询详情
   * @param shopId
   * @param fields
   * @param append
   */
  async getOneByShopId(shopId: number, fields: string[] = []): Promise<any> {
    this.where(`ShopID=${shopId}`)
        .limit(0, 1)
        .ignoreDefaultCondition(true);
    if (fields.length) {
      this.field(fields, false);
    }
    return this.getOne();
  }


  private async query(): Promise<any> {
    try {
      const resp = await this.searchClient.call('oldSearch', this.buildSql());
      return resp;
    } catch (e) {
      throw new ESearchException(503, e.message || "搜索异常");
    }
  }

  private buildSql() {
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

  ignoreDefaultCondition(isIgnore: boolean = true): this {
    this.ignoreDefaultConditionItems = isIgnore;
    return this;
  }

  /**
   * 初始化构建条件
   */
  private init() {
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
  async selectWithAnotherCondition(url: string, params: object = {}, fields: string[] = []): Promise<any> {
    if (fields.length) {
      this.field(fields, false);
    }
    const resp = await this.queryWithAnotherCondition(url, params);
    return resp;
  }

  private async queryWithAnotherCondition(url: string, params?: object): Promise<any> {
    try {
      if (!url) {
        throw new ESearchException(403, "未定义搜索地址");
      }

      const paramsObj = {
        sql: this.buildSql()
      }

      if (JSON.stringify(params) !== '{}') {
        Object.assign(paramsObj, {
          ...params
        })
      }

      const resp = await this.searchClient.call(url, paramsObj);
      return resp;
    } catch (e) {
      throw new ESearchException(503, e.message || "搜索异常");
    }
  }
	
	setCondition(conditions: string[]):this {
    if (!_.isEmpty(conditions)) {
			this.defaultConditionItems = conditions;
		}
		return this;
	}
}

