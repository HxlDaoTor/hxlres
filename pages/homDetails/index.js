// pages/homDetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    autoplay:true,
    circular:true,
    vertical:false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    isSuccessful:false  ,                    //是否参与成功 弹窗

    isDraw:null,                             //点击抽奖  按钮控制
    isShowBtn:null,                          //已结束或 待开奖按钮控制 
    isInformation:null,                      //中奖信息 显示控制
    btnContxt:'',                           //按钮显示内容

    pagesData:{},                            //页面展示数据  
    relea_id:null,                            //任务 id
    
    clickNum:0,                               //抽奖按钮 只能点击一次
    luckytxt:'点击抽奖',
  
    isAddress:false ,                        //是否显示 查看中奖者信息 按钮  
    formId:null ,

    loadIsShow:true,
    pagesNum:false                           //是否显示home键 默认不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();   //获取页面栈
    var that = this;
    var openid;
    var index_url = app.globalData.url_a;
    if (pages.length <= 1) {
      this.setData({
        pagesNum: true
      })
    }
    if (options.relea_id){           //任务id 存在
        that.setData({
          relea_id: options.relea_id
        })
        if (app.globalData.openId){
          openid = app.globalData.openId;
          that.getDataFn(openid, options.relea_id);
        } else if (wx.getStorageSync('openId')){
          openid = wx.getStorageSync('openId');
          that.getDataFn(openid, options.relea_id); 
        }else{   //先登录获取openid  
            wx.login({
              success: function (resss) {
                if (resss.code) {
                  wx.request({         //登陆获取openid
                    url: index_url + '/itemsapp/get_openid',
                    method: 'POST',
                    data: {
                      code: resss.code
                    },
                    header: {
                      'content-type': 'application/json',
                      'openid': ''
                    },
                    success: function (ress) {
                      openid = ress.data.openid;
                      that.getDataFn(openid, options.relea_id);
                    }

                  })
                }
              }
            })


        }
       
     }

    console.log('任务id:' + options.relea_id)


  },
  getDataFn: function (openid, relea_id){              //请求页面数据 
    var that = this;
    var index_url = app.globalData.url_a;
    wx.request({
      url: index_url + '/itemsapp/show_luckydraw_particulars',
      method: 'POST',
      data: {
        relea_id: relea_id
      },
      header: {
        'content-type': 'application/json',// 默认值
        'openid': openid
      },
      success: function (res) {
        console.log(res)
        var winnerTitl;
        var winnerContxt;
        var isWinner;
        var isTo = true;    //是否参与 控制填写地址按钮显示
        if (res.data.data.is_join_lucky === 1 && res.data.data.kjtimes_state === 1) {  //显示抽奖按钮  未参与 未开
          that.setData({
            isDraw: true
          })
        } else if (res.data.data.is_join_lucky === 0 && res.data.data.kjtimes_state === 1) {         // 已参与 未开
          //isDraw = false
          that.setData({
            isShowBtn: true,
            btnContxt: '待开奖'
          })
        } else if (res.data.data.is_join_lucky === 1 && res.data.data.kjtimes_state === 0) {         //未参与 已开奖

          if (res.data.data.is_benrenfaqi === 0) {   //本人发起 未参与也能看到中奖者信息
            that.setData({
              isInformation: true
            })
            // isParticipate = true;
          } else {
            that.setData({
              isShowBtn: true,
              btnContxt: '已结束'
            })
          }

        } else if (res.data.data.is_join_lucky === 0 && res.data.data.kjtimes_state === 0) {        //已参与 已开奖 isInformation
          that.setData({
            isInformation: true
          })
        }
        if (res.data.data.is_zhongjiang_type === 0) {                  //中奖了
          winnerTitl = '恭喜，你中奖了！';
          winnerContxt = '记得及时填写收货地址哦~';
          isWinner = true;
        } else {

          isWinner = false;
          if (res.data.data.is_benrenfaqi === 0 && res.data.data.is_join_lucky === 1) {
            winnerTitl = '以下是中奖人信息';
            winnerContxt = '';
            isTo = false;
          } else {
            winnerTitl = '很遗憾，你本次未中奖';
            winnerContxt = '你可以继续参与其他抽奖';
          }
        }
        //本人发起 、已开奖 、参与人数大于0  显示查看中奖者信息按钮
        if (res.data.data.number_people > 0 && res.data.data.is_benrenfaqi === 0 && res.data.data.kjtimes_state === 0) {
          that.setData({
            isAddress: true
          })
        }
        var data = {
          goodsImg: res.data.data.prize_details,                       //商品主图   数组需循环过滤
          goodsName: res.data.data.prize_details[0].prize_name,        //商品名称
          goodsNumber: res.data.data.prize_details[0].prize_amount,      //商品数量
          patron: res.data.data.wxnick,                                  //赞助人昵称
          instructions: res.data.data.rwdesc,                           //抽奖说明
          luckyDraw: res.data.data.number_people,                       //抽奖人数
          luckyDrawImgs: res.data.data.touxiang_url,                      //抽奖人头像列表
          goodsIntroduction: res.data.data.prize_recommend,               //商品介绍
          goodsImgsList: res.data.data.jieshaoimg,                        //商品详情图列表  数组
          drawTimes: res.data.data.kjtimes,                              //开奖日期
          copyTxt: res.data.data.copyconts,
          // isDraw:res.data.data.is_join_lucky,                            //是否已参与这个抽奖   0 是 1 否
          //   isStatus:res.data.data.kjtimes_state                           //是否已开奖   0 是  1 否
          // is_benrenfaqi:res.data.data.is_benrenfaqi                        //是否本人发起
          winner: {          //中奖者信息
            img: res.data.data.winner_head_img,
            nick: res.data.data.winner_wxnick,
            isWinner: isWinner,                   //是否显示 填写收货地址按钮
            winnerTitl: winnerTitl,
            winnerContxt: winnerContxt,
            //        isParticipate: isParticipate       ////我发起未参与 不显示是否中奖口号  true
            isTo: isTo,
            address: res.data.data.winner_site,   //中奖者收货地址
          }
        }
        that.setData({
          pagesData: data,
          loadIsShow:false
        })
        //  console.log(that.data.pagesData)

      }
    })   
  },
  /**
   * 点击授权按钮时候触发
   */
  onGotUserInfo:function(ev){    //点击抽奖按钮 先检查是否授权
    // this.setData({
    //   isSuccessful:true
    // })
    var that = this;
    var clickNum = this.data.clickNum;            //只能点一次抽奖按钮
   // console.log(ev)
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var nickName ='';
    var avatarUrl = '';
    var relea_id = that.data.relea_id; 
    var formId = that.data.formId; 
    console.log(formId) 
    if (ev.detail.userInfo){
      nickName = ev.detail.userInfo.nickName;
      avatarUrl = ev.detail.userInfo.avatarUrl;
    }
    if (clickNum === 0){

          wx.getSetting({  //检查是否授权
            success(res) {
              if (res.authSetting['scope.userInfo']) {  //已授权
                that.setData({
                  clickNum: 1,
                  luckytxt: '抽奖中...'
                })
                wx.request({                      //提交头像昵称
                  url: index_url + '/itemsapp/join_luckydraw',
                  method: 'POST',
                  data: {
                    relea_id: relea_id,
                    wxnick: nickName,
                    head_img: avatarUrl,
                    form_id:formId
                  },
                  header: {
                    'content-type': 'application/json',
                    'openid': openid
                  },
                  success: function (ress) {
                    console.log(ress)
                    var luckyArrimgs = that.data.pagesData;
                    luckyArrimgs.luckyDrawImgs = ress.data.data.winner_head_img;   //更新参与人头像列表
                    luckyArrimgs.luckyDraw = ress.data.data.winner_num;   //更新参与人数量
                    if (ress.data.data.is_canyusuessd === 0) {  //参与成功
                      that.setData({
                        isDraw: false,
                        isShowBtn: true,
                        btnContxt: ress.data.data.message,
                        isSuccessful: true,    //成功弹窗
                        pagesData: luckyArrimgs
                      })
                    } else {
                      wx.showToast({   //无图标弹窗
                        title: '抽奖失败',
                        icon: 'none',
                        duration: 2000
                      })
                      that.setData({
                        isDraw: false,
                        isShowBtn: true,
                        btnContxt: ress.data.data.message,
                        pagesData: luckyArrimgs
                      })
                    }

                  },
                  complete:function(){      
                    that.setData({
                        clickNum: 0,          //初始化按钮
                        luckytxt: '点击抽奖'
                    })
                  }
                })
              }
            }
          })    
    } 

  },
  closePoup:function(){
    this.setData({
      isSuccessful: false
    })  
  },
  /**
   * 跳转填写收货地址
   */
  writeAdderss:function(){
    wx.navigateTo({
      url: '../goodsAddress/index',
    })
  },
  /**
   * 跳转首页
   */
  jumpHome: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 查看中奖者信息
   */
  jumpWinning:function(){
    var winner = {
         headImg:  this.data.pagesData.winner.img,
         wxNick: this.data.pagesData.winner.nick,
         address: this.data.pagesData.winner.address
    } 
    wx.navigateTo({
      url: '../winnerInfo/index?winnerImg=' + winner.headImg + '&&winnerNick=' + winner.wxNick + '&&winnerAddress=' + winner.address,
    })  
  },
  /**
   * 获取formid
   */
  catchSubmit:function(ev){
    console.log(ev)
    var formId = ev.detail.formId;
    this.setData({
      formId: formId
    })
  },
  /**
   * 一键复制
   */
  copyTxtEven:function(ev){
    var copyTxt = ev.target.dataset.key;
  //  console.log(ev)
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
  allHeadImg:function(){
    var relea_id = this.data.relea_id;
    wx.navigateTo({
      url: '../welfare/index?relea_id=' + relea_id,
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
    var arr = ['心态崩了！我拉他凑人头，他中奖了...', 
                '我想要开这个，点进来帮我凑个人数', 
                'h免费抽奖，比比看谁运气好',
                '免费商品，拼运气，看看谁中的多'
              ];
    var index = Math.floor((Math.random() * arr.length));  //随机数
    var title = arr[index];  //title
    var relea_id = this.data.relea_id;
   // var title = this.data.pagesData.goodsName;         //商品名
    var imageUrl = this.data.pagesData.goodsImg[0].prize_img;
    return {
      title: title,
      path: '/pages/homDetails/index?relea_id=' + relea_id,
      imageUrl: imageUrl
    }
  }
})