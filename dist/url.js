"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagTopContentURL = exports.getTagInfoContentURL = exports.getAudioTopContentURL = exports.getAudioInfoContentURL = exports.getVideoInfoContentURL = exports.getLikedVideosContentURL = exports.getRecentVideosContentURL = exports.getUserInfoContentURL = exports.getTrendingContentURL = void 0;
const constants_1 = require("./constants");
const IllegalArgument_1 = require("./errors/IllegalArgument");
function getTrendingContentURL(count, startCur) {
    return 'https://m.tiktok.com/api/item_list/?user_agent=&minCursor=0'
        + `&maxCursor=${startCur}&count=${count}&sourceType=${constants_1.TYPE_TRENDING_VIDEOS}`;
}
exports.getTrendingContentURL = getTrendingContentURL;
function getUserInfoContentURL(identifier) {
    let uniqueId = typeof identifier === 'string' ? identifier : identifier.username;
    if (typeof uniqueId === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed User must have a username set.");
    }
    return `https://www.tiktok.com/node/share/user/@${uniqueId}?user_agent=`;
}
exports.getUserInfoContentURL = getUserInfoContentURL;
function getRecentVideosContentURL(user, count, startCur) {
    if (typeof user.id === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed User must have an id set.");
    }
    return 'https://m.tiktok.com/api/item_list/?user_agent=&minCursor=0'
        + `&maxCursor=${startCur}&id=${user.id}&count=${count}&sourceType=${constants_1.TYPE_RECENT_VIDEOS}`;
}
exports.getRecentVideosContentURL = getRecentVideosContentURL;
function getLikedVideosContentURL(user, count, startCur) {
    if (typeof user.id === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed User must have an id set.");
    }
    return 'https://m.tiktok.com/api/item_list/?user_agent=&minCursor=0'
        + `&maxCursor=${startCur}&id=${user.id}&count=${count}&sourceType=${constants_1.TYPE_LIKED_VIDEOS}`;
}
exports.getLikedVideosContentURL = getLikedVideosContentURL;
function getVideoInfoContentURL(video) {
    if (typeof video.id === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed Video must have an id set.");
    }
    return `https://m.tiktok.com/api/item/detail/?agent_user=&itemId=${video.id}`;
}
exports.getVideoInfoContentURL = getVideoInfoContentURL;
function getAudioInfoContentURL(audio) {
    if (typeof audio.id === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed Audio must have an id set.");
    }
    return `https://m.tiktok.com/api/music/detail/?agent_user=&musicId=${audio.id}&language=en`;
}
exports.getAudioInfoContentURL = getAudioInfoContentURL;
function getAudioTopContentURL(audio, count, startCur) {
    if (typeof audio.id === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed Audio must have an id set.");
    }
    return `https://m.tiktok.com/api/music/item_list/?aid=1988&musicID=${audio.id}&count=${count}&cursor=${startCur}`;
}
exports.getAudioTopContentURL = getAudioTopContentURL;
function getTagInfoContentURL(identifier) {
    let uniqueId = typeof identifier === 'string' ? identifier : identifier.id;
    if (typeof uniqueId === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed Tag must have an id set.");
    }
    return `https://m.tiktok.com/api/challenge/detail/?agent_user=&challengeId=${uniqueId}`;
}
exports.getTagInfoContentURL = getTagInfoContentURL;
function getTagTopContentURL(tag, count, startCur) {
    if (typeof tag.id === 'undefined') {
        throw new IllegalArgument_1.IllegalArgument("Passed Tag must have an id set.");
    }
    return `https://m.tiktok.com/api/challenge/item_list/?aid=1988&user_agent=&challengeID=${tag.id}&count=${count}&cursor=${startCur}`;
}
exports.getTagTopContentURL = getTagTopContentURL;
