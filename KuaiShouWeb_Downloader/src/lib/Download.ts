// GM_download 
import type {DownloadList} from "./DomHandler"

async function ShootAllDownload(downloadList : DownloadList) {
  let downloadSet = new Set(downloadList)
  downloadSet.forEach(item => {
    if(item.name && item.src){
      setTimeout(() => {
        GM_download(item.src,item.name)
      },0)
    } 
  })
}