const filmNullTip = {
    tipText: '亲，找不到电影的浏览记录',
    actionText: '去逛逛',
    routeUrl: '../../pages/popular/popular'
}
const personNullTip = {
    tipText: '亲，找不到人物的浏览记录',
    actionText: '去逛逛',
    routeUrl: '../../pages/popular/popular'
}
Page({
    data: {
        film_history: [],
        person_history: [],
        show: 'film_history',
        nullTip: filmNullTip
    },
    onLoad(options) {
        console.log('========');
        wx.getStorage({
            key: 'film_history',
            success: res => {
                console.log(res);
                this.setData({
                    film_history: res.data
                })
            }
        });
        wx.getStorage({
            key: 'person_history',
            success: res => {
                this.setData({
                    person_history: res.data
                })
            }
        });
        wx.stopPullDownRefresh();
    },
    viewFilmDetail (e) {
        const data = e.currentTarget.dataset;
        wx.redirectTo({
            url: "../filmDetail/filmDetail?id=" + data.id
        })
    },
    onPullDownRefresh() {
        this.setData({
            film_history: [],
            person_history: []
        })
        this.onLoad();
    },
    viewPersonDetail(e) {
        const data = e.currentTarget.dataset;
        wx.redirectTo({
            url: "../personDetail/personDetail?id=" + data.id
        })
    },
    changeViewType(e) {
        const data = e.currentTarget.dataset;
        this.setData({
            show: data.type,
            nullTip: data.type == 'film_history' ? filmNullTip : personNullTip
        })
    }
});