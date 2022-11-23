module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tenbyten-admin/' : '/',
  devServer: {
    proxy: process.env.VUE_APP_TENBYTEN_API_URL,
  },
};
