///<reference path="typings/search/ESearch.d.ts"/>
///<reference path="typings/search/BrandCity.d.ts"/>
///<reference path="typings/search/ShopField.d.ts"/>
///<reference path="typings/search/ShopInfo.d.ts"/>
declare module 'egg' {
  interface Context {
    createQueryBuilder(table: ESearch.SearchTable = "searchlist"): ESearch.Search;
  }
}
