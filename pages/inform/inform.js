// pages/inform/inform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    //console.log(that.data.id);
    // 列表
    wx.request({
      //?sign=" + that.data.sign + '&operator_id=' + that.data.operator_id,
      url: "http://what-test.playonwechat.com/rush/get-image-detail?sign=1ba9e27ead62643818245316f4fb5530&operator_id=190",
      data:{
          id:that.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        console.log(res.data.data);
        that.setData({
          content: res.data.data
        })
      }
    })
    wx.hideLoading()
  },
  back:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
})