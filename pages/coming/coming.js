const douban = require('../../comm/script/fetch');
const config = require('../../comm/script/config');
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0
	},
	onLoad() {
		douban.fetchFilms.call(this, config.apiList.coming, this.data.start);
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
			this.onLoad();
		}
	},
	viewFilmDetail(e) {
		wx.navigateTo({
			url: `../filmDetail/filmDetail?id=${e.currentTarget.dataset.id}`
		})
	},
	viewFilmByTag(e) {
		const keyword = e.currentTarget.dataset.tag
		wx.navigateTo({
			url: `../searchResult/searchResult?url=${encodeURIComponent(config.apiList.search.byTag)}&keyword=${keyword}`
		})
	}
});