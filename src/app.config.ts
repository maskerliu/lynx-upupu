export default {
  pages: [
    'pages/main/index',
    'pages/myOrder/index',
  ],
  subpackages: [
    {
      root: 'settings',
      pages: [
        'pages/fontSize/index',
        'pages/contactUs/index',
        'pages/commonQA/index',
        'pages/feedback/index',
      ],
      independent: false
    },
    {
      root: 'post',
      pages: [
        'pages/myPost/index',
        'pages/postDetail/index',
      ],
      independent: false
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#edecec',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
