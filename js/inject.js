console.log('inject 注入')
document.oncontextmenu = function () {
  return true
}
document.onkeydown = function () {
  var e = window.event || arguments[0]
  if (e.keyCode == 123) {
    return true
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
    return true
  }
  if (e.ctrlKey && e.keyCode == 85) {
    return true
  }
  if (e.ctrlKey && e.keyCode == 83) {
    return true
  }
}
