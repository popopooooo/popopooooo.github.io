// 页面DOM加载完成后执行，避免元素未加载导致的错误
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有核心元素：新增【首页容器】
    const cateTabs = document.querySelectorAll('.cate-tab'); // 所有分类按钮
    const videoThumbs = document.querySelectorAll('.video-thumbnail'); // 所有视频缩略图
    const videos = document.querySelectorAll('.video'); // 所有视频播放器
    const homeContainer = document.querySelector('.home-container'); // 首页专属容器

    // ========== 核心1：分类筛选逻辑（新增首页判断） ==========
    cateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 1. 切换分类按钮的选中状态（取消其他，选中当前）
            cateTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // 2. 获取当前点击的分类标识（home/all/game/life/study）
            const currentCate = this.dataset.cate;

            // 核心新增：根据是否是首页，控制首页容器/视频的显示隐藏
            if (currentCate === 'home') {
                // 首页：显示首页容器，隐藏视频缩略图+所有视频播放器
                homeContainer.style.display = 'block';
                videoThumbs.forEach(thumb => thumb.style.display = 'none');
                videos.forEach(v => v.classList.remove('active'));
            } else {
                // 非首页：隐藏首页容器，筛选显示对应分类的视频缩略图
                homeContainer.style.display = 'none';
                videoThumbs.forEach(thumb => {
                    const thumbCate = thumb.dataset.cate;
                    if (currentCate === 'all' || thumbCate === currentCate) {
                        thumb.style.display = 'block'; // 显示对应分类视频
                    } else {
                        thumb.style.display = 'none'; // 隐藏非对应分类视频
                    }
                });
                // 切换分类后，隐藏所有视频播放器（避免分类切换后还显示其他视频）
                videos.forEach(v => v.classList.remove('active'));
            }
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