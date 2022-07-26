export default {
  isEditableTarget(target) {
    if(!target) { return }

    if(!target instanceof HTMLElement) { return }

    return target.getAttribute && target.getAttribute("contenteditable") === "true" || 
            /INPUT|TEXTAREA|SELECT/.test(target.nodeName)
  }
}

