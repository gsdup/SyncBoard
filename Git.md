这份文档总结了我们讨论的核心内容，专门为**两人及以上的小型团队**量身定制。你可以直接将其保存为 `GIT_WORKFLOW.md` 或贴在项目的 Readme/Wiki 中作为团队规范。

---

# Git 团队协作开发指南

## 1. 核心协作模式：功能分支工作流 (Feature Branch Workflow)

我们**不采用**“按人分分支”（如 `dev-zhangsan`, `dev-lisi`）的模式，因为这会导致代码隔离过久、合并冲突严重且难以回滚。

我们**采用**“按任务分分支”的模式：
*   **`main` 分支**：主干分支，永远保持稳定，随时可部署。**禁止直接 Push 代码到 main**。
*   **`feature/xxx` 分支**：临时开发分支，从 main 切出，开发完合并回 main，合并后立即删除。

---

## 2. 标准开发流程 (SOP)

### 第一阶段：开始新任务
每次开发新功能或修复 Bug 前，必须确保基于最新的主干代码。

```bash
# 1. 切换回主干
git checkout main

# 2. 拉取远程最新代码 (防止冲突)
git pull

# 3. 创建并切换到新分支
# 命名规范：feature/功能名 或 fix/bug名
git checkout -b feature/user-login
```

### 第二阶段：开发与提交
在本地进行开发。保持原子提交（一个 Commit 只做一件事）。

```bash
git add .
git commit -m "feat: 完成登录框UI布局"
```

### 第三阶段：推送到远程
将本地的临时分支推送到远程服务器（GitHub/Gitee/GitLab）。

*   **第一次推送该分支**（建立关联）：
    ```bash
    git push -u origin HEAD
    ```
    *(注：`HEAD` 会自动识别当前分支名，等同于 `git push -u origin feature/user-login`)*

*   **后续推送**（已有关联）：
    ```bash
    git push
    ```

### 第四阶段：合并代码 (Pull Request)
1.  **发起合并**：在代码托管平台（Web端）发起 **Pull Request (PR)** 或 Merge Request。
2.  **代码审查 (Review)**：队友检查代码逻辑。
3.  **合并 (Merge)**：审查通过后，在 Web 端点击 Merge 按钮合并入 `main`。
4.  **删除远程分支**：合并成功后，通常在 Web 端点击 "Delete branch" 按钮。

### 第五阶段：本地清理 (过河拆桥)
代码合并后，本地的 `feature` 分支已经无用，需要清理以保持环境整洁。

```bash
# 1. 切回主干
git checkout main

# 2. 更新主干 (把刚才合并进来的代码拉下来)
git pull

# 3. 清理远程已删除分支的“影子” (关键步骤)
git fetch -p

# 4. 删除本地功能分支
git branch -d feature/user-login
```

---

## 3. 分支命名规范

请严格遵守以下命名前缀，以便一眼识别分支用途：

*   `feature/xxx`：新功能（例如：`feature/payment-integration`）
*   `fix/xxx`：Bug 修复（例如：`fix/login-error`）
*   `refactor/xxx`：代码重构，不改变功能（例如：`refactor/database-schema`）
*   `hotfix/xxx`：线上紧急修复（最高优先级）

---

## 4. 常用命令速查表 (Cheat Sheet)

| 场景 | 命令 | 说明 |
| :--- | :--- | :--- |
| **开始工作** | `git checkout -b feature/xxx` | 新建并切换分支 |
| **查看状态** | `git status` | 看看改了哪些文件 |
| **保存进度** | `git commit -m "信息"` | 提交代码到本地 |
| **首次推送** | `git push -u origin HEAD` | 推送并建立远程关联 |
| **同步主干** | `git pull origin main` | 在你的分支上把主干的新代码合过来（防冲突） |
| **删除本地** | `git branch -d feature/xxx` | 删除已合并的分支 |
| **强制删除** | `git branch -D feature/xxx` | 删除废弃/未合并的分支 |
| **删除远程** | `git push origin --delete feature/xxx` | 命令删除远程分支（通常在网页操作） |

---

## 5. 避坑指南 (Best Practices)

1.  **每天 Pull 一次**：每天早上开工前，先切到 `main` 运行 `git pull`，再切回你的分支合并 `main`，确保你的代码没有落后太远。
2.  **不要多人共用一个分支**：除非极其特殊的情况，否则坚持“一人一任务一分支”。
3.  **解决冲突**：如果在 PR 阶段发现冲突，不要在网页上乱点。在本地执行 `git pull origin main`，在本地编辑器里修好冲突，提交，再 Push 上去。