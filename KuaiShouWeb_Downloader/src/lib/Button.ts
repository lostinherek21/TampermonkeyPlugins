

export default function Button() {
  
  function createButton() : HTMLButtonElement{
    function styledButton(button:HTMLButtonElement) :HTMLButtonElement {
      button.style.position = "absolute"
      button.style.left = "0"
      button.style.bottom = "0"
      button.style.height = "30px"
      button.style.marginLeft = "20px"      
      button.textContent = "Start to download"
      button.style.borderRadius = "3px"
      return button
    }
    const button = document.createElement('button')
    return styledButton(button)
  }

  function injectToDom(button:HTMLButtonElement) {
    const body = document.body
    body.appendChild(button)
  }

  function registerEvent(ele:HTMLButtonElement, func: (e:Event) => void) {
    ele.addEventListener('click',func)
  }

  function init(func: (e:Event) => void) {
    const button = createButton()
    injectToDom(button)
    registerEvent(button, func)
    return button
  }

  return {
    init,
  }
  
}