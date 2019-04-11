// pages/cooper/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuccessful:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // switchPag: function () {             //上首页介绍页
  //   wx.navigateTo({ url: '../welfare/index' })
  // },
  openPoopup:function(){
    this.setData({
      isSuccessful: true
    })
  },
  closePop: function () {
    this.setData({
      isSuccessful: false
    })
  },
  copyContxt: function () {
    var copyTxt = 'yizhuan188';
    wx.setClipboardData({
      data: copyTxt,
      success(res) {
        wx.showToast({   //无图标弹窗
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
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

  }
})