function DouyuInit() {
  function isValid() {
    if (
      document.querySelector('div[title="全屏"]') ||
      document.querySelector('div[title="退出全屏"]')
    ) {
      return true;
    }
  }

  function toggleFullScreen() {
    if (!isValid()) {
      return;
    }

    function isContainRemovedClassName(list) {
      let isContain = false
      list.forEach((className) => {
        if (className.search("removed")  >= 0 ) {
          isContain = true
        }
      })
      return isContain
    }

    const fullScreenDiv = document.querySelector('div[title="全屏"]').classList;
    const exitFullScreenDiv = document.querySelector('div[title="退出全屏"]').classList;
    if(!isContainRemovedClassName(fullScreenDiv)){
      document.querySelector('div[title="全屏"]').click()
    }else {
      document.querySelector('div[title="退出全屏"]').click()
    }
  }

  return {
    toggleFullScreen
  }
}


const Excutors = {
  register(name,func) {
    this[name] = func
  }
};

const inUseHotkeys = ["f"];

class KeyEventHandler {
  constructor(useKeys, excutor) {
    this.keys = useKeys;
    this.excutor = excutor;

    this.keyDownExcutor = this.keyDownExcutor.bind(this)
  }

  init() {
    this.listenAllEvent(this.keys, "keydown", this.keyDownExcutor);
  }

  isEditableTarget(target) {
    const isEditable =
      target.getAttribute && target.getAttribute("contenteditable") === "true";
    const isInputDom = /INPUT|TEXTAREA|SELECT/.test(target.nodeName);
    return isEditable || isInputDom;
  }

  keyDownExcutor(evt) {
    if (!evt || this.isEditableTarget(evt.target)) {
      return;
    }

    const keyCode = evt.keyCode;
    const key = evt.key.toLowerCase();

    if (key === "f") {
      this.excutor["fullScreen"]();
    }
  }

  listenAllEvent(keys, eventName, excu) {
    keys.forEach((k) => {
      window.addEventListener(eventName, excu);
    });
  }
}

function init() {
  const keyHandler = new KeyEventHandler(inUseHotkeys,Excutors)
  keyHandler.init()

  const DouyuExcutor = DouyuInit()
  Excutors.register("fullScreen",DouyuExcutor.toggleFullScreen)
}

init()