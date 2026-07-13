"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchHelper = (query) => {
    const filterSearch = {
        keyword: "",
        regex: new RegExp("", "i")
    };
    if (query.keyword) {
        filterSearch.keyword = query.keyword;
        filterSearch.regex = new RegExp(query.keyword, 'i');
    }
    return filterSearch;
};
exports.default = searchHelper;
