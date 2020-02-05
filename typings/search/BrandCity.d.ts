declare namespace ESearch {
  interface BrandCityInfo {
    id?: number;

    /**
     * 总店id
     */
    manage_shop_id?: number;

    /**
     * 品牌菜系
     */
    shopType?: number;

    /**
     * 城市分店数量
     */
    doc_count?: number;

    /**
     * 城市id
     */
    city?: number;

    /**
     * 城市名称
     */
    city_name?: string;

    /**
     * App显示数量
     */
    shop_app_total?: number;

    /**
     * 开通智慧餐厅门店数量
     */
    smart_shop_total?: number;
  }

  type BrandCityField =
      "id"
      | "manage_shop_id"
      | "shopType"
      | "doc_count"
      | "city"
      | "city_name"
      | "shop_app_total"
      | "smart_shop_total"
      ;
}
