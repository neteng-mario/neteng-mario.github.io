# NetDoc Hub 项目开发文档

> 网络工程师交互式协议动画与手册资料库

---

## 项目概述

NetDoc Hub 是一个面向网络工程师的知识库项目，包含交互式协议动画演示和图文手册。项目采用纯前端实现，零依赖，适合部署在任何静态托管平台。

**技术栈**：HTML5 + CSS3 + Vanilla JavaScript + Canvas API

---

## 目录结构

```
donghua/
├── index.html              # 首页（GitHub Pages 入口）
├── assets/                 # 共享素材库
│   ├── theme.js            # 主题配置（颜色、设备规格、OSPF状态等）
│   ├── drawer.js           # Canvas 绘图工具类
│   ├── styles/
│   │   └── base.css        # 通用 CSS 样式
│   └── templates/
│       └── project-template.html  # 新项目模板
├── ospf/                   # OSPF 协议相关
│   ├── ospf.html           # OSPF 邻居建立动画演示
│   └── ospf-states.html    # OSPF 7种状态机可视化
├── bgp/                    # BGP 协议相关
│   └── bgp反射与路由传递.html  # BGP 路由反射器动画演示
├── docs/                    # 手册文档
│   ├── ospf-manual.html    # OSPF 协议手册
│   └── bgp-manual.html     # BGP 协议手册
└── 手册/                    # PDF 资料
    └── 网工入门・8 个排障必备命令 图文速查手册 (1) (1).pdf
```

---

## 部署说明

### 部署到 GitHub Pages

1. **创建 GitHub 仓库**
   ```bash
   # 在 GitHub 创建新仓库，例如 netdoc-hub
   # 然后克隆到本地
   git clone https://github.com/yourusername/netdoc-hub.git
   ```

2. **上传项目文件**
   ```bash
   # 将整个 donghua 目录内容上传到仓库根目录
   # 注意：仓库根目录不要有其他冲突文件
   ```

3. **启用 GitHub Pages**
   - 进入仓库 → Settings → Pages
   - Source 选择 `main` branch 和 `/(root)`
   - 等待部署完成（通常 1-2 分钟）

4. **访问**
   - 地址：`https://yourusername.github.io/netdoc-hub/`

### 部署到其他平台

| 平台 | 方式 | 备注 |
|-----|-----|-----|
| Vercel | `vercel --prod` | 支持自动部署 |
| Netlify | 拖拽文件夹 | 有免费额度 |
| 阿里云 OSS | 上传文件 + 静态网站托管 | 国内访问快 |
| 腾讯云 COS | 上传文件 + 静态网站托管 | 国内访问快 |
| Nginx | `server` 块配置 | 需自己购买服务器 |

---

## 共享素材库

### theme.js - 主题配置

集中管理所有项目的视觉风格参数：

```javascript
// 颜色配置
colors: {
    bg: { primary: '#0a0e1a', secondary: '#111827' },
    text: { primary: '#f8fafc', secondary: '#94a3b8' },
    accent: { blue: '#3b82f6', green: '#10b981', ... }
}

// 设备规格
devices: {
    router: { radius: 35, fontSize: 16 },
    pc: { radius: 22, fontSize: 11 },
    ...
}

// OSPF 状态颜色
ospf: {
    states: {
        down: { color: '#64748b', label: 'Down' },
        full: { color: '#22c55e', label: 'Full' },
        ...
    }
}
```

### drawer.js - Canvas 绘图工具类

封装通用绘图方法：

```javascript
const drawer = new NetworkDrawer(canvas);
drawer.drawRouter(device);      // 绘制路由器
drawer.drawPC(device);         // 绘制 PC
drawer.drawASArea(...);        // 绘制 AS 区域
drawer.drawConnection(...);    // 绘制连接线
drawer.drawPacket(...);        // 绘制数据包
```

### base.css - 通用样式

包含按钮、卡片、标签、表格等基础组件样式。

### project-template.html - 新项目模板

新建协议动画时的起点文件，引入所有素材库。

---

## 新建协议动画项目

### 步骤

1. 复制 `assets/templates/project-template.html` 到目标目录
2. 修改 `<title>` 和项目名称
3. 配置 `devices` 数组（设备列表）
4. 配置 `connections` 数组（连接关系）
5. 配置 `steps` 数组（动画步骤）
6. 实现绘图函数

### 设备数据结构

```javascript
{
    id: 0,
    name: 'R1',           // 设备名称
    ip: '10.0.0.1',       // IP 地址
    as: 100,              // 所属 AS（可选）
    x: 0, y: 0,           // 坐标（代码中计算）
    color: '#3b82f6',      // 颜色（可引用 theme）
    type: 'router',       // 类型：router / pc
    role: 'DR',           // 角色（可选）
    routes: [],           // 路由表（可选）
    pulse: 0              // 动画脉冲（内部使用）
}
```

### 步骤数据结构

```javascript
{
    title: '步骤标题',
    description: '详细描述',
    danmaku: '弹幕内容',
    action: () => { /* 执行的操作 */ }
}
```

---

## 首页导航

首页 (`index.html`) 包含两个分类：

### 协议演示 (protocol)
- OSPF 协议动画
- BGP 协议动画（当前隐藏）

### 工具手册 (tool)
- 排障命令速查手册
- BGP 协议手册
- OSPF 协议手册

### 修改首页

添加新项目时，编辑 `index.html` 的 `projects-grid` 部分：

```html
<a href="你的项目路径/你的文件.html" class="project-card">
    <div class="project-icon">图标</div>
    <h3>项目标题</h3>
    <p>项目描述</p>
    <div class="project-tags">
        <span class="tag protocol">标签1</span>
    </div>
</a>
```

---

## 配色方案

### 主色调

| 用途 | 颜色 | 变量 |
|-----|-----|-----|
| 背景 | `#0a0e1a` | `--bg-primary` |
| 卡片 | `#111827` | `--bg-secondary` |
| 强调蓝 | `#3b82f6` | `--accent-blue` |
| 强调绿 | `#10b981` | `--accent-green` |
| 强调紫 | `#8b5cf6` | `--accent-purple` |
| 强调橙 | `#f59e0b` | `--accent-orange` |

### 设备角色

| 角色 | 颜色 |
|-----|-----|
| DR | `#3b82f6` |
| BDR | `#8b5cf6` |
| DROther | `#10b981` |
| RR | `#1e40af` |
| eBGP | `#9ca3af` |
| Host/PC | `#ef4444` |

### OSPF 状态

| 状态 | 颜色 |
|-----|-----|
| Down | `#64748b` |
| Init | `#3b82f6` |
| 2-Way | `#8b5cf6` |
| ExStart | `#a855f7` |
| Exchange | `#c084fc` |
| Loading | `#10b981` |
| Full | `#22c55e` |

---

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

不支持 IE。

---

## 字体

项目使用 Google Fonts：

- **Inter** - 界面文字
- **JetBrains Mono** - 代码/IP地址

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

如需离线使用，需下载字体文件并本地托管。

---

## 常见问题

### Q: 如何隐藏某个项目？
编辑 `index.html`，将对应的 `<a>` 标签包裹在 `<!-- -->` 注释中，或直接删除。

### Q: 如何添加新的协议手册？
在 `docs/` 目录创建新的 HTML 文件，然后在 `index.html` 的工具手册区域添加链接。

### Q: 如何修改主题颜色？
编辑 `assets/theme.js` 中的 `colors` 对象，所有引用的项目会自动更新。

### Q: 部署后页面空白？
检查浏览器控制台（F12），可能是：
1. 资源路径错误（相对路径问题）
2. 文件未正确上传
3. 缓存问题（尝试 Ctrl+F5 强制刷新）

---

## 更新日志

### 2026-03
- 创建项目
- 实现 OSPF 邻居建立动画
- 实现 OSPF 状态机可视化
- 实现 BGP 路由反射器动画
- 创建共享素材库（theme.js, drawer.js, base.css）
- 部署到 GitHub Pages

---

## 联系方式

如有问题或建议，请在 GitHub 仓库提交 Issue。
