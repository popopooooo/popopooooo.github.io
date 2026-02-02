// 页面加载完成后执行（避免DOM未加载导致的错误）
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取所有元素
    const cateTabs = document.querySelectorAll('.cate-tab'); // 所有分类按钮
    const videoThumbnails = document.querySelectorAll('.video-thumbnail'); // 所有视频缩略图
    const videos = document.querySelectorAll('.video'); // 所有视频播放器

    // 初始默认显示第一个视频
    if (videos.length > 0) {
        videos[0].classList.add('active');
    }

    // 2. 分类筛选逻辑
    cateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有分类的选中状态
            cateTabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的分类添加选中状态
            this.classList.add('active');
            // 获取当前分类的标识（all/game/life/study）
            const currentCate = this.dataset.cate;

            // 筛选视频缩略图
            videoThumbnails.forEach(thumbnail => {
                const thumbnailCate = thumbnail.dataset.cate;
                // 全部分类：显示所有；否则只显示对应分类
                if (currentCate === 'all' || thumbnailCate === currentCate) {
                    thumbnail.style.display = 'block';
                } else {
                    thumbnail.style.display = 'none';
                }
            });
        });
    });

    // 3. 播放视频的全局函数（配合HTML中的onclick）
    window.playVideo = function(videoId) {
        // 移除所有视频的显示状态
        videos.forEach(v => v.classList.remove('active'));
        // 给选中的视频添加显示状态并播放
        const targetVideo = document.getElementById(videoId);
        targetVideo.classList.add('active');
        targetVideo.play(); // 自动播放（可选，去掉则需要手动点击播放）
    };
});
