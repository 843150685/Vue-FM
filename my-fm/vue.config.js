const path = require("path");
const debug = process.env.NODE_ENV !== "production"; // 开发模式

module.exports = {
  // 部署应用包时的基本URL，如果是生产环境，部署到 /clistudy/dist 路径；如果是开发环境，部署到根路径
  publicPath: !debug ? "/" : "/",

  // 输出文件路径
  outputDir: "dist",

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue构建版本，设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 生产环境不需要sourceMap
  productionSourceMap: false,

  // 修改webpack的配置
  configureWebpack: config => {
    if (!debug) {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }

    Object.assign(config, {
      resolve: {
        alias: {
        
        }
      }
    });
  },

  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    open: true,
    host: "localhost",
    port: 3006,
    https: false,
    proxy: {
      // 凡是以api开头的请求路径都会用后端的规则来处理
      "/api/*": {
        target: "http://39.106.163.124:8888/#/ ",
        secure: false, // 目标服务器地址是否是安全协议
        changeOrigin: true // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!服务端和服务端的请求是没有跨域的
        // pathRewrite: {'^/api': '/'}     // 将/api开头的请求地址, /api 改为 /, 即 /api/xx 改为 /xx
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {}
};
