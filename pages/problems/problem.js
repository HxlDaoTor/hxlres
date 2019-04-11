// problem.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    show: false,
    isAtshow: false,   
    tcIsshow: false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //弹层关闭
  consoleTc:function(){
    this.setData({
      tcIsshow: false
    })
  },
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.url_a;
    // this.data.list.forEach(function (item) {
    //   item.toggle = false
    //   console.log(item)
    // })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url + '/business_cooperation/get_rule',
      success: function (ress) {
        wx.hideLoading()
     //   console.log(ress)
      that.setData({
        list: ress.data.data,
        isAtshow:true,
        show:true
      })
      },
      fail: function () {  //获取数据失败
        wx.showToast({
          title: '获取数据失败',
          icon: '',
          image: '../../resources/gantanhao.png',
          duration: 1000
        });
      },
      complete: function () { //成功失败都会执行
        // wx.hideLoading()
      }
    });

    console.log(that.data.list)

  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    
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
    var that = this;
    that.setData({
    list: that.data.list
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
  // onShareAppMessage: function () {
  
  // },
  onChangeShowState: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  logToggle: function (e) {
     let index = e.currentTarget.dataset.index,
      nowToggle = this.data.list[index].toggle;
    console.log(e)
    this.setData({
     // ['list.toggle']: false,
      ['list[' + index + '].toggle']: !nowToggle
    })
    console.log(this.data.list)
  },
  weapp: function (e) {
  console.log(e)
  }

})