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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var bluebird_1 = require("bluebird");
var handlebars_1 = __importDefault(require("handlebars"));
function generatePdf(file, options, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var args, browser, page, template, result, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                    ];
                    if (options === null || options === void 0 ? void 0 : options.args) {
                        args = options.args;
                        delete options.args;
                    }
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            args: args
                        })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    if (!file.content) return [3 /*break*/, 4];
                    template = handlebars_1.default.compile(file.content, { strict: true });
                    result = template(file.content);
                    html = result;
                    return [4 /*yield*/, page.setContent(html)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, page.goto(file.url, {
                        waitUntil: 'networkidle0',
                    })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (file.content) { }
                    return [2 /*return*/, bluebird_1.Promise.props(page.pdf(options))
                            .then(function (data) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, browser.close()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, Buffer.from(Object.values(data))];
                                    }
                                });
                            });
                        }).asCallback(callback)];
            }
        });
    });
}
exports.generatePdf = generatePdf;
function generatePdfs(files, options, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var args, browser, pdfs, page, _i, files_1, file, template, result, html, pdfObj, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    args = [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                    ];
                    if (options === null || options === void 0 ? void 0 : options.args) {
                        args = options.args;
                        delete options.args;
                    }
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            args: args
                        })];
                case 1:
                    browser = _g.sent();
                    pdfs = [];
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _g.sent();
                    _i = 0, files_1 = files;
                    _g.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 10];
                    file = files_1[_i];
                    if (!file.content) return [3 /*break*/, 5];
                    template = handlebars_1.default.compile(file.content, { strict: true });
                    result = template(file.content);
                    html = result;
                    return [4 /*yield*/, page.setContent(html)];
                case 4:
                    _g.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, page.goto(file.url, {
                        waitUntil: 'networkidle0',
                    })];
                case 6:
                    _g.sent();
                    _g.label = 7;
                case 7:
                    pdfObj = JSON.parse(JSON.stringify(file));
                    delete pdfObj['content'];
                    _a = pdfObj;
                    _b = 'buffer';
                    _d = (_c = Buffer).from;
                    _f = (_e = Object).values;
                    return [4 /*yield*/, page.pdf(options)];
                case 8:
                    _a[_b] = _d.apply(_c, [_f.apply(_e, [_g.sent()])]);
                    pdfs.push(pdfObj);
                    _g.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10: return [2 /*return*/, bluebird_1.Promise.resolve(pdfs)
                        .then(function (data) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, browser.close()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, data];
                                }
                            });
                        });
                    }).asCallback(callback)];
            }
        });
    });
}
module.exports = {
    generatePdf: generatePdf,
    generatePdfs: generatePdfs
};
//# sourceMappingURL=index.js.map