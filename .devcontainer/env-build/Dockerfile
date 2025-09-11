FROM bellsoft/liberica-openjdk-debian:17

# 安装必要的软件包
RUN apt-get update && apt-get install -y \
    bash \
    git \
    openssh-client \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 安装 Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

# 设置 Java 环境变量
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"

# (可选) 设置时区，例如设置为亚洲/上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    npm config set registry https://registry.npmmirror.com && \
    corepack enable && \
    corepack prepare yarn@stable --activate && \
    useradd -m -s /bin/bash developer

# 设置工作目录
WORKDIR /workspace/tb-ui-vue3

# 将 workspace 的所有权更改给 developer 用户
RUN chown -R developer:developer /workspace

# 切换到 developer 用户
USER developer
