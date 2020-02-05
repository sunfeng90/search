'use strict';

import * as assert from "assert";
import mock from "egg-mock";
import * as _ from "lodash";
import {SearchImpl} from "../lib/search";
function queryBuilder(ctx): SearchImpl {
  return ctx.createQueryBuilder();
}
interface BaseShopInfo {
  ShopID: number;
  ShopName: string;
  ManageShopID: number;
  Services: string[];
  Distance?: number;
}

describe('test/mwc-search.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mwc-search-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it("where条件", async () => {
    const ctx = app.mockContext();
    //where条件
    const ret8 = await queryBuilder(ctx)
        .where("Services", 1)
        .where("City", "=", 258)
        .where("ShopID", ">", 5000)
        .where("ManageShopID", "<>", 43)
        .where("ShopID", "NOT IN", [6388])
        .ignoreDefaultCondition()
        .limit(100)
        .order("ShopID ASC")
        .select<BaseShopInfo>(["ShopID", "ShopName"]);
    const ret9 = await queryBuilder(ctx)
        .where([
          "Services=1",
          "City=258",
          "ShopID>5000",
          "ManageShopID<>43",
          "ShopID NOT IN (6388)",
        ])
        .ignoreDefaultCondition()
        .limit(100)
        .order("ShopID", "ASC")
        .select<BaseShopInfo>(["ShopID", "ShopName"]);
    _.range(0, 99).map((index) => {
      assert(ret8.list[index].ShopID === ret9.list[index].ShopID);
    });

  });

  it("多个门店查询", async () => {
    const ctx = app.mockContext();
    const ret3 = await queryBuilder(ctx).where(["City=258", "ManageShopID=43"])
        .limit(0, 20)
        .ignoreDefaultCondition(true)
        .select<BaseShopInfo>(["ShopID","ShopName","ManageShopID"]);
    assert(ret3.total > 20, "查询返回门店数量不等于20");
    assert(ret3.list.length === 20, "查询返回门店数量不等于20");
    assert(_.keys(ret3.list[0]).length === 3, "返回filed数量不等于3");

    const ret4 = await queryBuilder(ctx)
        .where(["City=258", "ManageShopID=43"])
        .select<BaseShopInfo>(["ShopID","ShopName","ManageShopID"]);
    assert(ret4.total === 0, "默认条件未生效")

    const ret5 = await queryBuilder(ctx)
        .where(["City=258", "ManageShopID=43"])
        .ignoreDefaultCondition()
        .select<BaseShopInfo>(["ShopID","ShopName","ManageShopID"]);

    assert(ret5.list.length === 20, "查询返回门店数量不等于20")
  });

  it('单个门店查询', async () => {
    const ctx = app.mockContext();
    const es1 = queryBuilder(ctx);
    const ret =  await es1.getOneByShopId<BaseShopInfo>(3451);
    assert(ret.ShopID == 3451, "店铺id不等于3451");

    const ret2 = await queryBuilder(ctx)
        .where("ShopID=3451")
        .field(["ShopID", "ManageShopID"], false)
        .getOne<BaseShopInfo>();
    assert(ret2.ShopID == 3451, "店铺id不等于3451");
    assert(_.keys(ret2).length == 2, "返回filed数量不对");
  });

  it("功能检查", async () => {
    //字段
    const ctx = app.mockContext();
    const ret1 = await queryBuilder(ctx)
        .field(["ShopID", "ShopName"])
        .where("ShopID=3451")
        .getOne<BaseShopInfo>();
    const ret2 = await queryBuilder(ctx)
        .getOneByShopId<BaseShopInfo>(3451, ["ShopID", "ShopName"]);
    assert(ret1.ShopID === ret2.ShopID);
    assert(ret1.ShopName === ret2.ShopName);

    //距离
    const ret3 = await queryBuilder(ctx)
        .parse({
          latitude: 31.217895,
          longitude: 121.481115,
          shopId: 3451,
        })
        .getOne<BaseShopInfo>(["Distance", "ShopID", "ShopName"]);
    const ret4 = await queryBuilder(ctx)
        .where([
            "ShopID=3451",
            `_GEO_DISTANCE(location,'km',121.481115,31.217895)`,
        ])
        .field(["Distance", "ShopID", "ShopName"])
        .ignoreDefaultCondition()
        .select<BaseShopInfo>();
    const ret4s = ret4.list[0];
    assert(ret3.ShopID === ret4s.ShopID);
    assert(ret3.ShopName === ret4s.ShopName);
    assert(Math.abs((ret3.Distance || 1) - (ret4s.Distance || 0)) < 0.01);

    //排序
    const ret5 = await queryBuilder(ctx)
        .orWhere([
            "ShopID=110114",
            "ShopID=3443",
            "ShopID=3451",
        ])
        .ignoreDefaultCondition()
        .order("ShopID DESC")
        .select<BaseShopInfo>(["ShopID", "ShopName"]);
    assert(ret5.list[0].ShopID === 110114);
    assert(ret5.list[1].ShopID === 3451);
    assert(ret5.list[2].ShopID === 3443);
    assert(ret5.total === 3);

    //分页
    const ret6 = await queryBuilder(ctx)
        .where("ManageShopID", "IN", [3443])
        .where("Services", "IN", [1,6])
        .page(2)
        .order("ShopID ASC")
        .select<BaseShopInfo>(["ShopID", "ManageShopID"]);
    assert(ret6.list.length === 20);
    ret6.list.map((shop) => {
      assert(shop.ManageShopID === 3443)
    })
    const ret7 = await queryBuilder(ctx)
        .where("ManageShopID", "IN", [3443])
        .where("Services", "IN", [1,6])
        .limit(20, 20)
        .order("ShopID ASC")
        .select<BaseShopInfo>(["ShopID", "ManageShopID"]);
    _.range(0, 19).map((index) => {
      assert(ret6.list[index].ShopID === ret7.list[index].ShopID);
    });


    const ret10 = await queryBuilder(ctx)
        .parse({
          kw: "西贝莜面村"
        }).select<BaseShopInfo>(["ShopName"]);
    assert(ret10.list[0].ShopName.indexOf("莜面") > -1)

  });

});
