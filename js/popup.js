    var bg = chrome.extension.getBackgroundPage();
    bg.background_test(); // 访问bg的函数
    console.log(bg.document.body.innerHTML,'popup'); // 访问bg的DOM

    $("#btn").on("click",function (){
        $("#value").text('点击后出现的文字')
    })