function playVideo(videoId) {
    // 隐藏所有视频
    const videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        video.style.display = 'none';
    });

    // 显示点击的视频
    const selectedVideo = document.getElementById(videoId);
    selectedVideo.style.display = 'block';

    // 播放视频
    selectedVideo.play();
}
