// 等页面所有元素加载完成
window.onload = function() {
    // 1. 获取所有核心元素
    const tabs = document.querySelectorAll('.cate-tab');
    const contents = document.querySelectorAll('.cate-content');
    const videoItems = document.querySelectorAll('.video-item');
    const videos = document.querySelectorAll('.video');

    // ========== 功能1：分类切换（核心） ==========
    tabs.forEach(tab => {
        tab.onclick = function() {
            // ① 移除所有按钮的选中状态
            tabs.forEach(t => t.classList.remove('on'));
            // ② 给当前按钮加选中状态
            this.classList.add('on');
            // ③ 获取当前要显示的内容标识
            const target = this.dataset.target;
            // ④ 移除所有内容的显示状态
            contents.forEach(c => c.classList.remove('show'));
            // ⑤ 显示目标分类的内容
            document.querySelector(`.${target}-content`).classList.add('show');
            // ⑥ 切换分类后隐藏所有视频
            videos.forEach(v => v.classList.remove('active'));
        }
    });

    // ========== 功能2：点击视频缩略图播放 ==========
    videoItems.forEach(item => {
        item.onclick = function() {
            // ① 移除所有视频的播放状态
            videos.forEach(v => v.classList.remove('active'));
            // ② 获取要播放的视频ID
            const vid = this.dataset.vid;
            // ③ 显示目标视频
            document.getElementById(vid).classList.add('active');
            // 可选：自动播放（需要的话取消下面注释）
            // document.getElementById(vid).play();
        }
    });
};