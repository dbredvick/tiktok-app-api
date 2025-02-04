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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoGenerator = exports.getBody = exports.utility = void 0;
const https = require("https");
const http = require("http");
const util = require("util");
const zlib = require("zlib");
const merge = require("merge-descriptors");
const constants_1 = require("./constants");
const gunzip = util.promisify(zlib.gunzip);
const deflate = util.promisify(zlib.deflate);
const brotli = util.promisify(zlib.brotliDecompress);
const getTemplate = {
    headers: {
        method: "GET",
        "accept-encoding": "gzip, deflate, br",
        referer: "https://www.tiktok.com/trending?lang=en",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
    },
};
const postTemplate = {
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
};
exports.utility = {};
exports.utility.getTiktokContent = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedURL = yield this.signURL(url);
        return getBody(signedURL);
    });
};
exports.utility.signURL = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const signatureService = this.options.signatureService || constants_1.DEFAULT_SIGNATURE_SERVICE;
        let body;
        try {
            body = yield post(signatureService, url);
        }
        catch (err) {
            throw Error(constants_1.SIGN_URL_ERROR);
        }
        // Temporarily removed verification token because it is not required for some URLs.
        return (url +
            "&_signature=" +
            body.data.signature +
            "&verifyFp=" +
            body.data.verify_fp);
    });
};
function post(urlStr, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(urlStr);
        const requestArgs = {
            host: url.hostname,
            port: url.port,
            path: url.pathname,
        };
        merge(requestArgs, postTemplate);
        return new Promise((resolve, reject) => {
            const req = http.request(requestArgs, (res) => handleResponse(res, resolve, reject));
            req.on("error", reject);
            // fake a user agent here
            req.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (Windows NT 10.0; Win64; x64) Chrome/90.0.4430.85 Safari/537.36");
            req.write(body);
            req.end();
        });
    });
}
function getBody(urlStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(urlStr);
        const requestArgs = {
            host: url.hostname,
            path: url.pathname + url.search,
        };
        if (url.port)
            requestArgs.port = url.port;
        merge(requestArgs, getTemplate);
        return new Promise((resolve, reject) => {
            const req = https.get(requestArgs, (res) => handleResponse(res, resolve, reject));
            req.on("error", reject);
        });
    });
}
exports.getBody = getBody;
function handleResponse(res, resolve, reject) {
    let chunks = [];
    res.on("data", (chunk) => chunks.push(chunk));
    res.on("end", () => convertResponse(chunks, res.headers["content-encoding"], resolve, reject));
}
function convertResponse(chunks, encoding, resolve, reject) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = Buffer.concat(chunks);
        let decodedBuffer;
        if (encoding === "gzip") {
            decodedBuffer = (yield gunzip(buffer));
        }
        else if (encoding === "deflate") {
            decodedBuffer = (yield deflate(buffer));
        }
        else if (encoding === "br") {
            decodedBuffer = yield brotli(buffer);
        }
        else {
            decodedBuffer = buffer;
        }
        const string = decodedBuffer.toString();
        if (string.length == 0) {
            reject("TikTok sent back an empty response. This is not supposed to happen. Report it if you can.");
            return;
        }
        resolve(JSON.parse(decodedBuffer.toString()));
    });
}
function getVideoGenerator(subset, count, startCur, type) {
    return __asyncGenerator(this, arguments, function* getVideoGenerator_1() {
        let nextCur = startCur;
        while (true) {
            const batch = yield __await(subset(count, nextCur, type));
            nextCur = batch.cur;
            if (batch.videos.length === 0) {
                return yield __await([]);
            }
            yield yield __await(batch.videos);
        }
    });
}
exports.getVideoGenerator = getVideoGenerator;
