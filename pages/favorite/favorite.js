var filmNullTip = {
    tipText: '亲，找不到电影的收藏',
    actionText: '去逛逛',
    routeUrl: '../../pages/popular/popular'
}
var personNullTip = {
    tipText: '亲，找不到人物的收藏',
    actionText: '去逛逛',
    routeUrl: '../../pages/popular/popular'
}
Page({
    data: {
        show: 'film_favorite',
        film_favorite: [],
        person_favorite: [],
        nullTip: filmNullTip
    },
    onLoad(options) {
        wx.getStorage({
            key: 'film_favorite',
            success: res => {
                this.setData({
                    film_favorite: res.data
                })
            }
        });
        wx.getStorage({
            key: 'person_favorite',
            success: res => {
                this.setData({
                    person_favorite: res.data
                })
            }
        });
        wx.stopPullDownRefresh();
    },
    viewFilmDetail(e) {
        const data = e.currentTarget.dataset;
        wx.redirectTo({
            url: `../filmDetail/filmDetail?id=${data.id}`
        });
    },
    viewPersonDetail(e) {
        const data = e.currentTarget.dataset;
        wx.redirectTo({
            url: `../personDetail/personDetail?id=${data.id}`
        });
    },
    changeViewType(e) {
        const data = e.currentTarget.dataset;
        this.setData({
            show: data.type,
            nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
        })
    }
});