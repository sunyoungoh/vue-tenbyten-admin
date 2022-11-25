module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-tenbyten-admin/' : '/',
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: {
      '/api': {
        target: process.env.VUE_APP_TENBYTEN_API_URL,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/mail': {
        target: process.env.VUE_APP_MAIL_API_URL,
        changeOrigin: true,
      },
    },
  },
};
