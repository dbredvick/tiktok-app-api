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
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const constants_1 = require("./constants");
const IllegalIdentifier_1 = require("./errors/IllegalIdentifier");
const ResourceNotFound_1 = require("./errors/ResourceNotFound");
const url_1 = require("./url");
const constructor_1 = require("./constructor");
const utility_1 = require("./utility");
exports.app = {};
/**
 * Initializes the default settings of the application.
 * @private
 */
exports.app.init = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        this.options = options;
    });
};
/**
 * Shuts down the application.
 */
exports.app.close = function () {
};
/**
 * Retrieves the information of a subset of the trending videos on TikTok.
 * @param options An optional SearchOptions object that contains the count
 *                and starting cursor to use for this request.
 *                The default count is 30, and default starting cursor is 0.
 *                Using a count higher than 100 is redundant, as TikTok maxes
 *                out the amount of videos per request at ~100 videos.
 * @returns A promise with the resolved value of an array of VideoInfo objects.
 */
exports.app.getTrendingVideos = function ({ count = 30, startCur = '0' } = {}) {
    return utility_1.getVideoGenerator(getTrendingVideosBatch.bind(this), count, startCur, 'Trending');
};
/**
 * @param username The username of the TikTok user.
 * @returns A promise with the resolved value of a User object.
 * @throws {IllegalIdentifier} Thrown if the username is invalid.
 * @throws {ResourceNotFound} Thrown if a User with the username is not found.
 */
exports.app.getUserByName = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = yield this.getUserInfo(username);
        return userInfo.user;
    });
};
/**
 * @param id The unique ID of the TikTok user.
 * @returns A User object with a set id property. Will not fetch the username of the TikTok user.
 */
exports.app.getUserByID = function (id) {
    return constructor_1.getUserFromID(id);
};
/**
 * Retrieves the information associated with a TikTok user.
 * @param identifier The User object of a TikTok user or a TikTok user's username.
 * @returns A promise with the resolved value of a UserInfo object.
 * @throws {IllegalIdentifier} Thrown if the username of the User object or the passed username is invalid.
 * @throws {ResourceNotFound} Thrown if a User with the username is not found.
 * @throws {IllegalArgument} Thrown if the User object, if one was passed, does not have it's username property set.
 */
exports.app.getUserInfo = function (identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getUserInfoContentURL(identifier);
        const content = yield this.getTiktokContent(contentURL);
        if (content.statusCode === constants_1.ILLEGAL_IDENTIFIER) {
            throw new IllegalIdentifier_1.IllegalIdentifier("An illegal identifier was used for this request.");
        }
        else if (content.statusCode === constants_1.RESOURCE_NOT_FOUND) {
            throw new ResourceNotFound_1.ResourceNotFound("Could not find a User with the given identifier.");
        }
        return constructor_1.getUserInfoFromContent(content);
    });
};
/**
 * Retrieves the information of a subset of videos uploaded by the TikTok user.
 * @param user The User object of a TikTok user.
 * @param options An optional SearchOptions object that contains the count
 *                and starting cursor to use for this request.
 *                The default count is 30, and default starting cursor is 0.
 *                Using a count higher than 100 is redundant, as TikTok maxes
 *                out the amount of videos per request at ~100 videos.
 * @returns A promise with the resolved value of an array of VideoInfo objects.
 *          The resolved value will be an empty array if none videos are found.
 * @throws `IllegalArgument` Thrown if the User object does not have it's id property set.
 */
exports.app.getUploadedVideos = function (user, { count = 30, startCur = '0' } = {}) {
    return utility_1.getVideoGenerator(getUploadedVideosBatch.bind(this), count, startCur, user);
};
/**
 * Retrieves the information of a subset of the videos liked by the TikTok user.
 * @param user The User object of a TikTok user.
 * @param options An optional SearchOptions object that contains the count
 *                and starting cursor to use for this request.
 *                The default count is 30, and default starting cursor is 0.
 *                Using a count higher than 100 is redundant, as TikTok maxes
 *                out the amount of videos per request at ~100 videos.
 * @returns A promise with the resolved value of an array of VideoInfo objects.
 *          The resolved value will be an empty array if none videos are found.
 * @throws `IllegalArgument` Thrown if the User object does not have it's id property set.
 */
exports.app.getLikedVideos = function (user, { count = 30, startCur = '0' } = {}) {
    return utility_1.getVideoGenerator(getLikedVideosBatch.bind(this), count, startCur, user);
};
/**
 * @param id The unique ID of the TikTok video.
 * @returns A Video object with a set id property.
 */
exports.app.getVideo = function (id) {
    return constructor_1.getVideoFromID(id);
};
/**
 * Retrieves the information associated with a TikTok video.
 * @param identifier The Video object of a TikTok video.
 * @returns A promise with the resolved value of a VideoInfo object.
 * @throws {IllegalIdentifier} Thrown if the id of the Video object is invalid.
 * @throws {ResourceNotFound} Thrown if a Video with the id is not found.
 * @throws {IllegalArgument} Thrown if the Video object does not have it's id property set.
 */
exports.app.getVideoInfo = function (video) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getVideoInfoContentURL(video);
        const content = yield this.getTiktokContent(contentURL);
        if (content.statusCode === constants_1.ILLEGAL_IDENTIFIER) {
            throw new IllegalIdentifier_1.IllegalIdentifier("An illegal identifier was used for this request.");
        }
        else if (content.statusCode === constants_1.VIDEO_NOT_FOUND) {
            throw new ResourceNotFound_1.ResourceNotFound("Could not find a Video with the given identifier.");
        }
        return constructor_1.getVideoInfoFromContent(content.itemInfo.itemStruct);
    });
};
/**
 * @param id The unique ID of the TikTok audio.
 * @returns An Audio object with a set id property.
 */
exports.app.getAudio = function (id) {
    return constructor_1.getAudioFromID(id);
};
/**
 * Retrieves the information associated with a TikTok audio.
 * @param identifier The Audio object of a TikTok audio.
 * @returns A promise with the resolved value of a AudioInfo object.
 * @throws {IllegalIdentifier} Thrown if the id of the Audio object is invalid.
 * @throws {ResourceNotFound} Thrown if an Audio with the id is not found.
 * @throws {IllegalArgument} Thrown if the Audio object does not have it's id property set.
 */
exports.app.getAudioInfo = function (audio) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getAudioInfoContentURL(audio);
        const content = yield this.getTiktokContent(contentURL);
        if (content.statusCode === constants_1.ILLEGAL_IDENTIFIER) {
            throw new IllegalIdentifier_1.IllegalIdentifier("An illegal identifier was used for this request.");
        }
        else if (content.statusCode === constants_1.RESOURCE_NOT_FOUND) {
            throw new ResourceNotFound_1.ResourceNotFound("Could not find an Audio with the given identifier.");
        }
        return constructor_1.getAudioInfoFromContent(content);
    });
};
/**
 * Retrieves the information of a subset of the top videos of the TikTok audio.
 * @param audio The Audio object of a TikTok audio.
 * @param options An optional SearchOptions object that contains the count
 *                and starting cursor to use for this request.
 *                The default count is 30, and default starting cursor is 0.
 *                Using a count higher than 100 is redundant, as TikTok maxes
 *                out the amount of videos per request at ~100 videos.
 * @returns A promise with the resolved value of an array of VideoInfo objects.
 * @throws {IllegalArgument} Thrown if the Audio object does not have it's id property set.
 */
exports.app.getAudioTopVideos = function (audio, { count = 30, startCur = '0' } = {}) {
    return utility_1.getVideoGenerator(getAudioTopVideosBatch.bind(this), count, startCur, audio);
};
/**
 * @param id The unique ID of the TikTok tag.
 * @returns A Tag object with set id and title properties. Will fetch the title from the TikTok API.
 * @throws {ResourceNotFound} Thrown if a Tag with the id is not found.
 */
exports.app.getTag = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return { id };
    });
};
/**
 * Retrieves the information associated with a TikTok tag.
 * @param identifier The Tag object of a TikTok tag or a TikTok tag's id.
 * @returns A promise with the resolved value of a TagInfo object.
 * @throws {ResourceNotFound} Thrown if a Tag with the id is not found.
 * @throws {IllegalArgument} Thrown if the Tag object does not have it's id property set.
 */
exports.app.getTagInfo = function (identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getTagInfoContentURL(identifier);
        const content = yield this.getTiktokContent(contentURL);
        if (content.statusCode === constants_1.RESOURCE_NOT_FOUND) {
            throw new ResourceNotFound_1.ResourceNotFound("Could not find a Tag with the given identifier.");
        }
        return constructor_1.getTagInfoFromContent(content);
    });
};
/**
 * Retrieves the information of a subset of the top videos of the TikTok tag.
 * @param audio The Tag object of a TikTok tag.
 * @param options An optional SearchOptions object that contains the count
 *                and starting cursor to use for this request.
 *                The default count is 30, and default starting cursor is 0.
 *                Using a count higher than 100 is redundant, as TikTok maxes
 *                out the amount of videos per request at ~100 videos.
 * @returns A promise with the resolved value of an array of VideoInfo objects.
 * @throws {IllegalArgument} Thrown if the Tag object does not have it's id property set.
 */
exports.app.getTagTopVideos = function (tag, { count = 30, startCur = '0' } = {}) {
    return utility_1.getVideoGenerator(getTagTopVideosBatch.bind(this), count, startCur, tag);
};
function getTrendingVideosBatch(count, startCur) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getTrendingContentURL(count, startCur);
        return getVideosBatch.call(this, contentURL);
    });
}
function getUploadedVideosBatch(count, startCur, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getRecentVideosContentURL(user, count, startCur);
        return getVideosBatch.call(this, contentURL);
    });
}
function getLikedVideosBatch(count, startCur, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getLikedVideosContentURL(user, count, startCur);
        return getVideosBatch.call(this, contentURL);
    });
}
function getVideosBatch(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield this.getTiktokContent(url);
        return typeof content.items === 'undefined' ?
            {
                videos: [],
                cur: '-1',
            } : {
            videos: content.items.map((v) => constructor_1.getVideoInfoFromContent(v)),
            cur: content.maxCursor,
        };
    });
}
function getAudioTopVideosBatch(count, startCur, audio) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getAudioTopContentURL(audio, count, startCur);
        return getTopVideosBatch.call(this, contentURL);
    });
}
function getTagTopVideosBatch(count, startCur, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentURL = url_1.getTagTopContentURL(tag, count, startCur);
        return getTopVideosBatch.call(this, contentURL);
    });
}
function getTopVideosBatch(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield this.getTiktokContent(url);
        return {
            videos: content.itemList.map((v) => constructor_1.getVideoInfoFromTopContent(v)),
            cur: content.cursor,
        };
    });
}
