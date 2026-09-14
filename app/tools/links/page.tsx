import LinkManager from '@/components/LinkManager'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '常用链接' })

export default function LinksPage() {
  return <LinkManager />
}
