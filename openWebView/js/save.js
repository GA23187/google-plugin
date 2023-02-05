// 保存方法
function save_options() {
  var plugin_url = document.getElementById("plugin_url");
  var plugin_app_key = document.getElementById("plugin_app_key");

  chrome.storage.sync.set(
    {
      token1: plugin_url.value,
      app_key1: plugin_app_key.value,
    },
    function () {
      alert("存储成功");
    }
  );
}
function clear_options() {
  var plugin_url = document.getElementById("plugin_url");
  var plugin_app_key = document.getElementById("plugin_app_key");
  plugin_url.value = ''
  plugin_app_key.value = ''
  chrome.storage.sync.clear()
}

// 获取插件保存的value，并显示在插件输入框中
chrome.storage.sync.get(["token1", "app_key1"], function (result) {
  if (typeof result.token1 === "undefined") {
    plugin_url.value = "";
  } else {
    plugin_url.value = result.token1;
  }
  if (typeof result.app_key1 === "undefined") {
    plugin_app_key.value = "";
  } else {
    plugin_app_key.value = result.app_key1;
  }
});

// 点击保存，执行保存value
var save = document.getElementById("save");
save.addEventListener("click", save_options);
// 清除
var clear = document.getElementById("clear");
clear.addEventListener("click", clear_options);

