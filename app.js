var config = require('comm/script/config');
App({
	globalData: {
		userInfo: null
	},
	onLaunch() {
		this.getUserInfo();
		this.initStorage()
	},
	getUserInfo() {
		wx.login({
			success: () => {
				wx.getUserInfo({
					success: res => {
						this.globalData.userInfo = res.userInfo;
					}
				});
			}
		});
	},
	getCity(cb) {
		wx.getLocation({
			type: 'gcj02',
			success: res => {
				wx.request({
					url: config.apiList.baiduMap,
					data: {
						ak: config.baiduAK,
						location: `${res.latitude},${res.longitude}`,
						pois: 1,
						output: 'json'
					},
					success(res) {
						const city = res.data.result.addressComponent.city.slice(0, -1);
						config.city = city;
						cb();
					}
				});
			}
		});
	},
	initStorage() {
		wx.getStorageInfo({
			success: res => {
				// 判断电影收藏是否存在，没有则创建
				if (!('film_favorite' in res.keys)) {
					wx.setStorage({
						key: 'film_favorite',
						data: []
					})
				}
				// 判断人物收藏是否存在，没有则创建
				if (!('person_favorite' in res.keys)) {
					wx.setStorage({
						key: 'person_favorite',
						data: []
					})
				}
				// 判断电影浏览记录是否存在，没有则创建
				if (!('film_history' in res.keys)) {
					wx.setStorage({
						key: 'film_history',
						data: []
					})
				}
				// 判断人物浏览记录是否存在，没有则创建
				if (!('person_history' in res.keys)) {
					wx.setStorage({
						key: 'person_history',
						data: []
					})
				}
				// 个人信息默认数据
				const personInfo = {
					name: '',
					nickName: '',
					gender: '',
					age: '',
					birthday: '',
					constellation: '',
					company: '',
					school: '',
					tel: '',
					email: '',
					intro: ''
				};
				// 判断个人信息是否存在，没有则创建
				if (!('person_info' in res.keys)) {
					wx.setStorage({
						key: 'person_info',
						data: personInfo
					});
				}
				// 判断相册数据是否存在，没有则创建
				if (!('gallery' in res.keys)) {
					wx.setStorage({
						key: 'gallery',
						data: []
					});
				}
				// 判断背景卡选择数据是否存在，没有则创建
				if (!('skin' in res.keys)) {
					wx.setStorage({
						key: 'skin',
						data: ''
					});
				}
				if (!('shakeFilmList' in res.keys)) {
					wx.setStorage({
						key: 'shakeFilmList',
						data: ''
					});
				}
			}
		});
	}
});