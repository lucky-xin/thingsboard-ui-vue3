<div align="center">

  <br>
  <br>


  <h1>Thingsboard UI Vue3</h1>
</div>




## 介绍

Thingsboard UI Vue3 是 Thingsboard 的前端适配版本。作为一个免费开源的前端项目，它采用了最新的 Vue 3、Vite、TypeScript 等主流技术开发，基于[vue-vben-admin](https://github.com/vbenjs/vue-vben-admin), 开箱即用，可用于前端替换，也适合学习参考。


🎉 请大家持续关注，watch、star、fork 一键三连

## 升级提示

该版本为最新版本，适配thingsboard 4.1.0 版本。与其他版本不兼容，如果你是新项目，建议使用最新版本。如果你想查看3.x 版本  请查看其他分支

## 功能

📌 规则链代码已全部开放

📌 物模型 完成

📌 web组态 开发中...

📌 大屏组态 完成

📌 TDengine 已适配 

📌 uniapp小程序 开发中...

📌 仪表板 开发中...



## 预览地址
  thingsboard:   http://thingsboard.yantsing.com/
   
   用户名：1069035666@qq.com (我的邮箱)

   密码: 17621315188 (我的微信，欢迎讨论交流)


## Thingsbaord
 
   thingsboard：V4.0.1，持续跟进更新中


## 使用技术

- [Vite](https://vitejs.dev/) 
- [Vue-v3](https://cn.vuejs.org/) 
- [Vue-Router-v4](https://next.router.vuejs.org/) 
- [JeeSite Vue3](https://gitee.com/thinkgem/jeesite-vue/)
- [Vue-Vben-Admin](https://jeesite.com/front/vben-admin/)
- [Ant-Design-Vue](https://antdv.com/components/overview-cn/)
- [AntV x6](https://x6.antv.antgroup.com/)
  
## 启动

### 方式一：环境变量文件配置
- 打开 `.env.development` 文件，修改后台接口：
  ```bash
  # 代理设置，可配置多个，不能换行，格式：[访问接口的根路径, 代理地址, 是否保持Host头]
   VITE_PROXY = [["/api","http://127.0.0.1:8080/api",false]]
  # 访问接口的根路径
   VITE_GLOB_API_URL =
  ```

### 方式二：环境变量配置（推荐）
项目支持通过环境变量进行配置，更灵活且适合容器化部署：

```bash
# 使用默认配置
npm run dev

# 使用环境变量配置模式
npm run dev:env

# 自定义环境变量启动
VITE_PORT=3000 VITE_GLOB_APP_TITLE="My App" npm run dev

# 使用启动脚本（Linux/macOS）
./start-with-env.sh

# 使用启动脚本（Windows）
start-with-env.bat
```

### 运行、打包
```bash
# 安装依赖
yarn install
# 开发环境运行
yarn serve
# 编译打包后运行访问
yarn preview
# 打包
yarn build
```

### 环境变量配置详情
详细的环境变量配置说明请参考：[环境变量配置指南](./ENVIRONMENT_VARIABLES.md)

### Docker 环境变量配置
项目支持 Docker 容器化部署，镜像构建后可通过环境变量灵活配置：
- [Docker 环境变量配置说明](./docker/README.md)
- 支持动态 nginx 配置生成
- 内置健康检查端点
- 支持多平台构建

```bash
# 构建镜像
./build-image.sh

# 运行容器（基本配置）
docker run -d --name tb-ui -p 8080:80 gzv-reg.piston.ink/micros/tb-ui:v4.2.0

# 运行容器（自定义配置）
docker run -d --name tb-ui -p 8080:80 \
  -e VITE_GLOB_APP_TITLE="My App" \
  -e VITE_GLOB_API_URL=http://api.example.com \
  gzv-reg.piston.ink/micros/tb-ui:v4.2.0
```
## 规则引擎
- [AntV x6](https://x6.antv.antgroup.com/)
  

![规则引擎](images/rule_chain_20240305160850.png)

## 预览图片
![登录页](images/login_page.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219165338.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219164906.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219164934.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219165036.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219165220.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219165220.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219165300.png)
![租户仪表盘](images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240219165313.png)

## 🙋‍♂️联系我们

<left class ='img'>
<img title="扫码沟通" src="./images/weixin.jpg" width=40%" />
</left>
