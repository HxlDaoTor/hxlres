Component({


  properties: {
    myProperty: { // 属性名 
    type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
    value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个 
    observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange' 
    }, 

  },

  data: {
    selected: 0,
    color: "#4d4d4d",
    selectedColor: "#ff5555",
    list: [{

      pagePath: "../index/index",
      iconPath: "../resources/sy.png",
      selectedIconPath: "../resources/decsy.png",
      text: "首页"
    },{
        pagePath: "../initiate/initiate",
        iconPath: "../resources/jia.png",
        selectedIconPath: "../resources/jia.png",
        text: "发起抽奖"
      },{
        pagePath: "../myper/myper",
        iconPath: "../resources/my.png",
        selectedIconPath: "../resources/decmy.png",
      text: "我的"
    }]
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        selected: this.data.myProperty
      })

    },
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path  
      if (data.index == 1){
        wx.navigateTo({ url})
      }else{
        wx.switchTab({ url })
        // this.setData({
        //   selected: this.index
        // })
      }

    }
  }
})