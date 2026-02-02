// 页面DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有核心元素
    const cateTabs = document.querySelectorAll('.cate-tab');
    const videoThumbs = document.querySelectorAll('.video-thumbnail');
    const videos = document.querySelectorAll('.video');
    const cateHeaders = document.querySelectorAll('.cate-header'); // 所有分类标题+介绍
    const homeCarousel = document.querySelector('.home-carousel'); // 首页轮播图

    // ========== 核心：分类总控逻辑（所有内容按分类显示/隐藏） ==========
    function switchCate(currentCate) {
        // 1. 切换分类按钮选中状态
        cateTabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.cate-tab[data-cate="${currentCate}"]`).classList.add('active');

        // 2. 切换分类标题+介绍：仅显示当前分类的
        cateHeaders.forEach(header => {
            header.style.display = header.dataset.cate === currentCate ? 'block' : 'none';
        });

        // 3. 控制首页轮播图：仅首页显示
        homeCarousel.style.display = currentCate === 'home' ? 'block' : 'none';

        // 4. 控制视频缩略图：首页隐藏，其他分类按标识筛选
        if (currentCate === 'home') {
            videoThumbs.forEach(thumb => thumb.style.display = 'none');
        } else {
            videoThumbs.forEach(thumb => {
                thumb.style.display = (currentCate === 'all' || thumb.dataset.cate === currentCate) 
                    ? 'block' 
                    : 'none';
            });
        }

        // 5. 切换分类后隐藏所有视频播放器
        videos.forEach(v => v.classList.remove('active'));
    }

    // 初始化：默认显示首页
    switchCate('home');

    // 分类按钮点击事件
    cateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchCate(this.dataset.cate);
        });
    });

    // ========== 视频播放逻辑（原有功能不变） ==========
    window.playVideo = function(videoId) {
        videos.forEach(v => v.classList.remove('active'));
        const targetVideo = document.getElementById(videoId);
        if (targetVideo) {
            targetVideo.classList.add('active');
            // 如需自动播放，取消下面注释
            // targetVideo.play();
        }
    };
});