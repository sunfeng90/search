declare namespace ESearch {
  /**
   * 商户搜索表
   * wiki: http://wiki.mwbyd.cn/pages/viewpage.action?pageId=3088201
   */
  interface ShopInfo {
    /**
     * 区域列表
     */
    BCID?: number[];

    /**
     * 商家地址
     */
    Address?: string;

    Img_Do?: number;

    /**
     * 预付点单图片
     * 0:有图, 1:无图
     */
    dc_order_img_flag?: number;

    /**
     * 是否显示商家预定
     * 0否 1是
     */
    ShowBook?: number;

    /**
     * 预点时间段
     * eg: ["10:00-12:00", "16:00-18:00"]
     */
    dc_order_time?: string[];

    /**
     * 前 30 天线上预定成功率
     */
    bookRate?: number;

    MBgImage?: string;

    /**
     * 就餐类型
     * 0:堂食,1:外带
     */
    dc_eat_type?: number[];

    TBgImage?: string;

    /**
     * 大众点评均价
     */
    AvgPrice?: number;

    /**
     * 口碑门店名
     */
    alipay_shop_name?: string;

    /**
     * 点菜业务实时在线状态
     */
    good_service_status?: number;

    /**
     * 提交订单默认距离
     */
    OrderDistanceLimit?: number;

    /**
     * 商家需要供用户兑换的券的积分价值
     */
    VoucherValue?: number;

    /**
     * 口碑门店id
     */
    alipay_shop_id?: string;

    /**
     * 诺曼底商铺描述
     */
    normandie_desc?: string;

    /**
     * 进店给积分频度，按天为单位
     */
    EnterInRate?: number;

    /**
     * 某某id
     */
    mmShopID?: string;

    /**
     * 停车信息
     */
    park_info?: string;

    /**
     * 搜索更新时间
     */
    search_update_time?: number;

    /**
     * 大众点评均分
     */
    AvgReview?: number;

    /**
     * 口碑门店分类
     */
    koubei_category?: string;

    /**
     * 经度,double
     */
    Longitude?: string;

    /**
     * 菜单更新时间
     */
    GoodUpdateTime?: string;

    /**
     * 是否有优惠
     */
    DisFlag?: number;

    /**
     * 商家菜系
     */
    ShopType?: number;

    /**
     * 预订上周总量
     */
    book_total?: number;

    /**
     * 是否开启app买单功能
     * 已废弃
     */
    app_pay?: number;

    EnPrint?: number;

    /**
     * 是否支持口碑合作预点菜flag
     * 0否1 是
     */
    koubeiOrderFoodFlag?: number;

    /**
     * 门店id
     */
    ShopID?: number;

    Description?: string;

    /**
     * 分享优惠标示
     */
    shareFlag?: number;

    Traffic?: string;

    /**
     * 呼叫中心店标识 1-呼叫中心店
     */
    callcenter_flag?: number;

    /**
     * 预定配置更新时间
     */
    BookVersion?: string;

    /**
     * 最大等位时间门限
     */
    maxWaitLimit?: number;

    /**
     * 下单打印数目
     */
    OrderPrintNum?: number;

    /**
     * 诺曼底业务开通标示
     * 1-开通,0-关闭
     */
    normandie_flag?: number;

    /**
     * 排队业务实时在线状态
     */
    queue_service_status?: number;

    /**
     * 过号是否作废
     * 默认过号不作废1
     */
    offInvalid?: number;

    /**
     * 菜系
     */
    StyleCooking?: string;

    /**
     * 城市区域ID
     */
    CityAreaID?: string[];

    /**
     * 预订分佣标识
     */
    subCommission?: number;

    /**
     * 前7天内最大的排队量(每天)
     */
    orderCountLastWeek?: number;

    /**
     * 排队：队列配置版本
     */
    QueueVersion?: string;

    /**
     * 点餐预约
     * 0:关闭 ,1:打开
     */
    dc_reserve_flag?: string;

    /**
     * 营业时间
     * eg. 10:00-22:00
     */
    ShopHours?: string;

    /**
     * 商圈商场的商家数
     */
    shop_total?: number;

    /**
     * 排队允许距离限制
     * 单位米
     */
    ShopQueueLimit?: number;

    LegalPerson?: string;

    /**
     * 预定预约上周总量
     */
    book_quick_total?: number;

    /**
     * 商店服务
     * 1.排队  2.菜单->预点  4.云POS  5.外卖  6.预订  7.厨房配菜  8.支付  9.取餐柜  10.预点打单
     * 12.卡券服务  13.POS收款  14.弹幕  15.预约到店  17.会员  18.餐饮接入  19.400电话  20.美小二
     * 21.云POS-正餐  22.云POS-快餐  23.C端秒点  24.智慧餐厅  25.C端秒付  27.智慧餐厅(入门版)  28.智慧餐厅(基础版)  29.智慧餐厅(会员版)  30.智慧餐厅(连锁版)
     * 31.智慧餐厅(限量版)  32.共享餐厅  33.智慧餐厅(排队版)  34.共享餐厅供应商  35.美味秒充  36.智慧餐厅(聚客版)  37.旺铺  38.美收银  39.美小店
     */
    Services?: string[];

    /**
     * 商店类别
     * 1为商场，2为餐饮，3为零售，15为其他，16为商圈
     */
    Type?: number;

    /**
     * 排号服务保活时间
     */
    queue_service_last_time?: number;

    /**
     * 债券上限
     */
    VoucherLimitation?: number;

    /**
     * 最后更新时间, datetime
     */
    LastTime?: string;

    /**
     * 店铺名称
     */
    ShopName?: string;

    Email?: string;

    /**
     * 前 30 天预定成功量
     */
    bookCount?: number;

    /**
     * 预订可选座标识
     */
    bk_optional_seat?: number;

    /**
     * 纬度
     */
    Latitude?: string;

    /**
     * 索引
     */
    Index?: number;

    /**
     * 标准GPS 经度
     */
    LngGPS?: string;

    /**
     * 预定订单处理方式
     */
    book_order_handle_type?: number;

    CreateDate?: string;

    /**
     * 门店业务类型
     * 1、美食
     */
    Industry?: number;

    /**
     * 结账方式
     * 1先结账；2后结账
     */
    CheckWay?: number;

    ConsumptionRatio?: number;

    /**
     * 是否在线
     * 0否 1是
     */
    OnLine?: number;

    /**
     * 排队是否开启手机排队，默认开启
     * 0关 1开
     */
    QueueState?: number;

    /**
     * 是否是体验店
     * 0否  1是
     */
    TiyanDian?: number;

    /**
     * 合作商家
     * 0否 1是
     */
    Cooperation?: number;

    /**
     * 标准GPS 纬度
     */
    LatGPS?: string;

    /**
     * 餐桌数目
     */
    TableCount?: number;

    /**
     * 商场名称
     */
    mall_name?: string;

    /**
     * 口碑预点餐优惠信息
     * 多个用英文逗号,分隔
     */
    koubeiDiscountInfos?: string;

    /**
     * 商户标签
     *
     * 1.商户宴请 2.情侣约会 3.家庭聚餐 4.朋友聚会 5.景观位 6.wifi 7.宝宝椅 8.停车场 10.包房
     * 11.自助餐 12.连锁 13.点菜 14.口碑菜品智能推荐 15.工业园区 16.别墅洋房 17.星级酒店 18.时尚地标 19.环境优雅 20.火爆品牌
     */
    tag?: string[];

    /**
     * SHA1加密后的商家ID
     */
    EncryptedShopID?: string;

    /**
     * 预订包厢标识
     */
    bk_box?: number;

    /**
     * 客户等级S/A/B/C
     * 鹰眼项目
     */
    shop_level?: string;

    /**
     * 发放总积分
     */
    Sent?: number;

    BgImage?: string;

    /**
     * 会员功能：默认关闭
     * 0，关闭、，1开启
     */
    MemFunc?: number;

    /**
     * 0:默认不支持，1：支持
     */
    WaitList?: number;

    /**
     * 商家自定义名称
     */
    DefineShopID?: string;

    /**
     * 城市id
     */
    City?: number;

    /**
     * 预订电话
     */
    BookPhone?: string;

    /**
     * 排队总数/周
     */
    QueuingTotal?: number;

    branchShopCount?: number;

    /**
     * 诺曼底商铺图片
     */
    normandie_pic?: string;

    /**
     * 商店状态
     * 1为注册，2为激活，3为运行，4为删除
     */
    State?: number;

    /**
     * 邻趣活动
     */
    linQu?: string;

    /**
     * 商家名称拼音
     */
    NamePinyin?: string;

    RegImage?: string;

    /**
     * 客户经理
     */
    clientManager?: string;

    /**
     * 支付打印数目
     */
    PayPrintNum?: number;

    /**
     * 地铁信息
     */
    rail_transit_info?: string;

    EntityStore?: number;

    /**
     * 商店服务
     * 1.排队  2.菜单->预点  4.云POS  5.外卖  6.预订  7.厨房配菜  8.支付  9.取餐柜  10.预点打单
     * 12.卡券服务  13.POS收款  14.弹幕  15.预约到店  17.会员  18.餐饮接入  19.400电话  20.美小二
     * 21.云POS-正餐  22.云POS-快餐  23.C端秒点  24.智慧餐厅  25.C端秒付  27.智慧餐厅(入门版)  28.智慧餐厅(基础版)  29.智慧餐厅(会员版)  30.智慧餐厅(连锁版)
     * 31.智慧餐厅(限量版)  32.共享餐厅  33.智慧餐厅(排队版)  34.共享餐厅供应商  35.美味秒充  36.智慧餐厅(聚客版)  37.旺铺  38.美收银  39.美小店
     */
    c_services?: string[];

    /**
     * 支付通道
     * 1:支付宝直连通道,2:微信直连通道,3:网商通道,4:合利宝通道,5:盛付通通道,6:汇卡,7:拉卡拉
     */
    dc_pay_channel?: string[];

    /**
     * 前30天内最大的排队量(每天)
     */
    orderCountMonth?: number;

    /**
     * 口碑门店美味服务
     */
    koubei_services?: string[];

    /**
     * 商家所在商场id
     */
    ShoppingmallShopID?: number;

    /**
     * 预约标识
     */
    service_quick?: number;

    /**
     * 用户消费积分返回基数
     */
    IntegralRatio?: string;

    /**
     * 国家id
     * 1: 中国
     */
    countryId?: number;

    alipay_koubei?: number;

    /**
     * 口碑门店人气值
     */
    koubei_avg_popularity?: number;

    /**
     * 支付方式
     * 1:微信,2:支付宝,3:微信APP,4:支付宝APP,5:刷卡 多个用英文逗号隔开
     */
    dc_pay_way?: string[];

    /**
     * 快餐模式
     */
    KuaiCanMode?: number;

    /**
     * 开发者标签
     */
    open_tag?: string[];

    bloc_brand_id?: number;

    /**
     * 预订业务实时在线状态
     */
    book_service_status?: number;

    /**
     * 商家Logo，默认使用尺寸
     */
    TLogo?: string;

    RegNum?: string;

    /**
     * 智慧餐厅App显示风格
     * 0普通，1入门版,2基础版,3会员版,4连锁版,5限量版
     */
    smart_shop_style?: number;

    bloc_id?: number;

    /**
     * 预约上周总量
     */
    quick_total?: number;

    /**
     * 总店id
     */
    ManageShopID?: number;

    exactBranchShopCount?: number;

    /**
     * 区域id
     */
    AreaID?: number;

    /**
     * 前30天内总取号量
     */
    orderCount?: number;

    /**
     * 是否上传了营业执照
     * 0 否，1 是
     */
    uploadLicenseFlag?: number;

    /**
     * 商家logo
     */
    Logo?: string;

    /**
     * 昨天的排队取号量
     */
    orderCountYesterday?: number;

    /**
     * 点评网商家ID
     */
    DianpingID?: number;

    /**
     * 省份ID
     */
    ProvinceID?: number;

    /**
     * 商家可发放积分
     */
    Integrals?: number;

    /**
     * 集团id
     */
    group_id?: number;

    RegName?: string;

    /**
     * 前30天内（周一至周四）日均取号量
     */
    idleOrderCount?: number;

    /**
     * 商家logo
     */
    MLogo?: string;

    /**
     * 关注活动
     */
    attenActive?: string;

    /**
     * 商家电话
     */
    Tel?: string;

    location?: string;

    /**
     * 永不离线
     */
    forever?: number;

    /**
     * 商家秒订标识
     */
    second_show_book?: number;

    /**
     * 口碑门店人均消费 单位:分
     */
    koubei_per_pay?: number;

    /**
     * 用户到商家距离，单位千米
     */
    Distance?: number;
  }

}