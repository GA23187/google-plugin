console.log("inject 注入");
// window.postMessage({ test: "你好！i" }, "*");
window.addEventListener(
  "message",
  function (e) {
    console.log(e.data, "inject-script");
    const dom = document.querySelector("input[value='百度一下']");
    console.log(dom);
  },
  false
);
console.log(document.querySelector("input[value='百度一下']"), "zzz");
// document.querySelector("input[value='百度一下']").click()
// let timecount = 0,
//   interval = null;
// function autoClick() {
//   // $("input[value='百度一下']")[0].click(); // jquery
//   const dom = document.querySelector("input[value='百度一下']"); // 原生
//   dom.click()
//   console.log(dom,timecount);
//   timecount++;
//   if (timecount === 7) {
//     clearInterval(interval);
//     interval = null;
//   }
// }

// interval = setInterval(autoClick, 1000);
