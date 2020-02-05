"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import SearchTable = ESearch.SearchTable;
const search_1 = require("../../lib/search");
// import Search = ESearch.Search;
module.exports = {
    createQueryBuilder(tableName = "searchlist") {
        const { app } = this;
        return search_1.SearchImpl.createQueryBuilder(tableName, app.config, this.client("search"));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFDNUMsNkNBQTRDO0FBQzVDLGtDQUFrQztBQUVsQyxNQUFNLENBQUMsT0FBTyxHQUFHO0lBRWYsa0JBQWtCLENBQUMsWUFBb0IsWUFBWTtRQUNqRCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sbUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztDQUNGLENBQUEifQ==