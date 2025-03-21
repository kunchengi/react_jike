# 极客园

## 参考文档
* [极客园](https://github.com/LynasTing/react-basic/blob/main/src/day_06)

## 技术栈
* React
* sass
* antdDesign
* react-router-dom
* craco
* axios
* redux
* echarts
* react-quill

## 项目结构
```
.
|-- src
|   |-- apis // 接口
|   |-- assets // 静态资源
|   |-- components // 通用组件
|   |-- pages // 路由组件
|   |-- router // 路由配置
|   |-- store // 全局状态管理
|   |-- utils // 工具函数

```

## scss
* 预编译css语言

### 安装
```bash
    npm i sass -D
```

## antdDesign

### 安装
```bash
    npm i antd --save
```

## 配置基础路由Router

### 安装
```bash
    npm i react-router-dom
```

## 路径解析配置
* 使用craco配置路径
  * 安装依赖
    ```bash
      npm i -D @craco/craco
    ```
  * 根目录创建craco.config.js文件
    ```javascript
      const path = require('path');
      module.exports = {
        webpack: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        }
      }
    ```
  * package.json文件中配置启动和打包命令
    ```json
      "scripts": {
        "start": "craco start",
        "build": "craco build",
      }
    ```
  * 使用别名路径导入文件
    ```jsx
      import {Button} from '@/components/Button';
    ```

## 联想路径配置
  * 根目录新增jsconfig.json文件
  * 添加路径提升配置
    ```json
      {
        "compilerOptions": {
          "baseUrl": "./",
          "paths": {
            "@/*": [
              "src/*"
            ]
          }
        }
      }
    ```

## 封装axios请求
* 安装依赖
  ```bash
    npm i axios
  ```

* 根域名和超时时间
  ```javascript
    const request = axios.create({
        baseURL: 'http://geek.itheima.net/v1_0',// 根域名
        timeout: 5000,// 超时时间
    });
  ```

* 拦截器
  ```javascript
    request.interceptors.request.use(config => {
            return config
        },
        err => Promise.reject(err)
    )
    request.interceptors.response.use(response => {
            return response.data
        },
        err => {
            return Promise.reject(err)
        }
    )
  ```

## redux
* 安装依赖
  ```bash
    npm i redux react-redux @reduxjs/toolkit
  ```

## Normalize.css
* 用来解决浏览器的默认样式差异，重置样式
* 安装依赖
  ```bash
    npm i normalize.css
  ```
* 在入口文件引入
  ```javascript
    import 'normalize.css'
  ```

## echarts
* 官方文档：https://echarts.apache.org/handbook/zh/get-started/
* 安装依赖
  ```bash
    npm i echarts
  ```

## react-quill
* 富文本编辑器
* 官方文档：https://www.npmjs.com/package/react-quill
* 安装依赖
  ```bash
    npm i react-quill@2.0.0-beta.2 --legacy-peer-deps
  ```
## 项目打包和本地预览
* 打包，生成build文件夹
  ```bash
    npm run build
  ```
* 本地预览（模拟服务器运行项目）
* 全局安装依赖
  ```bash
    npm i serve -g
  ```
* 运行
  ```bash
    serve -s build
  ```
* 浏览器中访问： http://localhost:3000

## 打包优化-配置路由懒加载
* 什么是路由懒加载？
  * 路由懒加载是指路由的JS资源只有在被访问时才会动态加载，目的是为了优化项目首次打开的时间
* 如何配置路由懒加载？
  * 配置路由时，使用React.lazy()函数来包裹路由组件
  * 使用Suspense组件包裹懒加载的路由组件，Suspense组件的fallback属性用来指定加载时的占位组件
  ```javascript
    import React, { Suspense } from 'react';
  ```

## 打包优化-包体积可视化分析
* 通过可视化的方式，直观的体检项目中各种包打包之后的体积大小，方便做优化

* 安装包体积分析依赖
  ```bash
    npm i source-map-explorer
  ```
* 在package.json文件中配置打包命令
  ```json
    "scripts": {
      "analyze": "source-map-explorer 'build/static/js/*.js'"
    }
  ```
* 运行
  ```bash
    npm run analyze
  ```
## 打包优化-CDN配置
* 官方解释：CDN是指内容分发网络，是一种通过将网站的静态资源（如图片、CSS、JavaScript等）存储在多个地理位置的服务器上，然后通过负载均衡技术将用户请求分发到最近的服务器上，从而提高网站的访问速度和稳定性的技术。
* 简单解释：将静态资源存储在多个地理位置的服务器上，当请求资源时，会请求离用户最近的服务器，从而提高网站的访问速度和稳定性。
* 哪些资源可以使用CDN？
  * 静态资源：图片、CSS等
  * 非业务相关的JS文件，不需要经常做变动，CDN不用频繁更新缓存
  * 第三方库：jQuery、Bootstrap、React等
* 如何配置CDN？
  * 在craco.config.js文件中配置打包命令
    ```javascript
      const path = require('path');
      const { whenProd, getPlugin, pluginByName } = require('@craco/craco');

      module.exports = {
          webpack: {
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
    ```
  * 在index.html文件中引入CDN
    ```html
      <% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL => { %>
        <script src="<%= cdnURL %>"></script>
      <% }) %>
    ```