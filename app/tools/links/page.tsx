import LinkManager from '@/components/LinkManager'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '链接管理器' })

export default function LinksPage() {
  return <LinkManager />
}
