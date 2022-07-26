import Util from './Util.js'

function start() {
 
  

  window.addEventListener('keydown',(ev) => {
    ev.stopPropagation()
    ev.preventDefault()

    if(!ev.key.toLowerCase() === "f") {return}

    if(!Util.isEditableTarget(ev.target)) {return}

    const ele = getFullscreenElement()
    if(ele) {
      ele.click()
    }
  })

}

start()