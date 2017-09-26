const config = require('../../comm/script/config');
Page({
    data: {
        skinList: config.skinList,
        nowSkin: ''
    },
    onLoad(options) {
        wx.getStorage({
            key: 'skin',
            success: res => {
                if (!res.data) {
                    this.setData({
                        nowSkin: config.skinList[0].imgUrl
                    })
                } else {
                    this.setData({
                        nowSkin: res.data
                    })
                }
            }
        })
    },
    chooseSkin(e) {
        const url = e.currentTarget.dataset.url;
        wx.setStorage({
            key: 'skin',
            data: url,
            success: res => {
                wx.navigateBack({
                    delta: 1,
                    success: () => {
                        wx.showToast({
                            title: '更改成功'
                        });
                    }
                })
            }
        })
    }
});