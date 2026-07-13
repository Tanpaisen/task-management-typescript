"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.changeMulti = exports.edit = exports.create = exports.changeStatus = exports.detail = exports.index = void 0;
const tasks_model_1 = __importDefault(require("../../../models/tasks.model"));
const pagination_1 = require("../../../helper/pagination");
const filter_search_1 = __importDefault(require("../../../helper/filter-search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find["status"] = req.query.status.toString();
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = String(req.query.sortKey);
        const sortValue = req.query.sortValue === 'asc' ? 1 : -1;
        sort[sortKey] = sortValue;
    }
    const count = yield tasks_model_1.default.countDocuments(find);
    const objectPage = {
        limitPage: 4,
        currentPage: 1
    };
    const pageData = (0, pagination_1.paginationHelper)(req.query, count, objectPage);
    const keyword = ((_a = req.query.keyword) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    if (keyword) {
        const search = (0, filter_search_1.default)(req.query);
        find.title = search.regex;
    }
    const tasks = yield tasks_model_1.default.find(find).sort(sort).skip(pageData.skipPage).limit(pageData.limitPage);
    res.json({
        code: 200,
        tasks: tasks,
        page: pageData
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield tasks_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield tasks_model_1.default.updateOne({
        _id: id,
        deleted: false
    }, {
        status: req.body.status.toString()
    });
    res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
    });
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = new tasks_model_1.default(req.body);
    yield tasks.save();
    res.json({
        code: 201,
        message: "Tạo task thành công",
        task: tasks
    });
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield tasks_model_1.default.updateOne({
        _id: id,
        deleted: false
    }, Object.assign({}, req.body));
    res.json({
        code: 200,
        message: "Cập nhật task thành công"
    });
});
exports.edit = edit;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let KEY;
    (function (KEY) {
        KEY["STATUS"] = "status";
        KEY["DELETE"] = "delete-multi";
    })(KEY || (KEY = {}));
    const { ids, key, value } = req.body;
    switch (key) {
        case KEY.STATUS:
            yield tasks_model_1.default.updateMany({
                _id: { $in: ids },
                deleted: false
            }, {
                status: value.toString()
            });
            break;
        case KEY.DELETE:
            yield tasks_model_1.default.updateMany({
                _id: { $in: ids },
                deleted: false
            }, {
                deleted: true
            });
            break;
        default:
            res.status(400).json({
                message: "Trạng thái không hợp lệ"
            });
            return;
    }
    res.json({
        code: 200,
        message: "Cập nhật trạng thái task thành công"
    });
});
exports.changeMulti = changeMulti;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield tasks_model_1.default.updateOne({
        _id: id,
        deleted: false
    }, {
        deleted: true
    });
    res.json({
        code: 200,
        message: "Xóa task thành công"
    });
});
exports.deleteOne = deleteOne;
