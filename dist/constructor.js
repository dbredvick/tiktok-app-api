"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagInfoFromContent = exports.getTagFromTopContent = exports.getTagFromContent = exports.getAudioInfoFromContent = exports.getAudioFromID = exports.getVideoInfoFromTopContent = exports.getVideoInfoFromContent = exports.getVideoFromID = exports.getUserInfoFromContent = exports.getUserFromID = void 0;
function getUserFromID(id) {
    return {
        id: id
    };
}
exports.getUserFromID = getUserFromID;
function getUserInfoFromContent(obj) {
    const user = obj.userInfo.user;
    const stats = obj.userInfo.stats;
    return {
        user: {
            id: user.id,
            username: user.uniqueId,
        },
        avatar: user.avatarThumb,
        nickname: user.nickname,
        signature: user.signature,
        followingCount: stats.followingCount,
        followerCount: stats.followerCount,
        likeCount: stats.heartCount,
        videoCount: stats.videoCount,
    };
}
exports.getUserInfoFromContent = getUserInfoFromContent;
function getVideoFromID(id) {
    return {
        id: id,
    };
}
exports.getVideoFromID = getVideoFromID;
function getVideoInfoFromContent(obj) {
    const tags = typeof obj.challenges !== 'undefined'
        ? obj.challenges.map((t) => getTagFromContent(t))
        : [];
    return {
        video: {
            id: obj.id,
        },
        author: {
            id: obj.author.id,
            username: obj.author.uniqueId,
        },
        playCount: obj.stats.playCount,
        likeCount: obj.stats.diggCount,
        commentCount: obj.stats.commentCount,
        shareCount: obj.stats.shareCount,
        description: obj.desc,
        tags: tags,
        audio: getAudioInfoFromContent(obj),
    };
}
exports.getVideoInfoFromContent = getVideoInfoFromContent;
function getVideoInfoFromTopContent(obj) {
    const tags = typeof obj.challengs !== 'undefined' ? obj.challenges.map((t) => getTagFromTopContent(t)) : [];
    return {
        video: {
            id: obj.id,
        },
        author: {
            id: obj.author.id,
            username: obj.author.uniqueId,
        },
        playCount: obj.stats.playCount,
        likeCount: obj.stats.diggCount,
        commentCount: obj.stats.commentCount,
        shareCount: obj.stats.shareCount,
        description: obj.desc,
        tags: tags,
        audio: getAudioInfoFromContent(obj),
    };
}
exports.getVideoInfoFromTopContent = getVideoInfoFromTopContent;
function getAudioFromID(id) {
    return {
        id: id,
    };
}
exports.getAudioFromID = getAudioFromID;
function getAudioInfoFromContent(obj) {
    if (typeof obj.musicInfos !== 'undefined') {
        return {
            audio: {
                id: obj.musicInfos.musicId,
            },
            title: obj.musicInfos.musicName,
            authorName: obj.musicInfos.authorName,
            covers: {
                small: obj.musicInfos.covers[0],
                medium: obj.musicInfos.coversMedium[0],
                large: obj.musicInfos.coversLarger[0],
            },
            url: obj.musicInfos.playUrl,
            duration: -1,
        };
    }
    let musicObj = typeof obj.musicInfo !== 'undefined' ? obj.musicInfo.music : obj.music;
    return {
        audio: {
            id: musicObj.id,
        },
        title: musicObj.title,
        authorName: musicObj.authorName,
        covers: {
            small: musicObj.coverThumb,
            medium: musicObj.coverMedium,
            large: musicObj.coverLarge,
        },
        url: musicObj.playUrl,
        duration: musicObj.duration,
    };
}
exports.getAudioInfoFromContent = getAudioInfoFromContent;
function getTagFromContent(obj) {
    return {
        id: obj.id,
        title: obj.title,
    };
}
exports.getTagFromContent = getTagFromContent;
function getTagFromTopContent(obj) {
    return {
        id: obj.id,
        title: obj.title,
    };
}
exports.getTagFromTopContent = getTagFromTopContent;
function getTagInfoFromContent(obj) {
    const challenge = obj.challengeInfo.challenge;
    const stats = obj.challengeInfo.stats;
    return {
        tag: {
            id: challenge.id,
            title: challenge.title,
        },
        description: challenge.desc,
        videoCount: stats.videoCount,
        viewCount: stats.viewCount,
    };
}
exports.getTagInfoFromContent = getTagInfoFromContent;
