const douban = require('../../comm/script/fetch');
const config = require('../../comm/script/config');
Page({
    data: {
        films: [],
        hasMore: true,
        showLoading: true,
        start: 0,
        url: '',
        isNull: false,
        nullTip: {
            tipText: 'sorry，没有找到您要的内容，换个关键词试试吧',
            actionText: '返回',
            routeUrl: '../../pages/search/search'
        }
    },
    onLoad(options) {
        this.setData({
            url: options.url,
            keyword: options.keyword,
            title: options.keyword
        });
        douban.search.call(this, options.url, options.keyword, this.data.start, config.count);
    },
    onPullDownRefresh() {
        this.setData({
            films: [],
            hasMore: true,
            showLoading: true,
            start: 0
        });
        douban.search.call(this, this.data.url, this.data.keyword, this.data.start, config.count);
    },
    onReachBottom() {
        if (!this.data.showLoading) {
            douban.search.call(this, this.data.url, this.data.keyword, this.data.start, config.count);
        }
    },
    viewFilmDetail(e) {
        wx.redirectTo({
            url: "../filmDetail/filmDetail?id=" + e.currentTarget.dataset.id
        });
    },
    viewFilmByTag (e) {
        const keyword = e.currentTarget.dataset.tag;
        wx.redirectTo({
            url: `../searchResult/searchResult?url=${encodeURIComponent(config.apiList.search.byTag)}&keyword=${keyword}`
        })
    }
});