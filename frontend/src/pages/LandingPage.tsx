import { type ReactNode, useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  Columns,
  Menu,
  MessageSquarePlus,
  MousePointer2,
  Play,
  Shapes,
  StickyNote,
  Timer,
  Users,
  Wand2,
  X,
} from 'lucide-react'

const useCases = {
  brainstorm: {
    title: '头脑风暴 & 创意构思',
    desc: '用多彩的便利贴捕捉每一个灵感。支持无限画布，让团队的想法自由流淌，不再受限于物理白板边界。',
    items: ['数字便利贴', '思维导图模式', '投票功能', '无限缩放画布'],
  },
  flowchart: {
    title: '流程图 & 系统架构',
    desc: '内置丰富的标准图形库（BPMN、UML、AWS 等）。智能连接线自动吸附，拖拽布局时线条自动重排，绘图顺滑如丝。',
    items: ['智能对齐辅助', '标准图形库', '连接线自动路由', 'SVG 导出'],
  },
  agile: {
    title: '敏捷开发 & 项目管理',
    desc: '将想法转化为行动。Kanban 看板、用户故事地图和冲刺回顾模板，让产品与研发无缝对接。',
    items: ['Kanban 看板', 'Jira 双向同步', '站会倒计时器', '任务分配'],
  },
} as const

const features = [
  {
    title: '多人实时协同',
    description:
      '看见队友的光标在屏幕上飞舞。支持 50+ 人同时在线编辑，毫秒级同步，就像在同一个房间。',
    icon: Users,
    accent: 'bg-blue-50 text-blue-600',
  },
  {
    title: '智能辅助工具',
    description: '画个圆自动变正圆，画表格自动对齐。内置智能排版引擎，让你专注内容而非格式。',
    icon: Wand2,
    accent: 'bg-purple-50 text-purple-600',
  },
  {
    title: '会议主持模式',
    description: '一键召集所有人跟随你的视角。内置计时器、投票器、背景音乐，让远程会议高效有趣。',
    icon: Timer,
    accent: 'bg-orange-50 text-orange-600',
  },
]

const metrics = [
  { label: '活跃团队', value: '100k+' },
  { label: '创建的白板', value: '5M+' },
  { label: '服务可用性', value: '99.9%' },
  { label: '用户体验评分', value: 'No.1' },
]

const footerLinks = {
  product: ['功能特性', '企业版', '安全性', '集成应用'],
  resources: ['模版库', '客户案例', '帮助中心', '开发者 API'],
  company: ['关于我们', '工作机会', '联系我们'],
}

const templates = [
  {
    title: '产品路线图',
    category: '产品规划',
    gradient: 'from-orange-50 to-pink-50',
    description: '覆盖季度目标、里程碑与负责人',
  },
  {
    title: '敏捷冲刺回顾',
    category: '团队协作',
    gradient: 'from-purple-50 to-indigo-50',
    description: '开始 / 停止 / 继续 模式快速复盘',
  },
  {
    title: '客户旅程图',
    category: '用户洞察',
    gradient: 'from-emerald-50 to-teal-50',
    description: '可视化体验节点与情绪变化',
  },
]

type UseCaseKey = keyof typeof useCases

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState<UseCaseKey>('brainstorm')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur border-b border-slate-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <Shapes className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">SyncBoard</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#product" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              产品功能
            </a>
            <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              解决方案
            </a>
            <a href="#templates" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              模版中心
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              价格
            </a>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">登录</button>
            <button className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-indigo-700">
              免费注册
            </button>
          </div>

          <button
            className="rounded-lg border border-slate-200 p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="切换导航菜单"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mx-4 mt-3 space-y-4 rounded-2xl border border-slate-100 bg-white p-6 text-sm font-medium text-slate-700 shadow-lg md:hidden">
            <a href="#product">产品功能</a>
            <a href="#solutions">解决方案</a>
            <a href="#templates">模版中心</a>
            <a href="#pricing">价格</a>
            <div className="flex flex-col gap-3 pt-2">
              <button className="rounded-full border border-slate-200 py-2 text-slate-600">登录</button>
              <button className="rounded-full bg-indigo-600 py-2 font-bold text-white shadow-md">免费注册</button>
            </div>
          </div>
        )}
      </nav>

      <main>
        <Hero />

        <section id="product" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">一个平台，满足多种工作流</h2>
              <p className="text-slate-600">从混乱的创意到结构化的执行，SyncBoard 陪伴全程。</p>
            </div>

            <div className="mb-12 flex flex-wrap justify-center gap-4">
              {Object.keys(useCases).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as UseCaseKey)}
                  className={`rounded-full px-6 py-3 font-semibold transition-all ${
                    activeTab === key
                      ? 'scale-105 bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {useCases[key as UseCaseKey].title.split('&')[0]}
                </button>
              ))}
            </div>

            <div className="grid items-center gap-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl md:grid-cols-2 md:p-16">
              <div className="order-2 md:order-1">
                <h3 className="mb-6 text-3xl font-bold text-slate-900">{useCases[activeTab].title}</h3>
                <p className="mb-8 text-lg leading-relaxed text-slate-600">{useCases[activeTab].desc}</p>
                <ul className="mb-8 space-y-4 text-slate-700">
                  {useCases[activeTab].items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-medium">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-4 w-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="group inline-flex items-center gap-2 font-bold text-indigo-600 transition-all hover:gap-3">
                  了解更多
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="order-1 flex aspect-[4/3] items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-8 md:order-2">
                {activeTab === 'brainstorm' && <BrainstormPreview />}
                {activeTab === 'flowchart' && <FlowchartPreview />}
                {activeTab === 'agile' && <AgilePreview />}
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-slate-900">不仅是画板，更是生产力工具</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map(({ title, description, icon: Icon, accent }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-slate-100 p-6 transition-all hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl"
                >
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{title}</h3>
                  <p className="text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900">模版中心</h2>
              <p className="text-slate-600">精选模版一键套用，10 秒搭建理想画布。</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {templates.map(({ title, category, description, gradient }) => (
                <article
                  key={title}
                  className={`rounded-3xl border border-slate-100 bg-gradient-to-br ${gradient} p-6 shadow-lg transition hover:-translate-y-1`}
                >
                  <div className="text-sm font-semibold uppercase text-slate-500">{category}</div>
                  <h3 className="mb-2 mt-4 text-2xl font-bold text-slate-900">{title}</h3>
                  <p className="text-slate-600">{description}</p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    预览模版
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:px-6 lg:px-8 md:grid-cols-4">
            {metrics.map(({ label, value }) => (
              <div key={label}>
                <div className="mb-2 text-4xl font-bold text-indigo-300">{value}</div>
                <div className="text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20 text-center text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">准备好释放团队创造力了吗？</h2>
            <p className="mx-auto mb-10 text-lg text-indigo-100">
              无需信用卡，永久免费版包含 3 个无限画布。今天就开始高效协作。
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-indigo-600 shadow-lg transition-colors hover:bg-indigo-50">
                免费注册 SyncBoard
              </button>
              <button className="rounded-xl border border-indigo-200 bg-transparent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10">
                联系销售团队
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white pt-32 pb-20">
    <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1.5 text-sm shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">New</span>
        <span className="text-slate-600">AI 辅助绘图功能现已上线 ✨</span>
      </div>
      <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
        让团队的想法 <br />
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">在一个画布上对齐</span>
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-600">
        SyncBoard 是一个无限大的可视化协作工作台。头脑风暴、流程梳理、敏捷回顾，这里都是团队思想碰撞的最佳场所。
      </p>
      <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-700 sm:w-auto">
          创建我的白板
          <ArrowRight className="h-5 w-5" />
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto">
          <Play className="h-5 w-5 fill-slate-700" />
          观看演示视频
        </button>
      </div>

      <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 rounded-lg border border-slate-100 bg-white p-2 shadow-lg">
          <ToolbarIcon active>
            <MousePointer2 className="h-5 w-5" />
          </ToolbarIcon>
          <ToolbarIcon>
            <StickyNote className="h-5 w-5" />
          </ToolbarIcon>
          <ToolbarIcon>
            <Shapes className="h-5 w-5" />
          </ToolbarIcon>
          <ToolbarIcon>
            <Columns className="h-5 w-5" />
          </ToolbarIcon>
          <div className="my-1 h-px w-full bg-slate-100" />
          <ToolbarIcon>
            <MessageSquarePlus className="h-5 w-5" />
          </ToolbarIcon>
        </div>

        <div className="absolute left-24 top-20 h-48 w-48 -rotate-2 rounded-2xl bg-yellow-200 p-4 font-handwriting text-xl text-yellow-900 shadow-md">
          <div>Q3 市场增长策略</div>
          <div className="text-sm opacity-60 font-sans">@Alex</div>
        </div>

        <div className="absolute left-80 top-32">
          <div className="flex h-16 w-40 items-center justify-center rounded-lg border-2 border-slate-900 bg-white font-bold shadow-sm">
            用户获取
          </div>
          <div className="mx-auto h-12 w-0.5 bg-slate-400" />
          <div className="flex h-16 w-40 items-center justify-center rounded-lg border-2 border-slate-900 bg-white font-bold shadow-sm">
            转化率优化
          </div>
        </div>

        <div className="absolute right-32 top-40 w-56 rotate-1 rounded-2xl bg-pink-200 p-4 shadow-md">
          <div className="mb-2 border-b border-pink-300 pb-2 font-bold text-pink-900">待办事项</div>
          <ul className="space-y-2 text-sm text-pink-800">
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded border border-pink-800 bg-pink-800 text-[10px] text-white">
                ✓
              </span>
              更新落地页
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded border border-pink-800" />
              准备 A/B 测试
            </li>
          </ul>
        </div>

        <div className="animate-float absolute left-1/2 top-1/2">
          <MousePointer2 className="h-6 w-6 text-blue-500" />
          <div className="ml-4 mt-1 rounded-full bg-blue-500 px-2 py-1 text-xs text-white shadow-sm">
            Sarah (正在输入…)
          </div>
        </div>

        <div className="animate-float absolute right-1/3 bottom-32" style={{ animationDelay: '1s' }}>
          <MousePointer2 className="h-6 w-6 text-emerald-500" />
          <div className="ml-4 mt-1 rounded-full bg-emerald-500 px-2 py-1 text-xs text-white shadow-sm">Mike</div>
        </div>
      </div>
    </div>
  </section>
)

const ToolbarIcon = ({ children, active = false }: { children: ReactNode; active?: boolean }) => (
  <div
    className={`cursor-pointer rounded p-2 transition ${
      active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'
    }`}
  >
    {children}
  </div>
)

const BrainstormPreview = () => (
  <div className="grid w-full max-w-sm grid-cols-2 gap-4 animate-zoom-in">
    {['Idea A', 'Idea B', 'Idea C', 'Idea D'].map((idea, index) => (
      <div
        key={idea}
        className={`rounded p-4 font-bold shadow-md ${['bg-yellow-200', 'bg-blue-200', 'bg-pink-200', 'bg-green-200'][index]}`}
        style={{ transform: `rotate(${[-2, 1, 3, -1][index]}deg)` }}
      >
        {idea}
      </div>
    ))}
  </div>
)

const FlowchartPreview = () => (
  <div className="flex w-full flex-col items-center gap-8 animate-slide-up">
    <div className="rounded-full border-2 border-slate-900 bg-white px-8 py-3 font-bold">开始</div>
    <div className="h-8 w-0.5 bg-slate-900" />
    <div className="flex h-24 w-24 rotate-45 items-center justify-center border-2 border-slate-900 bg-white">
      <span className="-rotate-45 font-bold">判断</span>
    </div>
    <div className="flex w-full justify-center gap-24">
      {['Yes', 'No'].map((label) => (
        <div key={label} className="relative h-8 w-0.5 bg-slate-900">
          <span className={`absolute -top-2 ${label === 'Yes' ? '-left-8' : '-right-8'} text-xs`}>{label}</span>
        </div>
      ))}
    </div>
  </div>
)

const AgilePreview = () => (
  <div className="flex w-full gap-4 overflow-hidden animate-slide-right">
    {[
      { title: 'To Do', accent: 'border-orange-500', tasks: ['设计系统重构', 'API 文档'] },
      { title: 'Doing', accent: 'border-blue-500', tasks: ['前端集成'] },
    ].map(({ title, accent, tasks }) => (
      <div key={title} className="flex flex-1 flex-col gap-3 rounded-lg bg-slate-200 p-3">
        <div className="text-xs font-bold uppercase text-slate-500">{title}</div>
        {tasks.map((task) => (
          <div key={task} className={`rounded bg-white p-3 text-sm shadow-sm border-l-4 ${accent}`}>
            {task}
          </div>
        ))}
      </div>
    ))}
  </div>
)

const Footer = () => (
  <footer className="bg-white py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Shapes className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-900">SyncBoard</span>
          </div>
          <p className="text-sm text-slate-500">
            为现代敏捷团队打造的下一代可视化协作平台。连接思维，创造未来。
          </p>
        </div>

        <FooterColumn title="产品" items={footerLinks.product} />
        <FooterColumn title="资源" items={footerLinks.resources} />
        <FooterColumn title="公司" items={footerLinks.company} />
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">
        <div>© 2023 SyncBoard Inc. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900">
            隐私政策
          </a>
          <a href="#" className="hover:text-slate-900">
            服务条款
          </a>
        </div>
      </div>
    </div>
  </footer>
)

const FooterColumn = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="mb-4 font-bold text-slate-900">{title}</h4>
    <ul className="space-y-2 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item}>
          <a href="#" className="hover:text-indigo-600">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default LandingPage

