# 极客园

## 技术栈
* React
* sass
* antdDesign
* react-router-dom
* craco

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