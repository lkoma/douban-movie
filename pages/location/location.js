const config = require('../../comm/script/config');
Page({
    data: {
        loading: false,
        latitude: '',
        longitude: '',
        formatted_address: ''
    },
    onLoad() {
        this.getLocation();
    },
    getLocation() {
        this.setData({
            loading: true
        });
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                });
                wx.request({
                    url: config.apiList.baiduMap,
                    data: {
                        ak: config.baiduAK,
                        location: `${res.latitude},${res.longitude}`,
                        output: 'json',
                        pois: '1'
                    },
                    success: res => {
                        this.setData({
                            formatted_address: res.data.result.formatted_address,
                            loading: false
                        });
                    },
                    fail: () => {
                        this.getLocation();
                    }
                });
            }
        });
    },
    refreshLocation () {
        this.getLocation();
    }
});