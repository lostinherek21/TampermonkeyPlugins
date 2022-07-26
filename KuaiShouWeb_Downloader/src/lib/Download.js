"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function ShootAllDownload(downloadList) {
    downloadList.forEach(item => {
        if (item.name && item.src) {
            setTimeout(() => {
                GM_download(item.src, item.name);
            }, 0);
        }
    });
}
