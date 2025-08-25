// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    // 页面初始数据（默认显示默认头像和"Hello World"）
    data: {
      src: '/images/R.png',  // 默认头像路径
      name: 'Hello World'       // 默认昵称
    },
  
    // 页面加载时触发（判断是否支持wx.getUserProfile接口）
    onLoad: function () {
      // 检测当前微信版本是否支持wx.getUserProfile接口
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true  // 标记支持该接口（可选，本案例暂不使用）
        });
        console.log("当前微信版本支持wx.getUserProfile接口");
      } else {
        wx.showToast({
          title: '微信版本过低，请更新后使用',
          icon: 'none',
          duration: 2000
        });
        console.log("当前微信版本不支持wx.getUserProfile接口");
      }
    },
  
    // 自定义函数：获取用户信息（通过bindgetuserinfo触发）
    getMyInfo: function (e) {
      // 调用微信官方接口获取用户信息（需用户授权）
      wx.getUserProfile({
        desc: '用于展示您的个人头像和昵称',  // 必须声明用途（微信接口要求）
        success: (res) => {  // 接口调用成功回调
          console.log("用户信息获取成功：", res);  // 控制台打印用户信息（调试用）
          
          // 更新页面数据：将获取到的头像URL和昵称赋值给data
          this.setData({
            src: res.userInfo.avatarUrl,  // 替换为用户真实头像
            name: res.userInfo.nickName   // 替换为用户真实昵称
          });
        },
        fail: (err) => {  // 接口调用失败回调（如用户拒绝授权）
          console.log("用户信息获取失败：", err);
          wx.showToast({
            title: '您已拒绝授权，无法获取用户信息',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  });