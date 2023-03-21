window.onload = function () {
    var videoUrl = 'https://prod-streaming-video-msn-com.akamaized.net/b7014b7e-b38f-4a64-bd95-4a28a8ef6dee/113a2bf3-3a5f-45d4-8b6f-e40ce8559da3.mp4';
    var videoUrl2 = "https://prod-streaming-video-msn-com.akamaized.net/ba258271-89c7-47bc-9742-bcae67c23202/f7ff4fe4-1346-47bb-9466-3f4662c1ac3a.mp4"
    let html = document.getElementById('htmlVideo');
    html.src = videoUrl2;
    fetch(videoUrl).then(function(response) {
        console.log(response)
        response.arrayBuffer().then(res=>{
            let video = document.getElementById('jsVideo');
            video.src = URL.createObjectURL(new Blob([res]));
        })
    })

    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', "http://localhost:63342/CoomonCode/Note/测试页面/video.mp4");
    // xhr.responseType = 'arraybuffer';
    // xhr.onreadystatechange = function getPdfOnreadystatechange(e) {
    //     console.log("xhr.readyState:"+xhr.readyState+"   xhr.status:"+xhr.status);
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             var data = (xhr.mozResponseArrayBuffer || xhr.mozResponse ||
    //                 xhr.responseArrayBuffer || xhr.response);
    //             console.log(data);
    //             let js = document.getElementById('jsVideo');
    //             js.setAttribute('src', data);
    //             js.setAttribute('autoplay', 'true');
    //             js.setAttribute('muted', 'true');
    //         } else {
    //             console.log("error");
    //         }
    //     }
    // };
    // xhr.send({});
}

function play() {
    let html = document.getElementById("htmlVideo")
    html.setAttribute('src', 'video.mp4');
    html.play()
}