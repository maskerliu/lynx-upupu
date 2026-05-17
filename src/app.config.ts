export default {
  pages: [
    'pages/main/index',
    'pages/postDetail/index',
    'pages/myPost/index',
    'pages/myOrder/index',
  ],
  subpackages: [
    {
      root: 'settings',
      pages: [
        'pages/fontSize/index',
        'pages/contactUs/index',
        'pages/commonQA/index',
      ],
      "independent": false
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#edecec',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
