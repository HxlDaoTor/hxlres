// pages/initiate/initiate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadImg:'',
    showimg: true,  //上传图片和按钮转换，false为图片显示
    multiArray: [[],[],[]],  //选择的【日期】 【小时】 【分钟】
    multiIndex: [0, 0, 0],
    arrH:[], //当天可选择的小时
    _arrH:[],  //其他时候可选择的小时   24小时都可
    arrM: [],   //当天可选择的分钟
    _arrM: [],   //其他时候可选择的分钟   60分钟都可
    conditions: [{ txt: '按时间自动开奖', txtp: '到达设定时间自动开奖' }, { txt: '按人数自动开奖', txtp: '到达设定人数自动开奖' }, { txt: '手动开奖',       txtp: '发起人手动开奖' }, { txt: '取消'}],
    isTxtShow:true,   //说明输入框 隐藏 显示
    isTcShow:false ,     //开奖条件弹窗
    tiajianTxt:'到达设定时间自动开奖',
    time:'12:01',
    imgArr:[]  ,           //上传的详情图片
    isShouquan:false,      //是否授权 变换按钮
    wxNickname:'',          //微信昵称
    wxHeaderimg:''          //微信头像

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this;
    var isUsersinfo = app.globalData.isUserInfo;   //是否有头像昵称
    // wx.showToast({   //无图标弹窗
    //   title: '成功',
    //   icon: 'none',
    //   duration: 2000
    // })

    wx.hideTabBar({
    }) 

    if (options.cjurl) {        //裁剪后的图  上传至服务器
          wx.uploadFile({
            url: 'https://img.koo4.cn/up.php',
            filePath: options.cjurl,
            name: 'file',
            header: {
              'content-type': "multipart/form-data",
            },
            success: function (res) {
              var data = JSON.parse(res.data);
              //console.log(data)
              if (res) {
                that.setData({
                  showimg: false,
                  uploadImg: data.message          //提交服务器的图片
                })            
              }
            }
          })

    } 
    if (isUsersinfo == 1){   //有头像昵称 不需要授权
      that.setData({
        isShouquan: true
      })
    }
    this.getNowTime(); //获取可选择的时间

  },
  /**
   * input事件 奖品数量
   */
  numInputEv:function(e){
    var maxSum = 100;  //限制的最大数量
    var val = parseInt(e.detail.value); //转化为number
    var that = this;
    var num;   //先定义一个变量，后改变值
    var digitize = function (n) {  //接受一个number类参数，拆分成一个数组并返回
      var str = n + "";    //加上空字符中，把接收的参数转换为字符串
      var arr = [];         //声明结果空数组，稍后返回
      str.split("").forEach(function (item) {
        arr.push(item);    //对传入的每个字符用pasreInt转换为数字并压入arr数组
      })
      return arr;  //返回结果数组
    }
    var oarr = digitize(e.detail.value); //执行这个方法，将value转换维数组
    oarr.pop();//删除最后一个数组元素,删除刚输入的值
    num = oarr.join(''); //返回删除后，数组合并的元素，最后返回的值
    if (val == 0) {

      return num
    }
    else if (val > maxSum) {

      return num
    }

  },
  /**
   * 获取可选择的时间
   */
  getNowTime: function (){
    var multiArray = [[], [], []];   //开奖设置的时间数组  【月日】 【 时】  【分】
    var now = new Date();
    var year = now.getFullYear(); 
    var month = now.getMonth() + 1; 
    var day = now.getDate();
     if(month < 10) {
          month = '0' + month;
       }; 
    // if(day < 10) { 
    //     day = '0' + day;
    // };

     var h = now.getHours(); 
    var m = now.getMinutes();
 
        now.setMonth(month);
        now.setDate(0);
    var getDta = now.getDate()   //获取当月天数
    var poor = getDta - parseInt(day);   //时间差
    if (poor >= 6){   //当月够7天 今日也要算上
      console.log(day + 7)
          for (var i = day; i < day + 7; i ++ ){
            if (i < 10) { 
                  i = '0' + i;
              };
            var monthDay = month + '月' + i + '日';
            multiArray[0].push(monthDay) 
          }
   
    } else {   //当月不够7天
          for (var i = day; i <= getDta; i++) {   // 这个月剩余的不到7天 遍历出来

                var monthDay = month + '月' + i + '日';
                multiArray[0].push(monthDay)
          }
          for (var i = 1; i < 7 - poor; i++){            //再加上下个月的几天也要遍历出来
                var _month = parseInt(month) + 1;
                if (_month < 10) {
                    _month = '0' + _month;
                }; 
                if (i < 10) {
                  i = '0' + i;
                };
                var monthDay = _month  + '月' + i + '日';
                multiArray[0].push(monthDay)
          }
    }
     var _h = [];     //当天可选择的 小时 的数组
     var all_h = [];   //其他时间可选择的 小时 的数组
     var _m = [];       //当天可选择的 分钟 的数组
     var all_m = [];    //其他时间可选择的 分钟 的数组
     for (var i = h+1 ; i < 24; i++){                //当天可选择的小时 要多一小时
      if(i<10){
        i = '0' + i
      }
      _h.push(i)
     }
    for (var i = 0; i < 24; i++){                       //其他时候可选择的小时  24小时
      if (i < 10) {
        i = '0' + i
      }
      all_h.push(i)
     }
    for (var i = m; i < 60; i++){
      if (i < 10) {
        i = '0' + i
      }
      _m.push(i)
    }
    for (var i = 0; i < 60; i++) {
      if (i < 10) {
        i = '0' + i
      }
      all_m.push(i)
    }    
    multiArray[1] = _h;
    multiArray[2] = _m;
  
    this.setData({
      multiArray: multiArray,
      arrH: _h,     
      _arrH: all_h, 
      arrM: _m,   //当天可选择的分钟
      _arrM: all_m,
    })

   // console.log(multiArray)
},

/**
 * 点击授权按钮后触发
 * 
 */
  onGotUserInfo:function(ev){  
   var that = this;
    console.log(ev)
    var openid = app.globalData.openId;
    var index_url = app.globalData.url_a;
    var nickName = ev.detail.userInfo.nickName;
    var avatarUrl = ev.detail.userInfo.avatarUrl;
    wx.getSetting({  //检查是否授权
      success(res) {
              if (res.authSetting['scope.userInfo']) {  //已授权
                        wx.showToast({   //无图标弹窗
                          title: '授权成功',
                          icon: 'none',
                          duration: 2000
                        })
                        that.setData({
                          isShouquan: true,
                          wxNickname: nickName,          //微信昵称
                          wxHeaderimg: avatarUrl          //微信头像
                        })
                      wx.request({                      //提交头像昵称
                        url: index_url + '/itemsapp/get_headportrait',
                        method: 'POST',
                        data: {
                          wxnick: nickName,
                          head_img: avatarUrl
                        },
                        header: {
                          'content-type': 'application/json',
                          'openid': openid
                        },
                        success: function (ress) {
                          console.log(ress)
                          app.globalData.isUserInfo = 1;  //更改全局是否有头像数据 已有
                        }
                      })         
              }
      }
    })
  },

    /**
   * 上传图片
   */
  uploadimg: function () {  //头图图片上传
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        wx.getImageInfo({
          src: tempFilePaths[0],
          success: function (res) {
            var width = res.width;
            var height = res.height;

            if (height > width * 4) {  //图片太长了
              wx.showToast({
                title: '图片太长了',
                icon: '',
                image: '../../resources/gantanhao.png',
                duration: 2000
              })
            } else if (width > height * 4) {
              wx.showToast({
                title: '图片太宽了',
                icon: '',
                image: '../../resources/gantanhao.png',
                duration: 2000
              })

            } else if (height > 3000 || width > 3000) {      //图片太大了
              wx.showToast({
                title: '图片太大了',
                icon: '',
                image: '../../resources/gantanhao.png',
                duration: 2000
              })

            } else {

              wx.redirectTo({
                url: '../try/try?imgurl=' + tempFilePaths,
                success: function () {
                }
              })

            }

          }
        })

      }
    })
  },
  uploadimgXq: function () {  //详情图片上传
    var that = this;
    var urlList = this.data.imgArr;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://img.koo4.cn/up.php',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': "multipart/form-data",
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            //  console.log(data)
            if (res) {
                urlList.push(data.message);
                that.setData({
                  imgArr: urlList       //添加多张图片
                })
            }
          }
        })
       // urlList.push(tempFilePaths[0]);
        // that.setData({
        //   imgArr: urlList       //添加多张图片
        // })
      }
    })
  },
  //删除详情图片
  deleteImg:function(ev){
  // console.log(ev)
    var imgArr = this.data.imgArr;
    var index = ev.currentTarget.dataset.key;
       imgArr.splice(index, 1); 
       this.setData({
         imgArr: imgArr
       })
  },
  jumpNext:function(){   //下一步跳转
    wx.navigateTo({ url: '../welfare/index' }) 
  },
  closePop:function(){    //关闭弹层
    this.setData({
      isTcShow: false,
      isTxtShow: true,
    }) 
  },

  clickPopup: function(ev){   //点击修改条件选择
    var txtArr = this.data.conditions;  
    var idx = ev.currentTarget.dataset.key;
    if(idx === 3){  //取消
      this.setData({
        isTcShow:false,
        isTxtShow: true,
      })  
    }else{
       this.setData({
         isTcShow: false,
         isTxtShow:true,
         tiajianTxt: txtArr[idx].txtp,
       })
    }
  },
  modify:function(){
   this.setData({
     isTcShow:true,
     isTxtShow:false
   })
  },
/*
 * 拨动时间的时候改变相应的值 确定的时候触发
 */
  bindMultiPickerChange: function (e) {    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  /**
   *  /改变列的值时就触发
   */
  bindMultiPickerColumnChange: function (e) {   
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var arrH = this.data.arrH;
    var _arrH = this.data._arrH;
    var arrM = this.data.arrM;
    var _arrM = this.data._arrM;      
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;


    switch (e.detail.column) {
      case 0:        //第一列改变
        switch (data.multiIndex[0]) {
          case 0:   //第一列第一个
            data.multiArray[1] = arrH;   //时
            data.multiArray[2] = arrM;              //分
            break;
         default:
            data.multiArray[1] = _arrH;
            data.multiArray[2] = _arrM;
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:     //第二列改变
        switch (data.multiIndex[0]) {  //看第一列的值
          case 0:        //第一列第一个的时候
            switch (data.multiIndex[1]) {  //再看第二列的值
              case 0:                                      //再看第二列第一个的时候
                data.multiArray[2] = arrM;  //改变第三列的值  分
                break;
              default:
                data.multiArray[2] = _arrM; //改变第三列的值
                break;
  
            }
            break;
          default:   //第一列非第一个的值   
            data.multiArray[2] = _arrM;
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /*表单提交
  */
  formSubmit:function(ev){
    var openid = app.globalData.openId;   
    var index_url = app.globalData.url_a;
    var prize_amount = ev.detail.value.goodsNumber;
    var formId = ev.detail.formId;
    var prize_name = ev.detail.value.goodsName;
    var copyconts = ev.detail.value.copyTxt;
    var rwdesc = ev.detail.value.goodsInstructions;
    var prize_recommend = ev.detail.value.goodsIntroduce;
    var imgSrc = this.data.uploadImg;
    var imgArr = this.data.imgArr;
    var wxNickname = this.data.wxNickname;              //微信昵称
    var wxHeaderimg = this.data.wxHeaderimg;            //微信头像

    var multiArray = this.data.multiArray;
    var multiIndex = this.data.multiIndex;
    var years = new Date().getFullYear(); 
    var monthDay = multiArray[0][multiIndex[0]];
    var _monthDay = monthDay.replace(/(\w*)月(.*)日(.*)/g, '$1-$2');   //同时替换掉月日
    var hours = multiArray[1][multiIndex[1]];                          //时
    var minutes = multiArray[2][multiIndex[2]];                        //分
    var kjtimes = years + '-' +  _monthDay + ' ' + hours + ':' + minutes + ':' + '00';
    var data = {      
            prize_name: prize_name,                  //奖品名称
            prize_amount: prize_amount,              //奖品数量
            prize_img: imgSrc,                       //奖品主图
            copyconts: copyconts,                    //要复制的内容
            rwdesc: rwdesc,                          //抽奖说明
            prize_recommend: prize_recommend,         //奖品介绍
            jieshaoimg: imgArr,                      //奖品详情图
            kjtimes: kjtimes,                        //开奖时间
            wxnick: wxNickname,
            head_img: wxHeaderimg,
            form_id: formId
    }
   // console.log(ev)
    if (imgSrc == ''){

        wx.showToast({   //无图标弹窗
          title: '请添加奖品图片',
          icon: 'none',
          duration: 2000
        }) 

      return false
    }
    var subData = JSON.stringify(data);
    wx:wx.navigateTo({
      url: '../confirmTask/index?subData=' + subData
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