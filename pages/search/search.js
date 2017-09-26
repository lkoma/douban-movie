const message = require('../../component/message/message');
const douban = require('../../comm/script/fetch');
const config = require('../../comm/script/config');
Page({
    data: {
        searchType: 'keyword',
        hotKeyword: config.hotKeyword,
        hotTag: config.hotTag
    },
    changeSearchType() {
        const types = ['默认', '类型'];
        const searchType = ['keyword', 'tag'];
        wx.showActionSheet({
            itemList: types,
            success: res => {
                if (!res.cancel) {
                    this.setData({
                        searchType: searchType[res.tapIndex]
                    })
                }
            }
        })
    },
    search(e) {
        const keyword = e.detail.value.keyword
        if (!keyword) {
            message.show.call(this, {
                content: '请输入内容',
                icon: 'null',
                duration: 1500
            })
            return false;
        } else {
            const searchUrl = this.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag;
            wx.redirectTo({
                url: `../searchResult/searchResult?url=${encodeURIComponent(searchUrl)}&keyword=${keyword}`
            })
        }
    },
    searchByKeyword(e) {
        const keyword = e.currentTarget.dataset.keyword;
        wx.redirectTo({
            url: `../searchResult/searchResult?url=${encodeURIComponent(config.apiList.search.byKeyword)}&keyword=${keyword}`
        })
    },
    searchByTag(e) {
        const keyword = e.currentTarget.dataset.keyword;
        wx.redirectTo({
            url: `../searchResult/searchResult?url=${encodeURIComponent(config.apiList.search.byTag)}&keyword=${keyword}`
        })
    }
});