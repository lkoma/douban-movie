Page({
    data: {
        animationData: {}
    },
    onLoad() {
        const animation = wx.createAnimation({
            duration: 10000,
            delay: 600
        });
        animation.translateY(-1000).step();
        this.setData({
            animationData: animation.export()
        });
    }
});