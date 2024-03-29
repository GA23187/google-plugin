// 向指定页面注入JS和CSS
// content-scripts和原始页面共享DOM，但是不共享JS，如要访问页面JS（例如某个JS变量），只能通过injected js来实现
// content-scripts不能访问绝大部分chrome.xxx.api，除了下面这4种：
// chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
// chrome.i18n
// chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
// chrome.storage

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded", chrome.i18n.getMessage("helloWorld"));
  injectCustomJs();
});
// document.addEventListener("load", function () {
//   console.log("load load load", chrome.i18n.getMessage("helloWorld"));
//   injectCustomJs();
// });
window.addEventListener(
  "message",
  function (e) {
    console.log(e.data,'conten-script');
  },
  false
);

// 向页面注入JS
function injectCustomJs(jsPath) {
  jsPath = jsPath || "js/inject-script.js";
  var temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    chrome.storage.sync.get(
      ["token1", "app_key1"],
      function (result) {
        window.postMessage({ result: result }, "*");
      }
    );
    console.log("执行完后移除");
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}
