const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 前端代理服务器
  devServer: {
    proxy: {
      '/api': {
        // 后端服务器IP:PORT，自行修改
        target: 'http://192.166.111.45:8848',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
});
