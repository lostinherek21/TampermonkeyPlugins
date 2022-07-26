// GM_download 
import type {DownloadList} from "./DomHandler"

async function ShootAllDownload(downloadList : DownloadList) {
  downloadList.forEach(item => {
    if(item.name && item.src){
      setTimeout(() => {
        GM_download(item.src,item.name)
      },0)
    } 
  })
}