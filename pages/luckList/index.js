// pages/luckList/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfarelist:[],
    isSuccessful:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    if (options.code){
    var code = Number(options.code);
        wx.request({
          url: index_url + '/itemsapp/show_user_participation_luckydraw',
          method: 'POST',
          data: {
            is_type: code
          },
          header: {
            'content-type': 'application/json',// 默认值
            'openid': openid
          },
          success: function (res) {
            console.log(res)

            // that.setData(data)
            that.setData({
              welfarelist: res.data.data
            })
          }
        })
    }

  },
  navigatorTo:function(ev){
    console.log(ev)
    var relea_id = ev.currentTarget.dataset.key; 
    var isaudit = ev.currentTarget.dataset.val;
    if (isaudit == '审核中'){
      // wx.showToast({   //无图标弹窗
      //   title: '审核中，请联系客服',
      //   icon: 'none',
      //   duration: 2000
      // })
      this.setData({
        isSuccessful:true
      })
    }else{
      wx: wx.navigateTo({
        url: '../homDetails/index?relea_id=' + relea_id,
      })
    }

  },
  closePop: function () {
    this.setData({
      isSuccessful:false
    })
    // wx.redirectTo({
    //   url: '../luckList/index?code=2'
    // })

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