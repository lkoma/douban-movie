Page({
    data: {
        cells: [],
        minaVersion: 'v1.0.0'
    },
    onLoad() {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    cells: [
                        [{
                            title: '手机型号',
                            text: res.model,
                            access: false,
                            fn: ''
                        },
                        {
                            title: '分辨率',
                            text: res.windowWidth * res.pixelRatio + '*' + res.windowHeight * res.pixelRatio,
                            access: false,
                            fn: ''
                        },
                        {
                            title: '系统语言',
                            text: res.language,
                            access: false,
                            fn: ''
                        },
                        {
                            title: '微信版本',
                            text: res.version,
                            access: false,
                            fn: ''
                        },
                        {
                            title: '小程序版本',
                            text: this.data.minaVersion,
                            access: false,
                            fn: ''
                        }]
                    ]
                });
            }
        })
    }
})