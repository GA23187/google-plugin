
// 是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的
// 它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面。
// 几乎可以调用所有的Chrome扩展API（除了devtools），而且它可以无限制跨域
chrome.runtime.onInstalled.addListener(function () {
  //"permissions": ["declarativeContent"]
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // 只有打开百度才显示pageAction
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "baidu.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  //"permissions": ["contextMenus"， "tabs"]
  chrome.contextMenus.create({
    title: "使用度娘搜索：%s", // %s表示选中的文字
    contexts: ["selection"], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
      // 注意不能使用location.href，因为location是属于background的window对象
      chrome.tabs.create({
        url:
          "https://www.baidu.com/s?ie=utf-8&wd=" +
          encodeURI(params.selectionText),
      });
    },
  });

  // "permissions": ["notifications"]
  chrome.contextMenus.create({
    title: "测试通知",
    contexts: ["page"],
    onclick: function (params) {
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../img/icon.png',
        title: '这是标题',
        message: '您刚才点击了自定义右键菜单！'
      });
    },
  });

  


  // omnibox 演示
  chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log("inputChanged: " + text);
    if (!text) return;
    if (text == "美女") {
      suggest([
        { content: "中国" + text, description: "你要找“中国美女”吗？" },
        { content: "日本" + text, description: "你要找“日本美女”吗？" },
        { content: "泰国" + text, description: "你要找“泰国美女或人妖”吗？" },
        { content: "韩国" + text, description: "你要找“韩国美女”吗？" },
      ]);
    } else if (text == "微博") {
      suggest([
        { content: "新浪" + text, description: "新浪" + text },
        { content: "腾讯" + text, description: "腾讯" + text },
        { content: "搜狐" + text, description: "搜索" + text },
      ]);
    } else {
      suggest([
        { content: "百度搜索 " + text, description: "百度搜索 " + text },
        { content: "谷歌搜索 " + text, description: "谷歌搜索 " + text },
      ]);
    }
  });

  // 当用户接收关键字建议时触发
  chrome.omnibox.onInputEntered.addListener((text) => {
    console.log("inputEntered: " + text);
    if (!text) return;
    var href = "";
    if (text.endsWith("美女"))
      href =
        "http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=" +
        text;
    else if (text.startsWith("百度搜索"))
      href =
        "https://www.baidu.com/s?ie=UTF-8&wd=" + text.replace("百度搜索 ", "");
    else if (text.startsWith("谷歌搜索"))
      href =
        "https://www.google.com.tw/search?q=" + text.replace("谷歌搜索 ", "");
    else href = "https://www.baidu.com/s?ie=UTF-8&wd=" + text;
    openUrlCurrentTab(href);
  });
  // 获取当前选项卡ID
  function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (callback) callback(tabs.length ? tabs[0].id : null);
    });
  }

  // 当前标签打开某个链接
  function openUrlCurrentTab(url) {
    getCurrentTabId((tabId) => {
      chrome.tabs.update(tabId, { url: url });
    });
  }
});

function background_test() {
  console.log("popup触发 background中的方法！");
}

var views = chrome.extension.getViews({ type: "popup" });
if (views.length > 0) {
  console.log(views[0].location.href);
}

