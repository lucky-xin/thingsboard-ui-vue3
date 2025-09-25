#!/bin/bash

# 默认参数
SONAR_HOST_URL=""
SONAR_LOGIN=""

# 解析命令行参数
while [[ $# -gt 0 ]]; do
  case $1 in
    --host-url)
      SONAR_HOST_URL="$2"
      shift 2
      ;;
    --login)
      SONAR_LOGIN="$2"
      shift 2
      ;;
    --help)
      echo "用法: $0 [选项]"
      echo "选项:"
      echo "  --host-url URL    SonarQube 服务器地址 (默认: http://8.145.35.103:9000)"
      echo "  --login TOKEN     SonarQube 登录令牌"
      echo "  --help            显示此帮助信息"
      exit 0
      ;;
    *)
      echo "未知参数: $1"
      echo "使用 --help 查看帮助信息"
      exit 1
      ;;
  esac
done

echo "=== SonarQube 扫描开始 ==="
echo "服务器地址: $SONAR_HOST_URL"
echo "登录令牌: ${SONAR_LOGIN:0:10}..."

# 运行SonarQube扫描
docker run --rm -u root:root \
  -v ./:/usr/src \
  -v ./.sonar:/root/.sonar \
  -w /usr/src \
  --name sonar-scanner-cli \
  xin8/devops/sonar-scanner-cli:node \
  sonar-scanner \
  -Dsonar.host.url="$SONAR_HOST_URL" \
  -Dsonar.login="$SONAR_LOGIN" \
  -Dsonar.projectKey=thingsboard-ui-vue3 \
  -Dsonar.projectName=thingsboard-ui-vue3 \
  -Dsonar.projectVersion=1.0.0 \
  -Dsonar.sourceEncoding=UTF-8 \
  -Dsonar.projectBaseDir=. \
  -Dsonar.sources=src \
  -Dsonar.tests=test \
  -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/*.min.js,**/coverage/**,**/.nyc_output/** \
  -Dsonar.typescript.file.suffixes=.ts,.tsx \
  -Dsonar.javascript.file.suffixes=.js,.jsx,.vue \
  -Dsonar.javascript.lcov.reportPaths=reports/lcov.info \
  -Dsonar.testExecutionReportPaths=reports/test-results.xml \
  -Dsonar.verbose=true
