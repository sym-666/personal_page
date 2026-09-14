'use client'

import { useState, useEffect } from 'react'

interface LinkItem {
  id: number
  title: string
  url: string
  category: string
  description: string
}

const CATEGORIES = ['DNS', '域名', '文档', '工具', '其他']

const DEFAULT_LINKS: LinkItem[] = [
  {
    id: 1,
    title: 'DNS 记录类型详解',
    url: 'https://docs.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/',
    category: 'DNS',
    description:
      'Cloudflare 官方 DNS 记录类型完整参考，包括 A、AAAA、CNAME、MX 等所有常见类型的详细说明。',
  },
  {
    id: 2,
    title: '阿里云域名管理',
    url: 'https://www.aliyun.com',
    category: '域名',
    description: '国内主流域名注册和管理平台，支持域名查询、注册、续费和DNS配置。',
  },
  {
    id: 3,
    title: 'MX Toolbox',
    url: 'https://mxtoolbox.com/',
    category: '工具',
    description: '在线 DNS 查询工具，可以查询 A 记录、MX 记录、NS 记录等，诊断域名配置问题。',
  },
]

export default function LinkManager() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  // Load links from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blogLinks')
    if (saved) {
      try {
        setLinks(JSON.parse(saved))
      } catch {
        setLinks(DEFAULT_LINKS)
      }
    } else {
      setLinks(DEFAULT_LINKS)
    }
  }, [])

  // Save links to localStorage
  const saveLinks = (newLinks: LinkItem[]) => {
    setLinks(newLinks)
    localStorage.setItem('blogLinks', JSON.stringify(newLinks))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url || !category) return

    if (editingId) {
      const updated = links.map((link) =>
        link.id === editingId ? { ...link, title, url, category, description } : link
      )
      saveLinks(updated)
      setEditingId(null)
    } else {
      const newLink: LinkItem = {
        id: Date.now(),
        title,
        url,
        category,
        description,
      }
      saveLinks([newLink, ...links])
    }

    setTitle('')
    setUrl('')
    setCategory('')
    setDescription('')
  }

  const handleEdit = (link: LinkItem) => {
    setTitle(link.title)
    setUrl(link.url)
    setCategory(link.category)
    setDescription(link.description)
    setEditingId(link.id)
  }

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个链接吗？')) {
      saveLinks(links.filter((link) => link.id !== id))
    }
  }

  const handleCancel = () => {
    setTitle('')
    setUrl('')
    setCategory('')
    setDescription('')
    setEditingId(null)
  }

  const filteredLinks = links.filter((link) => {
    const matchSearch =
      !searchQuery ||
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = !filterCategory || link.category === filterCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Add Link Form */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          链接管理器
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          快速添加、组织和查找你常用的网页链接资源
        </p>
      </div>

      <div className="py-8">
        {/* Form Section */}
        <div className="mb-8 rounded-md border border-gray-200 p-6 dark:border-gray-700 dark:bg-gray-900/50">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {editingId ? '编辑链接' : '添加新链接'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  标题 *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：阿里云DNS"
                  className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  分类 *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                >
                  <option value="">选择分类</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                链接地址 *
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                说明描述
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简述这个链接的用途和特点..."
                rows={3}
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 rounded-md px-6 py-2 font-medium text-white"
              >
                {editingId ? '保存修改' : '添加链接'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  取消
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="搜索链接标题或说明..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:border-primary-500 focus:ring-primary-500 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-1 focus:outline-none sm:min-w-[150px] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">全部分类</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Links Grid */}
        <div>
          <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
            保存的链接 ({filteredLinks.length})
          </h2>
          {filteredLinks.length === 0 ? (
            <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-900/30">
              <p className="text-gray-600 dark:text-gray-400">暂无链接，试试添加一个新的吧</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLinks.map((link) => (
                <div
                  key={link.id}
                  className="hover:border-primary-400 dark:hover:border-primary-500 overflow-hidden rounded-md border-2 border-gray-200/60 p-4 transition-colors dark:border-gray-700/60"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="line-clamp-2 text-base font-bold text-gray-900 dark:text-gray-100">
                      {link.title}
                    </h3>
                  </div>

                  <span className="bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 inline-block rounded-md px-2 py-1 text-xs font-medium">
                    {link.category}
                  </span>

                  {link.url && (
                    <div className="my-3 overflow-hidden rounded bg-gray-100 p-2 dark:bg-gray-800">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-xs break-all"
                      >
                        {link.url}
                      </a>
                    </div>
                  )}

                  {link.description && (
                    <p className="mb-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                      {link.description}
                    </p>
                  )}

                  <div className="flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                    <button
                      onClick={() => handleEdit(link)}
                      className="bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-400 dark:hover:bg-primary-900 flex-1 rounded px-2 py-1 text-xs font-medium"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => window.open(link.url, '_blank')}
                      className="flex-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      打开
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="flex-1 rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
