/*
[] refactor interfaces
[] ul > li
[x] styling
[-] searching
* */

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { ComponentProps } from 'react'
import Pagination from '@/components/Pagination'
import formatDate, { formatMonth } from '@/lib/utils/formatDate'
import { PostFrontMatter, PostsByYearMonth, YearMonth } from 'types/PostFrontMatter'
interface Props {
  postsByYearMonth: PostsByYearMonth
  yearsMonths: YearMonth[]
  title: string
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function DigestListLayout({ postsByYearMonth, yearsMonths, title }: Props) {
  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <ul>
          {yearsMonths.map(({ year, months }) => {
            return (
              <li key={year}>
                <div className="flex justify-center py-1 font-mono text-3xl text-gray-700 dark:text-white">
                  {year}
                </div>
                {months.map((month) => {
                  return (
                    <div key={`${year}-${month}`}>
                      <div className="flex justify-center text-2xl tracking-wide text-gray-700 dark:text-white">
                        {formatMonth(month)}
                      </div>
                      {postsByYearMonth[year][month].map(({ date, slug, tags, summary, title }) => {
                        return (
                          <article key={`${year}-${month}-${slug}`}>
                            <div className="py-2">
                              <div>
                                <h3 className="pb-1 text-2xl font-bold leading-8 tracking-tight">
                                  <Link
                                    href={`/blog/${slug}`}
                                    className="text-gray-900 dark:text-gray-100"
                                  >
                                    {title}
                                  </Link>
                                </h3>
                                <time
                                  className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400"
                                  dateTime={date}
                                >
                                  {formatDate(date)}
                                </time>
                                <div className="flex flex-wrap">
                                  {tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                  ))}
                                </div>
                              </div>
                              <div className="prose max-w-none py-1 text-gray-500 dark:text-gray-400">
                                {summary}
                              </div>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  )
                })}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
