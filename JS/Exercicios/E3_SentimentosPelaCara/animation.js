const video = document.getElementById("video")

function startVideo() {
    navigator.getUserMedia({ video: {} },
        stream => video.srcObjetc = stream,
        err => console.error(err)
    )
}

startVideo()