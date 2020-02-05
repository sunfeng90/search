'use strict';

/**
 * egg-mwc-search default config
 * @member Config#mwcSearch
 * @property {String} SOME_KEY - some description
 */
exports.mwcSearch = {

  searchItems: {
    /**
     * 默认搜索条件
     */
    conditions: [
      'EntityStore=1',
      'State=3',
      'OnLine=1',
      "(ManageShopID<>43 AND kw<>'测试')",
      'TiyanDian!=1', // 不是体验店
    ],
    /**
      * 默认查询字段
      */
    fields: [ 'BCID', 'ShowBook', 'AvgPrice', 'Distance', 'OrderDistanceLimit', 'AvgReview', 'Longitude',
      'app_pay', 'ShopID', 'StyleCooking', 'ShopQueueLimit', 'Services', 'ShopName', 'Latitude',
      'City', 'c_services', 'ShoppingmallShopID', 'TLogo', 'ManageShopID', 'location', 'Address', 'ShopHours',
      'Tel', 'DianpingID', 'DisFlag', 'queue_service_status', 'QueueState', 'mall_name',
      'bk_optional_seat', 'bk_box', 'ShopType', 'tag' ],

    /**
      * 预设排序条件，默认采用第一个
      */
    preSetSorts: {
      default: 'Distance ASC, ShopID ASC',
    },
    pageSize: 20,
  },
};
