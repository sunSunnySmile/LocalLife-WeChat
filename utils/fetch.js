module.exports = function(url, data) {
    let p = new Promise(function(resolve, reject) {
        wx.request({
            url: `https://locally.uieee.com/${url}`,
            data: data,
            success: resolve,
            fail: reject
        })
    });
    return p;
}