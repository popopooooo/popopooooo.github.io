// 页面DOM加载完成后执行，避免元素未加载导致的错误
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有核心元素
    const cateTabs = document.querySelectorAll('.cate-tab'); // 所有分类按钮
    const videoThumbs = document.querySelectorAll('.video-thumbnail'); // 所有视频缩略图
    const videos = document.querySelectorAll('.video'); // 所有视频播放器

    // ========== 核心1：分类筛选逻辑 ==========
    cateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 1. 切换分类按钮的选中状态（取消其他，选中当前）
            cateTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // 2. 获取当前点击的分类标识（all/game/life/study）
            const currentCate = this.dataset.cate;

            // 3. 筛选视频缩略图：仅显示对应分类，隐藏其他
            videoThumbs.forEach(thumb => {
                const thumbCate = thumb.dataset.cate;
                if (currentCate === 'all' || thumbCate === currentCate) {
                    thumb.style.display = 'block'; // 显示对应分类视频
                } else {
                    thumb.style.display = 'none'; // 隐藏非对应分类视频
                }
            });

            // 可选：切换分类后，隐藏所有视频播放器（避免分类切换后还显示其他视频）
            videos.forEach(v => v.classList.remove('active'));
        });
    });

    // ========== 核心2：播放视频逻辑（配合HTML的onclick） ==========
    window.playVideo = function(videoId) {
        // 1. 隐藏所有视频播放器
        videos.forEach(v => v.classList.remove('active'));
        // 2. 找到并显示点击的视频播放器
        const targetVideo = document.getElementById(videoId);
        if (targetVideo) {
            targetVideo.classList.add('active');
            // 可选：取消自动播放（如需手动点击播放，删掉下面这行即可）
            // targetVideo.play();
        }
    };
});
