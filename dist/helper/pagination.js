"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (query, countRecord, objectPage) => {
    if (query.page) {
        objectPage.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPage.limitPage = parseInt(query.limit);
    }
    objectPage.skipPage = (objectPage.currentPage - 1) * objectPage.limitPage;
    objectPage.totalPage = Math.ceil(countRecord / objectPage.limitPage);
    return objectPage;
};
exports.paginationHelper = paginationHelper;
