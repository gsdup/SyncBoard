# SyncBoard (Java Edition) ☕

> **基于 Java 21 (Spring Boot 3) 和 React 的高性能分布式实时协作白板系统**

## 📖 项目简介

**SyncBoard** 是一个类似 Miro 的企业级在线协作白板。 本项目后端采用 **Java 21** 重构，利用 **Spring Boot 3** 和 **虚拟线程 (Virtual Threads)** 技术，在保持 Java 强大生态优势的同时，实现了媲美 Go 语言的高并发处理能力。

核心解决了多人协作中的**数据一致性**、**WebSocket 广播风暴**以及**高并发下的消息分发**问题。

## 🛠️ 确定性技术栈 (Tech Stack)

### ☕ 后端 (Enterprise Grade)

- **语言**: **Java 21 LTS** (启用 Virtual Threads 以获得极致吞吐量)
- **框架**: **Spring Boot 3.2+** (企业级标准)
- **通信基座**: **Netty-SocketIO** (基于 Netty 实现的高性能 Socket.IO 服务端)
- **并发模型**: **Virtual Threads (虚拟线程)** (取代传统线程池，单机支撑百万连接)
- **消息中间件**: **Redis Pub/Sub** (用于集群间的消息广播)

### 🔵 前端 (Fast & Interactive)

- **框架**: **React 18** + **Vite 5** (极速开发体验)
- **语言**: **TypeScript** (全链路类型安全)
- **图形引擎**: **Fabric.js** (强大的 Canvas 对象模型库，适合交互式白板)
- **状态管理**: **Zustand** (轻量级、无样板代码的状态管理)
- **协作算法**: **Yjs** (CRDT 算法库，处理分布式数据一致性)

### 🟡 基础设施

- **数据库**: **PostgreSQL** (使用 JSONB 存储复杂的画布快照数据)
- **缓存**: **Redis** (管理 WebSocket 会话状态与热点数据)
- **构建工具**: **Maven 3.8+** (依赖管理)
- **部署**: **Docker Compose** (一键编排)

## 🏗️ 系统架构 (Java 版)

```
graph TD
    Client[React Client + Fabric.js] <-->|Socket.IO| LB[Nginx / Gateway]
    
    LB <--> JavaNode1[Spring Boot Node 1]
    LB <--> JavaNode2[Spring Boot Node 2]
    
    subgraph JVM [Java Virtual Machine]
        JavaNode1 -- Use --> VThread[Virtual Threads]
        JavaNode1 -- Use --> Netty[Netty-SocketIO]
    end
    
    JavaNode1 <-->|Pub/Sub| Redis[(Redis Cluster)]
    JavaNode2 <-->|Pub/Sub| Redis
    
    JavaNode1 -->|JPA/Hibernate| DB[(PostgreSQL)]
```

## 🚀 快速开始 (Quick Start)

### 前置要求

- JDK 21+
- Maven 3.8+
- Docker

### 1. 启动基础设施

```
docker-compose up -d
```

### 2. 启动后端 (Spring Boot)

```
cd server
./mvnw spring-boot:run
# Socket.IO 服务监听端口: 4000
# HTTP API 端口: 8080
```

### 3. 启动前端

```
cd web
pnpm dev
# 访问 http://localhost:3000
```

## 💡 核心技术亮点

1. **虚拟线程 (Virtual Threads)**:
   - 项目彻底摒弃了传统的 `Thread Pool` 模型，针对每一个 WebSocket 连接和数据库 IO 操作都分配了轻量级的虚拟线程，这使得 Java 应用在处理高并发长连接时，内存占用降低了一个数量级。
2. **CRDT (无冲突复制数据类型)**:
   - 前端利用 Yjs 算法解决多端并发绘图时的冲突问题，保证在弱网环境下，所有客户端最终都能看到一致的画面。
3. **分布式广播**:
   - 利用 Redis Pub/Sub 实现 WebSocket 消息的“扇出”分发，解决了单机 WebSocket 连接数受限的问题，支持水平扩展。

## 📄 许可证

MIT License