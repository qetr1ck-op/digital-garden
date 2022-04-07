export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  canonicalUrl?: string
  slug: string
  fileName: string
}

export interface PostsByYearMonth {
  [year: string]: { [month: string]: PostFrontMatter[] }
}

export interface YearMonth {
  year: string
  months: string[]
}
