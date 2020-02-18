# egg-mwc-search

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mwc-search.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mwc-search
[travis-image]: https://img.shields.io/travis/eggjs/egg-mwc-search.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-mwc-search
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mwc-search.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mwc-search?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-mwc-search.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-mwc-search
[snyk-image]: https://snyk.io/test/npm/egg-mwc-search/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mwc-search
[download-image]: https://img.shields.io/npm/dm/egg-*-search.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mwc-search

<!--
Description here.
-->

## 安装插件

`npm i --registry * egg-*-search`

## 依赖说明

### 依赖的 egg 版本

egg-*-search 版本 | egg 1.x
--- | ---
1.0.0 | 😁

### 依赖的插件

- egg-*-client

## 开启插件

```js
exports.mwcSearch = {
  enable: true,
  package: 'egg-*-search',
};
```

## 使用场景

```javascript
//查询单个门店信息
const shop = await ctx.createQueryBuilder
     .where("ShopID", 3451)
     .field(["ShopID", "ShopName"], false)
     .getOne<ShopInfo>();

//上面查询等价于
const shop = await ctx.createQueryBuilder()
    .getOneByShopId<ShopInfo>(3451, ["ShopID", "ShopName"]);


//where查询
const shops = await ctx.createQueryBuilder()
        .where("Services", 1)
        .where("City", "=", 258)
        .where("ShopID", ">", 5000)
        .where("ManageShopID", "<>", 43)
        .where("ShopID", "NOT IN", [6388])
        .ignoreDefaultCondition()
        .limit(100)
        .order("ShopID ASC")
        .select<ShopInfo>(["ShopID", "ShopName"]);

//orWhere示例
const shops = await ctx.createQueryBuilder()
    .orWhere([
        "Services=1"
        "Services=6 AND ShowBook=0"
    ])
    .where("ManageShopID", 3443)
    .select<ShopInfo>();


//上面查询等价于
const shops = await ctx.createQueryBuilder()
    .where([
        "Services=1 OR (Services=6 AND ShowBook=0)",
        "ManageShopID=3443",
    ])
    .select<ShopInfo>();

//分页示例
const shops = await ctx.createQueryBuilder()
    .page(1, 20)
    .select<ShopInfo>();

//上面查询等价于
const shops = await ctx.createQueryBuilder()
    .limit(0, 20)
    .select<ShopInfo>();

//自定义泛型
interface DcShopInfo {
    ShopID: number;
    ShopName: string;
    dc_order_type: string[];
}
const shops = await ctx.createQueryBuild()
    .field(["dc_order_type"])
    .getOne<DcShopInfo>();

```

## 详细配置

```javascript
 {

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
      * 预设排序条件, 默认使用 `Distance ASC, ShopID ASC`
      */
    preSetSorts: {
      default: 'Distance ASC, ShopID ASC',
    },
    pageSize: 20,
  },
}
```

## 单元测试

`npm run test`

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
