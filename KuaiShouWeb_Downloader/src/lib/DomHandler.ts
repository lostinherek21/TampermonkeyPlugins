import Button from './Button'

const USER_LIST_CLASS = ".user-photo-list > div:first-of-type .card-link"
const VIDEO_SRC_CLASS = ".player-video"

function isValidVideoSrc() :boolean  {
  return document.querySelector(VIDEO_SRC_CLASS) ? true : false
}

function isValidUserList() :boolean {
  return document.querySelector(USER_LIST_CLASS) ? true : false
}

function sleep(delay:number) {
  return new Promise((resolve) => {
    setTimeout(resolve,delay)
  })
}

export type DownloadList = {name:string,src:string}[]

interface VideoFinder {
  downloadList : DownloadList
  button : HTMLButtonElement

  onStartDownloadButtonClick(e:Event) : void
  
  enterVideoPlayer() : boolean
  
  startDownload() : void
  nextVideo() : boolean
  isInVideoPlayer() : boolean
}

export default class DomHandler implements VideoFinder{
  downloadList: DownloadList
  button: HTMLButtonElement

  constructor() {
    this.downloadList = []
    this.button = Button().init(this.onStartDownloadButtonClick.bind(this))
  }

  onStartDownloadButtonClick(e: Event): void {
    if(!this.enterVideoPlayer()) {
      this.changeButtonMsg("downloading... don't click this page")
    }
  }

  changeButtonMsg(msg:string) {
    this.button.innerText = msg
  }
  enterVideoPlayer(): boolean {
    if(! isValidUserList()) { return false}

    this.downloadList = []

    const userList = document.querySelector(USER_LIST_CLASS)
    if(userList instanceof HTMLElement) {
      userList.click()
      setTimeout(() => {
        this.startDownload()
      },2000)
      return true
    }
    return false
  }


  getVideoSrc(): {name:string;src:string} {
    const srcEle = document.querySelector(VIDEO_SRC_CLASS)
    const title = document.querySelector('.video-info-title')
    if(srcEle instanceof HTMLElement) {
      const src = srcEle.getAttribute('src')
      const titleText = title?.textContent
      return {src: src || "", name:titleText || "" }
    }

    return {name:"",src:""}
  }

  async startDownload(): Promise<void> {
    let errCountDown = 5
    while(this.nextVideo()) {
      await sleep(1000)
      const src = this.getVideoSrc()
      this.downloadList.push(src)
      
    }
  
  }
  isInVideoPlayer(): boolean {
    return isValidVideoSrc()
  }
  nextVideo(): boolean {
    if(! this.isInVideoPlayer()) {return false}

    const nextButton = document.querySelector('.witch-item.video-switch-next')
    if(!nextButton) { return false}
    if(nextButton instanceof HTMLElement) {
      nextButton.click()
      return true
    }
    return false
  }

}