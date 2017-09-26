Page({
    data: {
        pictures: [],
        nullTip: {
            tipText: '亲，没有上传照片哦',
            actionText: '上传',
            fn: 'uploadImg'
        }
    },
    onLoad() {
        wx.getStorage({
            key: 'gallery',
            success: res => {
                this.setData({
                    pictures: res.data
                })
            },
            fail: res => {
                console.log(res);
            }
        })
    },
    uploadImg() {
        wx.chooseImage({
            count: 1,
            success: res => {
                const tempFilePath = res.tempFilePaths[0];
                wx.saveFile({
                    tempFilePath: tempFilePath,
                    success: res => {
                        const savedFilePath = res.savedFilePath;
                        console.log(savedFilePath);
                        this.setData({
                            pictures: this.data.pictures.concat(savedFilePath)
                        })
                        wx.setStorage({
                            key: 'gallery',
                            data: this.data.pictures
                        })
                    }
                })
            }
        })
    },
    previewImage(e) {
        const index = e.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.pictures[index],
            urls: this.data.pictures
        })
    }
});