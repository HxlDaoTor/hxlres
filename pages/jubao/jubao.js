// jubao.js
var app = getApp();
Page({
  data: {
    radio: '',
    items: [
      { name: '欺诈', value: '欺诈' },
      { name: '色情', value: '色情'},
      { name: '政治谣言', value: '政治谣言' },
      { name: '常识性谣言', value: '常识性谣言' },
      { name: '诱导分享', value: '诱导分享' },
      { name: '恶意营销', value: '恶意营销' },
      { name: '隐私信息收集', value: '隐私信息收集' },
      { name: '其他侵权类（冒名、诽谤、抄袭）', value: '其他侵权类（冒名、诽谤、抄袭）' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  radioChange: function (e) {
    this.setData({
      radio: e.detail.value
    })
  },
  sed: function (e) {
    console.log(e)
    var url = app.globalData.url_b;
    var userid = app.globalData.useid; //存起来的用户id
    var radio = this.data.radio;
    var phone = 110;
    var wxhao = 120;
    if ( radio == '') {
             wx.showModal({   //弹窗接口
                title: '提示',
                content: '请选择举报原因',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    return
                  }
                }
              })
    }else {
      wx.showLoading({
        title: '正在提交',
        mask: true
      })
      wx.request({
        url: url + '/Api/ts/toushu.ashx',
        data: {
          userid: userid,
          toushu: radio,       //举报内容
        },
        success: function (ress) {
          
          // setTimeout(function () {
          // }, 1000)

          wx.redirectTo({
            url: '../submitok/submitok'
          })

        },
       fail: function(){

         wx.showToast({
           title: '网络异常',
           icon: '',
           image: '../../resources/shibai.png',
           duration: 1000
         })

       }

    })

  }

  }
})