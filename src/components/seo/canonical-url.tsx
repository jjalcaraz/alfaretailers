import Head from 'next/head'
import { getCanonicalUrl } from '@/lib/seo-utils'

interface CanonicalUrlProps {
  path?: string
}

export function CanonicalUrl({ path = '' }: CanonicalUrlProps) {
  const canonicalUrl = getCanonicalUrl(path)

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}