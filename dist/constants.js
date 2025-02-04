"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGN_URL_ERROR = exports.DEFAULT_SIGNATURE_SERVICE = exports.VIDEO_NOT_FOUND = exports.RESOURCE_NOT_FOUND = exports.ILLEGAL_IDENTIFIER = exports.TYPE_TRENDING_VIDEOS = exports.TYPE_LIKED_VIDEOS = exports.TYPE_RECENT_VIDEOS = void 0;
exports.TYPE_RECENT_VIDEOS = 8;
exports.TYPE_LIKED_VIDEOS = 9;
exports.TYPE_TRENDING_VIDEOS = 12;
exports.ILLEGAL_IDENTIFIER = 10201;
exports.RESOURCE_NOT_FOUND = 10202;
exports.VIDEO_NOT_FOUND = 10204;
exports.DEFAULT_SIGNATURE_SERVICE = 'https://35.223.247.100/api/sign';
exports.SIGN_URL_ERROR = 'Could not sign an API URL. '
    + 'This usually means the signature service is not responding. '
    + 'If you are using the default signature service, create a pull '
    + 'request at https://github.com/tikstock/tiktok-app-api stating this issue.';
