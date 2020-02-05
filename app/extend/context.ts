// import SearchTable = ESearch.SearchTable;
import {SearchImpl} from "../../lib/search";
// import Search = ESearch.Search;

module.exports = {

  createQueryBuilder(tableName: string = "searchlist"): SearchImpl {
    const { app } = this;
    return SearchImpl.createQueryBuilder(tableName, app.config, this.client("search"));
  }
}