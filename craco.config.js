const path = require('path');
const { whenProd, getPlugin, pluginByName } = require('@craco/craco');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        // 配置CDN
        configure: (webpackConfig) => {
            let cdn;
            // 生产环境
             whenProd(() => {
                 // key 不参与打包的包名
                 // value cnd文件中 挂载于全局的变量名
                 webpackConfig.externals = {
                     'react': 'React',
                     'react-dom': 'ReactDOM'
                 }
                 // 配置成cdn资源地址
                 // 实际开发中 用公司自己的cdn服务器
                 cdn = {
                    js: [
                     'https://cdn.bootcdn.net/ajax/libs/react/18.3.1/umd/react.production.min.js',
                     'https://cdn.bootcdn.net/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js' 
                    ] 
                 };
                 // 通过HtmlWebpackPlugin 插件 把cdn注入到html文件中
                 const { isFound, match } = getPlugin(
                     webpackConfig,
                     pluginByName('HtmlWebpackPlugin')
                 );
                 if(isFound) {
                     // 给html文件注入cdn
                     match.options.cdn = cdn; 
                 }
             })
             return webpackConfig;
         }
    }
}