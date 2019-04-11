// pages/luckCenter/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:94,    //默认样式top
    luckData:0,
    goodsList:[], //兑换商城列表
    imgs: [],    //头像列表
    btnArr:[1,1,1,1,1,1,1,1,1,1,1],      
    isSuccessful: false,
    signArr:[1,2,3,4,5,6,7],
    qiandao_day: 0 ,           //签到天数
    loadIsShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var frm;
    if (options.frm_qiandao){
      frm = Number(options.frm_qiandao)
      wx.request({
        url: index_url + '/lucky_coin/lucky_coin_centre',
        method: 'POST',
        data: {
          from_qiandao: frm,   //从签到来 1  否则 0
        },
        header: {
          'content-type': 'application/json',// 默认值
          'openid': openid
        },
        success: function (res) {
          console.log(res)

          if (res.data.is_qiandao === 0) {
            that.setData({
              qiandao_day: res.data.qiandao_day,
              isSuccessful: true,
            })
          }
          if (res.data.lucky_count) {
            that.dynamic(res.data.lucky_count)
          }
          that.setData({
            imgs: res.data.data ,       //更新分享人头像
            goodsList: res.data.shopping_list,   //分享商城列表
            loadIsShow:false
          })
        }
      })
    }

  },
  /**
   * 动效方法
   * 
   */
  dynamic: function (dt){     //dt信用币的数量
   var that = this;
   var top = this.data.top;
   var luc = 100 - dt;
   var idx = 0;
   var stom = setInterval(function () {
     if (luc >= top) {
       clearInterval(stom)
       that.setData({
         top: top
       })
     } else {
       top--;
       if (top == 5) {     //不让水流太满
         clearInterval(stom)
       }
       that.setData({
         top: top

       })
     }

   }, 20)
   var stm = setInterval(function () {
     if (idx >= dt) {
       clearInterval(stm)
       that.setData({
         luckData: idx
       })
     } else {
       idx++;
       that.setData({
         luckData: idx

       })
     }

   }, 30)
 },
  closePop:function(){
    this.setData({
      isSuccessful: false
    })
  },
/**
 * 跳转幸运币记录页
 */
  goLuckRecord:function(){
    wx:wx.navigateTo({
      url: '../luckRecord/index'
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
    var openid = app.globalData.openId;
    var title = '邀你免费参与抽奖，豪华大礼等你来拿！';
    var imageUrl = 'https://i.loli.net/2019/04/03/5ca4450284dd4.png';
    return {
      title: title,
      path: '/pages/index/index?share_id=' + openid,
      imageUrl: imageUrl
    }
  }
})