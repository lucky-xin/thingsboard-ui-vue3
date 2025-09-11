# ThingsBoard UI Vue3 环境变量配置指南

## 概述

本项目支持通过环境变量进行配置，这样可以更灵活地管理不同环境的配置，特别适合容器化部署和 CI/CD 流程。

## 配置方式

### 1. 环境变量文件

项目支持以下环境变量文件：

- `.env` - 通用配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置
- `.env.local` - 本地配置（不提交到版本控制）
- `env.env` - 环境变量配置模式示例

### 2. 环境变量配置

#### 基础配置

| 变量名                        | 默认值                  | 说明      |
|----------------------------|----------------------|---------|
| `VITE_PORT`                | `3100`               | 开发服务器端口 |
| `VITE_PUBLIC_PATH`         | `/`                  | 应用根路径   |
| `VITE_GLOB_APP_TITLE`      | `ThingsBoard UI Vue` | 应用标题    |
| `VITE_GLOB_APP_SHORT_NAME` | `thingsboard_ui_vue` | 应用英文名   |

#### 路由配置

| 变量名                      | 默认值    | 说明                               |
|--------------------------|--------|----------------------------------|
| `VITE_ROUTE_WEB_HISTORY` | `true` | 路由模式（true: history, false: hash） |

#### API 配置

| 变量名                           | 默认值                                            | 说明           |
|-------------------------------|------------------------------------------------|--------------|
| `VITE_PROXY`                  | `[["/api","http://127.0.0.1:8888/api",false]]` | 代理配置         |
| `VITE_GLOB_API_URL`           | 空                                              | API 根路径      |
| `VITE_GLOB_API_URL_PREFIX`    | 空                                              | API 前缀       |
| `VITE_GLOB_API_URL_WEBSOCKET` | `/api/ws`                                      | WebSocket 路径 |

#### 构建配置

| 变量名                                      | 默认值     | 说明                       |
|------------------------------------------|---------|--------------------------|
| `VITE_DROP_CONSOLE`                      | `false` | 是否删除 console 日志          |
| `VITE_OUTPUT_DIR`                        | `dist`  | 输出目录                     |
| `VITE_BUILD_COMPRESS`                    | `none`  | 压缩方式（gzip, brotli, none） |
| `VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE` | `false` | 是否删除源文件                  |
| `VITE_USE_PWA`                           | `false` | 是否启用 PWA                 |
| `VITE_LEGACY`                            | `true`  | 是否兼容低版本浏览器               |

## 使用方法

### 1. 命令行启动

```bash
# 使用默认配置
npm run dev

# 使用环境变量配置模式
npm run dev:env

# 自定义环境变量启动
VITE_PORT=3000 VITE_GLOB_APP_TITLE="My App" npm run dev
```

### 2. 启动脚本

#### Linux/macOS

```bash
# 直接运行
./start-with-env.sh

# 自定义配置
VITE_PORT=3000 VITE_GLOB_APP_TITLE="My App" ./start-with-env.sh
```

#### Windows

```cmd
# 直接运行
start-with-env.bat

# 自定义配置
set VITE_PORT=3000 && set VITE_GLOB_APP_TITLE=My App && start-with-env.bat
```

### 3. Docker 部署

#### 使用环境变量文件

```bash
# 使用 docker.env 文件
docker run --env-file docker.env your-image

# 使用 docker-compose
docker-compose -f docker-compose.yml up
```

#### 直接设置环境变量

```bash
docker run -e VITE_PORT=3000 -e VITE_GLOB_APP_TITLE="My App" your-image
```

### 4. CI/CD 配置

#### GitHub Actions 示例

```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        env:
          VITE_PORT: 3000
          VITE_GLOB_APP_TITLE: "Production App"
          VITE_PROXY: '[["/api","https://api.production.com/api",true]]'
        run: |
          npm run build
          # 部署命令
```

#### GitLab CI 示例

```yaml
deploy:
  stage: deploy
  script:
    - export VITE_PORT=3000
    - export VITE_GLOB_APP_TITLE="Production App"
    - export VITE_PROXY='[["/api","https://api.production.com/api",true]]'
    - npm run build
    # 部署命令
```

## 配置优先级

环境变量的优先级从高到低：

1. 命令行环境变量
2. `.env.local` 文件
3. `.env.{mode}` 文件（如 `.env.development`）
4. `.env` 文件
5. 默认值

## 最佳实践

### 1. 敏感信息

- 不要将敏感信息（如 API 密钥）写入环境变量文件
- 使用 `.env.local` 文件存储本地敏感配置
- 在 CI/CD 中使用安全的密钥管理

### 2. 环境分离

- 开发环境：使用 `.env.development`
- 生产环境：使用 `.env.production`
- 本地开发：使用 `.env.local`

### 3. 版本控制

- 提交 `.env.example` 作为配置模板
- 不要提交 `.env.local` 和包含敏感信息的文件
- 在 `.gitignore` 中添加：

```gitignore
.env.local
.env.*.local
```

### 4. 容器化部署

- 使用环境变量文件（如 `docker.env`）
- 在 Docker Compose 中使用环境变量
- 考虑使用 Docker secrets 管理敏感信息

## 故障排除

### 1. 环境变量未生效

- 检查变量名是否正确（必须以 `VITE_` 开头）
- 确认环境变量文件路径正确
- 重启开发服务器

### 2. 代理配置问题

- 检查 `VITE_PROXY` 格式是否正确
- 确认代理目标地址可访问
- 查看浏览器控制台网络请求

### 3. 构建失败

- 检查环境变量值格式
- 确认所有必需的环境变量都已设置
- 查看构建日志错误信息

## 示例配置

### 开发环境

```bash
VITE_PORT=3000
VITE_GLOB_APP_TITLE="ThingsBoard UI Vue - Dev"
VITE_PROXY=[["/api","http://localhost:8080/api",false]]
VITE_DROP_CONSOLE=false
```

### 生产环境

```bash
VITE_PORT=80
VITE_GLOB_APP_TITLE="ThingsBoard UI Vue"
VITE_GLOB_API_URL=https://api.production.com
VITE_DROP_CONSOLE=true
VITE_BUILD_COMPRESS=gzip
```

### 测试环境

```bash
VITE_PORT=3001
VITE_GLOB_APP_TITLE="ThingsBoard UI Vue - Test"
VITE_PROXY=[["/api","http://test-api.company.com/api",true]]
VITE_DROP_CONSOLE=false
```

## 总结

通过环境变量配置，你可以：

- 灵活管理不同环境的配置
- 简化容器化部署流程
- 提高 CI/CD 的自动化程度
- 增强配置的安全性和可维护性

建议根据项目需求选择合适的配置方式，并遵循最佳实践来管理环境变量。
