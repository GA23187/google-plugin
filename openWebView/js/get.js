// 最关键也就这一行 插件在安装时，目标网站还没有加载，导致下面的tokenObj为null或undifined，导致添加事件失败
window.onload = function () {
  var token = "";
  var app_key = "";
  // 从存储中获取value
  chrome.storage.sync.get(["token1", "app_key1"], function (result) {
    if (typeof result.token1 === "undefined") {
      token = "";
    } else {
      token = result.token1;
    }
    if (typeof result.app_key1 === "undefined") {
      app_key = "";
    } else {
      app_key = result.app_key1;
    }
  });

  // 获取目标页面的对象
  var tokenObj = document.getElementById("su");
  console.log(tokenObj);
  console.log(token, app_key, "存储的值");
  var appkeyObj = document.getElementById("app_key");
  // 为对象添加事件,这里添加的是"点击"事件
  if (tokenObj) {
    tokenObj.addEventListener("click", function () {
      // tokenObj.value = token;
      console.log("token被执行了!");
    });
    // tokenObj.click();
  }

  // 点击app_key输入框，写入插件保存的value
  if (appkeyObj) {
    appkeyObj.addEventListener("click", function () {
      appkeyObj.value = app_key;
      console.log("app_key被执行了！");
    });
  }
};
