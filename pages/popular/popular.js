const config = require('../../comm/script/config');
const douban = require('../../comm/script/fetch');
var app = getApp();
Page({
	data: {
		showLoading: true,
		bannerList: config.bannerList,
		films: [],
		start: 0,
		hasMore: true
	},
	onLoad() {
		wx.showNavigationBarLoading();
		app.getCity(() => {
			wx.hideNavigationBarLoading();
			wx.setNavigationBarTitle({
				title: `正在热映 - ${config.city}`
			});
			douban.fetchFilms.call(this, config.apiList.popular, this.data.start);
		});
	},
	onPullDownRefresh() {
		this.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		});
		this.onLoad();
	},
	onReachBottom() {
		if (!this.data.showLoading) {
			douban.fetchFilms.call(this, config.apiList.popular, this.data.start)
		}
	},
	viewFilmDetail(e) {
		wx.navigateTo({
			url: `../filmDetail/filmDetail?id=${e.currentTarget.dataset.id}`
		});
	},
	viewFilmByTag(e) {
		const keyword = e.currentTarget.dataset.tag;
		wx.navigateTo({
			url: `../searchResult/searchResult?url=${encodeURIComponent(config.apiList.search.byTag)}&keyword=${keyword}`
		});
	},
	viewSearch() {
		wx.navigateTo({
			url: '../search/search'
		});
	},
	viewBannerDetail(e) {
		const data = e.currentTarget.dataset;
		if (data.type == 'film') {
			wx.navigateTo({
				url: "../filmDetail/filmDetail?id=" + data.id
			})
		} else if (data.type == 'person') {
			wx.navigateTo({
				url: '../personDetail/personDetail?id=' + data.id
			})
		} else if (data.type == 'search') {
			const searchUrl = data.search == 'keyword' ? config.search.byKeyword : config.search.byTag;
			wx.navigateTo({
				url: `../searchResult/searchResult?url=${encodeURIComponent(searchUrl)}&keyword=${data.keyword}`
			})
		}
	}
});