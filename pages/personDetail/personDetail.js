const douban = require('../../comm/script/fetch');
const { getDate, getTime } = require('../../utils/moment');
const config = require('../../comm/script/config');
Page({
	data: {
		personDetail: {},
		showLoading: true,
		showContent: false,
		isPersonFavorite: false
	},
	onLoad(options) {
		douban.fetchPersonDetail.call(this, config.apiList.personDetail, options.id, data => {
			wx.getStorage({
				key: 'person_favorite',
				success: res => {
					for (let i = 0; i < res.data.length; i++) {
						if (res.data[i].id == options.id) {
							this.setData({
								isPersonFavorite: true
							})
						}
					}
				}
			})
			// 是否浏览过
			let person_data = [];
			wx.getStorage({
				key: 'person_history',
				success: res => {
					person_data = res.data;
					const now_data = {
						time: getTime(),
						data
					}
					// 今天的数据，没有时插入
					const sub_data = {
						date: getDate(),
						persons: []
					}
					sub_data.persons.push(now_data);
					if (!person_data.length) {
						person_data.push(sub_data);
					}
					else if (person_data[0].date === getDate()) {
						for (var i = 0; i < person_data[0].persons.length; i++) {
							// 如果存在则删除，添加最新的
							if (person_data[0].persons[i].data.id === data.id) {
								person_data[0].persons.splice(i,1);
							}
						}
						person_data[0].persons.push(now_data);
					}
					else {
						person_data.push(sub_data);
					}
					wx.setStorage({
						key: 'person_history',
						data: person_data
					})
				},
				fail: res => {
					console.log('----获取失败----')
				}
			});
		});
	},
	viewFilmDetail(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
			url: `../filmDetail/filmDetail?id=${data.id}`
		})
	},
	onPullDownRefresh() {
		const data = {
			id: this.data.filmDetail.id
		}
		this.onLoad(data);
	},
	favoritePerson() {
		wx.getStorage({
			key: 'person_favorite',
			success: res => {
				const person_favorite = res.data;
				if (this.data.isPersonFavorite) {
					for (let i = 0; i < person_favorite.length; i++) {
						if (person_favorite[i].id == this.data.personDetail.id) {
							person_favorite.splice(i, 1);
							this.setData({
								isPersonFavorite: false
							})
						}
					}
					wx.setStorage({
						key: 'person_favorite',
						data: person_favorite,
						success: res => {
							console.log('----设置成功----')
						}
					});
				} else {
					// 添加
					person_favorite.push(this.data.personDetail)
					wx.setStorage({
						key: 'person_favorite',
						data: person_favorite,
						success: res => {
							this.setData({
								isPersonFavorite: true
							})
						}
					})
				}
			}
		});
	}
});