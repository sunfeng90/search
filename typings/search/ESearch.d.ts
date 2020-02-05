declare namespace ESearch {
  /**
   * 查询结果
   */
  interface ShopResults<T> {
    page: number;
    total: number;
    times: number;
    dataSource: any;
    businessType: number;
    list: T[];
  }


  type Operate = "=" | "<>" | ">" | "<" | "<=" | ">=" | "IN" | "NOT IN";

  type SearchTable = "brandcity" | "searchlist";



  interface Search {

    /**
     * searchlist表查询字段
     *
     * @param fields
     * @param append
     * @return this
     * @see http://wiki.mwbyd.cn/pages/viewpage.action?pageId=3088201
     */
    field(fields: ShopField[], append: boolean = true): this;

    /**
     * brandCity表查询字段
     * @param fields
     * @param append 是否追加查询字段，默认是
     * @return this
     * @see http://wiki.mwbyd.cn/pages/viewpage.action?pageId=9647265
     */
    field(fields: BrandCityField[], append: boolean = true): this;

    /**
     * 查询
     * @param condition 查询条件
     * @return this
     * @example where("ShopID=3451")
     */
    where(condition: string): this;

    /**
     *
     * @param conditions 查询条件
     * @return this
     * @example where(["CityAreaID=34", "City=258"])
     */
    where(conditions: string[]): this;

    // /**
    //  * 查询
    //  * @param key
    //  * @param value
    //  * @return this
    //  */
    // where(key: string, value: number | string): this;

    /**
     * 查询
     * @param key
     * @param operate
     * @param value
     * @return this
     */
    where(key: string, operate: Operate|number|string, value?: number | string | string[] | number[]): this;

    /**
     * 或查询条件
     *
     * tips: 指conditions内的所有查询条件为或关系，
     * 与默认条件和其他地方插入的查询条件均为且关系。
     *
     * @param conditions
     * @example
     * orWhere(["ShopID=1","ShopID=2"]).where("Services=1")
     * 表示查询 (Services=1) AND (ShopID=1 OR ShopID=2)
     * @return this
     */
    orWhere(conditions: string[]): this;

    /**
     * 排序条件
     * 支持预设排序和自定义排序
     * 预设排序参考配置文件的 mwcSearch.searchItems.preSetSorts
     *
     * @example
     * order("ShopID ASC") 设置排序为 ShopID ASC
     * @example
     * order(1) or order("queueingFirst")
     * 会查询预设排序的对象中是否有对应的key存在
     * tips: 建议预设排序的key为数值型
     * @param sort
     * @return this
     */
    order(sort: string|number): this;

    /**
     * 排序
     * @param key
     * @param sortType
     */
    order(key: string, sortType: "ASC" | "DESC"): this;

    /**
     * 分页限制
     * @param limit
     */
    limit(limit: number): this;

    /**
     * 分页限制
     * @param start
     * @param limit
     */
    limit(start: number, limit: number): this;

    /**
     * 页码
     * @param page
     * @param pageSize
     */
    page(page: number, pageSize: number = 20): this;

    /**
     * 表名
     * @param tableName
     */
    table(tableName: SearchTable = "searchlist"): this;

    /**
     * 查询详情
     *
     * fields不为空时等价于 field(fields, false).getOne()
     * @param fields
     */
    getOne<T extends ShopInfo>(fields: ShopField[] = []): Promise<T|null>;

    /**
     * 查询详情
     *
     * fields不为空时等价于 field(fields, false).getOne()
     * @param fields
     */
    getOne<T extends BrandCityInfo>(fields: BrandCityField[] = []): Promise<T|null>;

    /**
     * 批量查询
     *
     * fields不为空时等价于 field(fields, false).select()
     * @param fields
     */
    select<T extends ShopInfo>(fields: ShopField[] = []): Promise<ShopResults<T>>;

    /**
     * 批量查询
     *
     * fields不为空时等价于 field(fields, false).select()
     * @param fields
     */
    select<T extends BrandCityInfo>(fields: BrandCityField[] = []): Promise<ShopResults<T>>;

    /**
     * 通过其他地址批量查询
     *
     * fields不为空时等价于 field(fields, false).select()
     * @param fields
     * @param url
     * @param params
     */
    selectWithAnotherCondition<T extends ShopInfo>(url: string, params: object = {}, fields: BrandCityField[] = []): Promise<ShopResults<T>>;

    /**
		 * 根据场景不同，设置不同的默认限制条件
		 * @param conditions 
		 */
    setCondition<T extends ShopInfo>(conditions: string[]): this;
    
    /**
     * 根据店铺Id，查询详情
     *
     * fields不为空时等价于 field(fields, false).getOneByShopID(shopId)
     * @param shopId
     * @param fields
     */
    getOneByShopId<T extends ShopInfo>(shopId: number, fields: ShopField[] = []): Promise<T|null>;

    /**
     * 根据店铺Id，查询详情
     *
     * fields不为空时等价于 field(fields, false).getOneByShopID(shopId)
     * @param shopId
     * @param fields
     */
    getOneByShopId<T extends BrandCityInfo>(shopId: number, fields: BrandCityField[] = []): Promise<T|null>;

    /**
     * 是否忽略默认搜索条件
     * @param isIgnore
     */
    ignoreDefaultCondition(isIgnore: boolean = true): this;

    /**
     * 对搜索做的特殊处理
     * 支持经纬度、门店id和关键词检索
     * @param params
     */
    parse(params: {
      latitude?: number,
      longitude?: number,
      shopId?: number,
      kw?: string,
    }): this;

    /**
     * 搜索打标签
     * ps: 用户搜索且kw不为空时调用
     * @param params
     * @see http://wiki.mwbyd.cn/pages/viewpage.action?pageId=3104610
     */
    searchTag(params: {
      mobile?: string,
      mwId?: number,
      appId?: string,
      deviceId?: string,
      openId?: string,
    }): this;
  }

}
