import { getAllFilesFrontMatter, getByMonthFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ComponentProps } from 'react'
import DigestListLayout from '@/layouts/DigestListLayout'

export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const { postsByYearMonth, yearsMonths } = await getByMonthFilesFrontMatter('blog')

  // TODO: filter/page by year/month
  return { props: { postsByYearMonth, yearsMonths } }
}

export default function Blog({
  postsByYearMonth,
  yearsMonths,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <DigestListLayout
        postsByYearMonth={postsByYearMonth}
        yearsMonths={yearsMonths}
        title="Weekly Digest"
      />
    </>
  )
}
