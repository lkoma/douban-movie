var config = require('./config.js');
var message = require('../../component/message/message');
// 电影列表
function fetchFilms(url, start, count, cb, fail_cb) {
    wx.request({
        url,
        data: {
            start,
            count: count || config.count,
            city: config.city
        },
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
            if (res.data.subjects.length === 0) {
                this.setData({
                    hasMore: false,
                })
            } else {
                this.setData({
                    films: this.data.films.concat(res.data.subjects),
                    start: this.data.start + res.data.subjects.length,
                    showLoading: false
                })
            }
            wx.stopPullDownRefresh();
            typeof cb == 'function' && cb(res.data);
        },
        fail: res => {
            this.setData({
                showLoading: false
            });
            message.show.call(this, {
                content: '网络开小差了',
                icon: 'offline',
                duration: 3000
            });
            wx.stopPullDownRefresh();
            typeof fail_cb == 'function' && fail_cb();
        }
    });
}
// 电影详情
function fetchFilmDetail(url, id, cb) {
    message.hide.call(this);
    wx.request({
        url: url + id,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
            this.setData({
                filmDetail: res.data,
                showLoading: false,
                showContent: true
            });
            wx.setNavigationBarTitle({
                title: res.data.title
            });
            wx.stopPullDownRefresh();
            typeof cb == 'function' && cb(res.data);
        },
        fail: () => {
            this.setData({
                showLoading: false
            })
            message.show.call(this, {
                content: '网络开小差了',
                icon: 'offline',
                duration: 3000
            });
        }
    });
}
// 人物详情
function fetchPersonDetail(url, id, cb) {
    message.hide.call(this);
    wx.request({
        url: url + id,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
            this.setData({
				personDetail: res.data,
				showLoading: false,
				showContent: true
			})
			wx.setNavigationBarTitle({
				title: res.data.name
			})
            wx.stopPullDownRefresh();
            typeof cb == 'function' && cb(res.data);
        },
        fail: () => {
			this.setData({
				showLoading: false
			});
			message.show.call(this, {
				content: '网络开小差了',
				icon: 'offline',
				duration: 3000
			})
		}
    });
}
// 电影搜索
function search(url, keyword, start, count, cb) {
    message.hide.call(this);
    if (this.data.hasMore) {
        wx.request({
            url: decodeURIComponent(url) + keyword,
            data: {
                start: start,
                count: count
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: res => {
                if (!res.data.subjects.length) {
                    this.setData({
                        hasMore: false,
                        showLoading: false
                    });
                    if (!start) {
                        this.setData({
                            isNull: true
                        });
                    }
                } 
                else {
                    this.setData({
                        films: this.data.films.concat(res.data.subjects),
                        start: this.data.start + res.data.subjects.length,
                        showLoading: false
                    });
                    if (res.data.subjects.length < count) {
                        this.setData({
                            hasMore: false
                        });
                    }
                    wx.setNavigationBarTitle({
                        title: keyword
                    });
                }
                wx.stopPullDownRefresh();
            },
            fail: () => {
                this.setData({
                    showLoading: false
                });
                message.show.call(this, {
                    content: '网络开小差了',
                    icon: 'offline',
                    duration: 3000
                });
            }
        });
    }
}
module.exports = {
    fetchFilms,
    fetchFilmDetail,
    fetchPersonDetail,
    search
};