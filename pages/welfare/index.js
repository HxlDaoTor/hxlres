// pages/welfare/ｉｎｄｅｘ.js
const app = getApp()
let pageNum = 0       //当前页数 默认0第一页
let allPages = 0        //总页数 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    luckyDrawImgs:[],
    relea_id:null,
    isLoad:false,
    peopleNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
   //console.log(pageNum)
    if (options.relea_id){
        that.setData({
          relea_id: options.relea_id
        })
        wx.request({
          url: index_url + '/itemsapp/head_list',
          method: 'POST',
          data: {
            relea_id: options.relea_id,
            current_page: pageNum
          },
          header: {
            'content-type': 'application/json',// 默认值
            'openid': openid
          },
          success: function (res) {

            console.log(res)
            if (res.data.data){
              that.setData({
                luckyDrawImgs: res.data.data,
                peopleNum: res.data.number
              })
              allPages = res.data.count_page - 1;
              if (allPages > pageNum) {
                pageNum++;
                that.setData({
                  isLoad: true
                })
              }
            }

          }
        })
    }

  },
  //点击加载更多
  pagesNumData:function(){
    var that = this;
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var relea_id = this.data.relea_id;
    var arrymsg = this.data.luckyDrawImgs;
    if (allPages >= pageNum ){   //总页数大于等于 当前请求页
      wx.request({
        url: index_url + '/itemsapp/head_list',
        method: 'POST',
        data: {
          relea_id: relea_id,
          current_page: pageNum
        },
        header: {
          'content-type': 'application/json',// 默认值
          'openid': openid
        },
        success: function (res) {

          console.log(res)

          if (res.data.data) {
            var arrmsg = res.data.data;
            var arrList = arrymsg.concat(arrmsg);   //合并前一个数组
            that.setData({
              luckyDrawImgs: arrList,
              peopleNum: res.data.number
            })

            
            allPages = res.data.count_page - 1;
            if (allPages > pageNum){
              pageNum++;
            }else{
              that.setData({
                isLoad: false
              })
            }
          }
        }
      })
    }else{

    }

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
     pageNum = 0       //当前页数 默认0第一页
     allPages = 0        //总页数 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     pageNum = 0       //当前页数 默认0第一页
     allPages = 0        //总页数 
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