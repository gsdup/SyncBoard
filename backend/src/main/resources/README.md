# 配置文件说明

## 配置文件列表

### 主配置文件
- `application.yaml` - 主配置文件，包含所有环境的默认配置

### 环境特定配置
- `application-dev.yaml` - 开发环境配置（使用 PostgreSQL）
- `application-prod.yaml` - 生产环境配置（使用环境变量）
- `application-local.yaml` - 本地快速开发配置（使用 H2 内存数据库）

### 日志配置
- `logback-spring.xml` - 日志配置文件，支持不同环境的日志级别

## 使用方法

### 开发环境
```bash
# 使用开发环境配置
java -jar backend.jar --spring.profiles.active=dev

# 或设置环境变量
export SPRING_PROFILES_ACTIVE=dev
```

### 生产环境
```bash
# 使用生产环境配置（需要设置环境变量）
export DB_URL=jdbc:postgresql://your-db-host:5432/syncboard
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export SPRING_PROFILES_ACTIVE=prod

java -jar backend.jar
```

### 本地快速开发
```bash
# 使用本地配置（H2 内存数据库，无需安装 PostgreSQL）
java -jar backend.jar --spring.profiles.active=local

# 访问 H2 控制台: http://localhost:8080/h2-console
```

## 环境变量说明

### 数据库配置
- `DB_URL` - 数据库连接 URL（默认: jdbc:postgresql://localhost:5432/syncboard）
- `DB_USERNAME` - 数据库用户名（默认: postgres）
- `DB_PASSWORD` - 数据库密码（默认: postgres）

### 服务器配置
- `SERVER_PORT` - 服务器端口（默认: 8080）

### JPA 配置
- `JPA_DDL_AUTO` - DDL 自动更新策略（validate/update/create/create-drop）
- `JPA_SHOW_SQL` - 是否显示 SQL（true/false）

## 注意事项

1. **数据源配置**: 当前 `BackendApplication.java` 中排除了数据源自动配置，如需启用数据库功能，请移除 `DataSourceAutoConfiguration` 和 `HibernateJpaAutoConfiguration` 的排除。

2. **本地开发**: 如果使用 `application-local.yaml`，需要在 `pom.xml` 中添加 H2 数据库依赖：
   ```xml
   <dependency>
       <groupId>com.h2database</groupId>
       <artifactId>h2</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

3. **日志文件**: 日志文件默认保存在 `logs/` 目录下，请确保该目录有写入权限。

4. **生产环境**: 生产环境配置使用环境变量，请确保在部署时正确设置所有必需的环境变量。

