"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("./Button"));
const USER_LIST_CLASS = ".user-photo-list > div:first-of-type .card-link";
const VIDEO_SRC_CLASS = ".player-video";
function isValidVideoSrc() {
    return document.querySelector(VIDEO_SRC_CLASS) ? true : false;
}
function isValidUserList() {
    return document.querySelector(USER_LIST_CLASS) ? true : false;
}
function sleep(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
class DomHandler {
    constructor() {
        this.downloadList = [];
        this.button = (0, Button_1.default)().init(this.onStartDownloadButtonClick.bind(this));
    }
    onStartDownloadButtonClick(e) {
        if (!this.enterVideoPlayer()) {
            this.changeButtonMsg("downloading... don't click this page");
        }
    }
    changeButtonMsg(msg) {
        this.button.innerText = msg;
    }
    enterVideoPlayer() {
        if (!isValidUserList()) {
            return false;
        }
        this.downloadList = [];
        const userList = document.querySelector(USER_LIST_CLASS);
        if (userList instanceof HTMLElement) {
            userList.click();
            setTimeout(() => {
                this.startDownload();
            }, 2000);
            return true;
        }
        return false;
    }
    getVideoSrc() {
        const srcEle = document.querySelector(VIDEO_SRC_CLASS);
        const title = document.querySelector('.video-info-title');
        if (srcEle instanceof HTMLElement) {
            const src = srcEle.getAttribute('src');
            const titleText = title?.textContent;
            return { src: src || "", name: titleText || "" };
        }
        return { name: "", src: "" };
    }
    async startDownload() {
        let errCountDown = 5;
        while (this.nextVideo()) {
            await sleep(1000);
            const src = this.getVideoSrc();
            this.downloadList.push(src);
        }
    }
    isInVideoPlayer() {
        return isValidVideoSrc();
    }
    nextVideo() {
        if (!this.isInVideoPlayer()) {
            return false;
        }
        const nextButton = document.querySelector('.witch-item.video-switch-next');
        if (!nextButton) {
            return false;
        }
        if (nextButton instanceof HTMLElement) {
            nextButton.click();
            return true;
        }
        return false;
    }
}
exports.default = DomHandler;
