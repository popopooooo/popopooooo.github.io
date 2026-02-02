// 页面DOM加载完成后执行，确保所有元素都已加载
document.addEventListener('DOMContentLoaded', function() {
    // 严格获取所有元素，增加容错判断
    const cateTabs = document.querySelectorAll('.cate-tab');
    const videoThumbs = document.querySelectorAll('.video-thumbnail');
    const videos = document.querySelectorAll('.video');
    const cateHeaders = document.querySelectorAll('.cate-header');
    const homeCarousel = document.querySelector('.home-carousel');

    // 分类切换核心函数（增加容错，避免元素不存在报错）
    function switchCate(currentCate) {
        if (!currentCate) return;
        // 1. 切换分类按钮选中状态
        cateTabs.forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`.cate-tab[data-cate="${currentCate}"]`);
        if (activeTab) activeTab.classList.add('active');

        // 2. 控制分类标题/介绍：仅显示当前分类
        cateHeaders.forEach(header => {
            header.style.display = header.dataset.cate === currentCate ? 'block' : 'none';
        });

        // 3. 控制首页轮播图：仅首页显示
        if (homeCarousel) {
            homeCarousel.style.display = currentCate === 'home' ? 'block' : 'none';
        }

        // 4. 控制视频缩略图：首页隐藏，其他分类按cate筛选显示
        videoThumbs.forEach(thumb => {
            if (currentCate === 'home') {
                thumb.style.display = 'none';
            } else {
                thumb.style.display = (currentCate === 'all' || thumb.dataset.cate === currentCate) ? 'block' : 'none';
            }
        });

        // 5. 切换分类后隐藏所有视频播放器
        videos.forEach(v => v.classList.remove('active'));
    }

    // 初始化：强制显示首页（解决首次加载标题堆积）
    switchCate('home');

    // 给每个分类按钮绑定点击事件（修复点击无反应）
    cateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const cate = this.dataset.cate;
            switchCate(cate);
        });
    });

    // 视频播放逻辑（原有功能，保留）
    window.playVideo = function(videoId) {
        if (!videoId) return;
        videos.forEach(v => v.classList.remove('active'));
        const targetVideo = document.getElementById(videoId);
        if (targetVideo) {
            targetVideo.classList.add('active');
            // 如需自动播放，取消下面注释：targetVideo.play();
        }
    };
});