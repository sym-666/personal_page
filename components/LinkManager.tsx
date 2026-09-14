'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

interface LinkItem {
  id: number
  title: string
  url: string
  category: string
  description: string
}

const CATEGORIES = ['DNS', '域名', '文档', '工具', '其他'] as const

const CATEGORY_CHIP: Record<string, string> = {
  DNS: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/30',
  域名: 'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/30',
  文档: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30',
  工具: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  其他: 'bg-gray-100 text-gray-600 ring-gray-500/20 dark:bg-gray-400/10 dark:text-gray-300 dark:ring-gray-400/30',
}

const DEFAULT_LINKS: LinkItem[] = [
  {
    id: 1,
    title: 'DNS 记录类型参考',
    url: 'https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/',
    category: 'DNS',
    description: 'A、AAAA、CNAME、MX、TXT 等全部记录类型的官方说明，配置解析时对着查最快。',
  },
  {
    id: 2,
    title: '阿里云域名控制台',
    url: 'https://dc.console.aliyun.com/',
    category: '域名',
    description: '域名查询、注册、续费与实名认证，国内备案相关的操作也都在这里。',
  },
  {
    id: 3,
    title: 'MXToolbox',
    url: 'https://mxtoolbox.com/',
    category: '工具',
    description: '在线查 A / MX / NS / TXT 记录，排查解析没生效、邮件收不到这类问题。',
  },
  {
    id: 4,
    title: 'DNS 全球解析检测',
    url: 'https://www.whatsmydns.net/',
    category: '工具',
    description: '查看一条记录在全球各地 DNS 服务器上的生效情况，判断是否还在缓存期内。',
  },
]

const EMPTY_FORM = { title: '', url: '', category: '', description: '' }

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function LinkManager() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('blogLinks')
      setLinks(saved ? JSON.parse(saved) : DEFAULT_LINKS)
    } catch {
      setLinks(DEFAULT_LINKS)
    }
    setMounted(true)
  }, [])

  const persist = (next: LinkItem[]) => {
    setLinks(next)
    try {
      localStorage.setItem('blogLinks', JSON.stringify(next))
    } catch {
      /* 隐私模式下写入会失败，界面照常可用 */
    }
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setIsOpen(true)
  }

  const openEdit = (link: LinkItem) => {
    setEditingId(link.id)
    setForm({
      title: link.title,
      url: link.url,
      category: link.category,
      description: link.description,
    })
    setIsOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.url || !form.category) return

    if (editingId !== null) {
      persist(links.map((l) => (l.id === editingId ? { ...l, ...form } : l)))
    } else {
      persist([{ id: Date.now(), ...form }, ...links])
    }
    setIsOpen(false)
  }

  const handleDelete = (link: LinkItem) => {
    if (confirm(`删除「${link.title}」？`)) {
      persist(links.filter((l) => l.id !== link.id))
    }
  }

  const counts = links.reduce<Record<string, number>>((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1
    return acc
  }, {})

  const q = query.trim().toLowerCase()
  const visible = links.filter((l) => {
    const matchQuery =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.url.toLowerCase().includes(q)
    return matchQuery && (!activeCategory || l.category === activeCategory)
  })

  const filterPill = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition ${
      active
        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
    }`

  const field =
    'focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500'

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
            常用链接
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            平时查资料、配域名会反复打开的站点，集中放在这里。数据存在本机浏览器里。
          </p>
        </div>

        <div className="space-y-6 py-8">
          {/* 工具栏 */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索标题、说明或网址"
                aria-label="搜索链接"
                className={`${field} pl-9`}
              />
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="bg-primary-500 hover:bg-primary-600 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 4.25a.75.75 0 01.75.75v4.25H15a.75.75 0 010 1.5h-4.25V15a.75.75 0 01-1.5 0v-4.25H5a.75.75 0 010-1.5h4.25V5a.75.75 0 01.75-.75z" />
              </svg>
              添加链接
            </button>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('')}
              className={filterPill(activeCategory === '')}
            >
              全部
              <span className="ml-1.5 tabular-nums opacity-60">{links.length}</span>
            </button>
            {CATEGORIES.filter((c) => counts[c]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
                className={filterPill(activeCategory === cat)}
              >
                {cat}
                <span className="ml-1.5 tabular-nums opacity-60">{counts[cat]}</span>
              </button>
            ))}
          </div>

          {/* 列表 */}
          {!mounted ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1, 2, 4].map((i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800/60"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 px-6 py-14 text-center dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                {links.length === 0 ? '还没有收藏任何链接。' : '没有匹配的链接。'}
              </p>
              <button
                type="button"
                onClick={links.length === 0 ? openCreate : () => setActiveCategory('')}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2 text-sm font-medium"
              >
                {links.length === 0 ? '添加第一个 →' : '清除筛选条件'}
              </button>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {visible.map((link) => (
                <li
                  key={link.id}
                  className="group hover:border-primary-400 dark:hover:border-primary-500 relative flex flex-col rounded-xl border border-gray-200 p-5 transition hover:shadow-sm dark:border-gray-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        CATEGORY_CHIP[link.category] ?? CATEGORY_CHIP['其他']
                      }`}
                    >
                      {link.category}
                    </span>
                    <div className="relative z-10 flex gap-1 opacity-100 transition sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => openEdit(link)}
                        aria-label={`编辑 ${link.title}`}
                        className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(link)}
                        aria-label={`删除 ${link.title}`}
                        className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M8.75 1a1 1 0 00-.937.649L7.42 2.75H4.25a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5h-3.17l-.393-1.101A1 1 0 0011.25 1h-2.5zM5.06 5.75l.66 10.56A1.75 1.75 0 007.466 18h5.068a1.75 1.75 0 001.746-1.69l.66-10.56H5.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-3 text-base leading-6 font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-primary-500 dark:group-hover:text-primary-400 transition after:absolute after:inset-0"
                    >
                      {link.title}
                    </a>
                  </h3>

                  <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
                    {hostOf(link.url)}
                  </p>

                  {link.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {link.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 添加 / 编辑弹窗 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-60" onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                  <DialogTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {editingId !== null ? '编辑链接' : '添加链接'}
                  </DialogTitle>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                      <label
                        htmlFor="link-title"
                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        标题
                      </label>
                      <input
                        id="link-title"
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="阿里云域名控制台"
                        className={field}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="link-url"
                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        网址
                      </label>
                      <input
                        id="link-url"
                        type="url"
                        required
                        value={form.url}
                        onChange={(e) => setForm({ ...form, url: e.target.value })}
                        placeholder="https://example.com"
                        className={field}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="link-category"
                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        分类
                      </label>
                      <select
                        id="link-category"
                        required
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className={field}
                      >
                        <option value="">选择分类</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="link-desc"
                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        说明
                        <span className="ml-1 font-normal text-gray-400">（选填）</span>
                      </label>
                      <textarea
                        id="link-desc"
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="什么时候会用到它"
                        className={field}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-sm font-medium text-white transition"
                      >
                        {editingId !== null ? '保存' : '添加'}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
