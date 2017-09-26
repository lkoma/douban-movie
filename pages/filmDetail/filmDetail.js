const douban = require('../../comm/script/fetch');
const config = require('../../comm/script/config');
const { getDate, getTime } = require('../../utils/moment');
Page({
	data: {
		filmDetail: {},
		showLoading: true,
		showContent: false,
		isFilmFavorite: false
	},
	onLoad(options) {
		douban.fetchFilmDetail.call(this, config.apiList.filmDetail, options.id, data => {
			// 判断是否收藏
			wx.getStorage({
				key: 'film_favorite',
				success: res => {
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].id == options.id) {
							this.setData({
								isFilmFavorite: true
							})
						}
					}
				}
			});
			// 是否浏览过
			let film_data = [];
			wx.getStorage({
				key: 'film_history',
				success: res => {
					film_data = res.data;
					const now_data = {
						time: getTime(),
						data
					}
					// 今天的数据，没有时插入
					const sub_data = {
						date: getDate(),
						films: []
					}
					sub_data.films.push(now_data);
					if (!film_data.length) {
						film_data.push(sub_data);
					}
					else if (film_data[0].date === getDate()) {
						for (var i = 0; i < film_data[0].films.length; i++) {
							// 如果存在则删除，添加最新的
							if (film_data[0].films[i].data.id === data.id) {
								film_data[0].films.splice(i,1);
							}
						}
						film_data[0].films.push(now_data);
					}
					else {
						film_data.push(sub_data);
					}
					wx.setStorage({
						key: 'film_history',
						data: film_data
					})
				},
				fail: res => {
					console.log('----获取失败----')
				}
			});
		});
	},
	viewPersonDetail(e) {
		wx.redirectTo({
			url: `../personDetail/personDetail?id=${e.currentTarget.dataset.id}`
		})
	},
	viewFilmByTag(e) {
		const keyword = e.currentTarget.dataset.tag
		wx.redirectTo({
			url: `../searchResult/searchResult?url=${encodeURIComponent(config.apiList.search.byTag)}&keyword=${keyword}`
		})
	},
	favoriteFilm() {
		wx.getStorage({
			key: 'film_favorite',
			success: res => {
				const film_favorite = res.data;
				if (this.data.isFilmFavorite) {
					for (let i = 0; i < film_favorite.length; i++) {
						if (film_favorite[i].id == this.data.filmDetail.id) {
							film_favorite.splice(i, 1);
							this.setData({
								isFilmFavorite: false
							})
						}
					}
					wx.setStorage({
						key: 'film_favorite',
						data: film_favorite,
						success: res => {
							console.log('----设置成功----')
						}
					});
				}
				else {
					// 添加
					film_favorite.push(this.data.filmDetail)
					wx.setStorage({
						key: 'film_favorite',
						data: film_favorite,
						success: res => {
							this.setData({
								isFilmFavorite: true
							})
						}
					})
				}
			}
		});
	}
});