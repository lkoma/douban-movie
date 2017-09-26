const config = require('../../comm/script/config')
const app = getApp();
Page({
	data: {
		gridList: [{
				enName: 'favorite',
				zhName: '收藏'
			},
			{
				enName: 'history',
				zhName: '浏览记录'
			},
			{
				enName: 'shake',
				zhName: '摇一摇'
			},
			{
				enName: 'gallery',
				zhName: '相册'
			},
			{
				enName: 'setting',
				zhName: '设置'
			}
		],
		skin: '',
		userInfo: {}
	},
	onLoad(cb) {
		if (app.globalData.userInfo != null) {
			this.setData({
				userInfo: app.globalData.userInfo
			})
		} else {
			app.getUserInfo();
		}
		typeof cb == 'function' && cb();
	},
	onShow() {
		wx.getStorage({
			key: 'skin',
			success: res => {
				if (!res.data) {
					this.setData({
						skin: config.skinList[0].imgUrl
					})
				} else {
					this.setData({
						skin: res.data
					});
				}
			}
		});
	},
	onPullDownRefresh() {
		this.onLoad(() => {
			wx.stopPullDownRefresh();
		})
	},
	viewSkin() {
		wx.navigateTo({
			url: "../skin/skin"
		});
	},
	viewGridDetail(e) {
		const data = e.currentTarget.dataset;
		wx.navigateTo({
			url: `../${data.url}/${data.url}`
		})
	},
});