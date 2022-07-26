"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Button() {
    function createButton() {
        function styledButton(button) {
            button.style.position = "absolute";
            button.style.left = "0";
            button.style.bottom = "0";
            button.style.height = "30px";
            button.style.marginLeft = "20px";
            button.textContent = "Start to download";
            button.style.borderRadius = "3px";
            return button;
        }
        const button = document.createElement('button');
        return styledButton(button);
    }
    function injectToDom(button) {
        const body = document.body;
        body.appendChild(button);
    }
    function registerEvent(ele, func) {
        ele.addEventListener('click', func);
    }
    function init(func) {
        const button = createButton();
        injectToDom(button);
        registerEvent(button, func);
        return button;
    }
    return {
        init,
    };
}
exports.default = Button;
