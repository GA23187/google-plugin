const bg = chrome.extension.getBackgroundPage()
bg.background_test() // 访问bg的函数
console.log(bg.document.body.innerHTML, 'background的dom') // 访问bg的DOM

$('#btn').on('click', function () {
  $('#value').text('点击后出现的文字')
})

const containerDom = document.getElementById('container')
console.log(containerDom)
document.addEventListener('DOMContentLoaded', () => {
  console.log('123')
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
      const url = new URL(tabs[0].url)
      console.log(url, 'url')
      chrome.cookies.getAll(
        {
          domain: url.host,
        },
        (cookies) => {
          console.log('ccccc', cookies)
          containerDom.textContent = cookies
            .map((c) => c.name + '=' + c.value)
            .join(';')
        }
      )
    }
  )
})
