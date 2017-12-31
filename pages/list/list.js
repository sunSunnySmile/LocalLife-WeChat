// pages/list/list.js
const fetch = require("../../utils/fetch.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        category: {},
        shops: [],
        pageIndex: 0,
        pageSize: 10,
        hasMore: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options.cat); //获取的只是一个id
        fetch(`categories/${options.cat}`)
            .then(
                res => {
                    this.setData({
                        category: res.data
                    })
                    wx.setNavigationBarTitle({
                        'title': this.data.category.name
                    })

                    // 调用测试loadMore
                    this.loadMore()

                    //         return fetch(`categories/${options.cat}/shops`, { _page: 1, _limit: 10 })
                    //     })
                    // .then(
                    //     res => {
                    //         this.setData({
                    //             shops: res.data
                    //         })
                }
            )
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        if (this.data.category.name) {
            wx.setNavigationBarTitle({
                title: this.data.category.name
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            shops: [],
            pageIndex: 0,
            hasMore: true
        })
        this.loadMore()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // console.log('已经没有啦');
        this.loadMore();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 封装一个loadMore函数，下拉加载更多数据
     */
    loadMore() {
        if (!this.data.hasMore) return;
        let { pageIndex, pageSize } = this.data;
        const params = {
            _page: ++pageIndex,
            _limit: pageSize
        }
        fetch(`categories/${this.data.category.id}/shops`, params)
            .then(
                res => {
                    console.log(res);
                    const totalCount = parseInt(res.header['X-Total-Count']);
                    const hasMore = pageIndex * pageSize < totalCount;
                    const shops = this.data.shops.concat(res.data);
                    this.setData({
                        shops: shops,
                        pageIndex: pageIndex,
                        hasMore: hasMore
                    })
                }
            )
    }
})