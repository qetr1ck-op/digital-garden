import siteMetadata from '@/data/siteMetadata'

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDate

// TODO: yse Intl?
export function formatMonth(monthIndex: string, type: 'short' | 'long' = 'long') {
  const monthLabels = {
    '01': { short: 'Jan', long: 'January' },
    '02': { short: 'Feb', long: 'February' },
    '03': { short: 'Mar', long: 'March' },
    '04': { short: 'Apr', long: 'April' },
    '05': { short: 'May', long: 'May' },
    '06': { short: 'Jun', long: 'June' },
    '07': { short: 'Jul', long: 'July' },
    '08': { short: 'Aug', long: 'August' },
    '09': { short: 'Sep', long: 'September' },
    '10': { short: 'Oct', long: 'October' },
    '11': { short: 'Nov', long: 'November' },
    '12': { short: 'Dec', long: 'December' },
  }

  return monthLabels[monthIndex][type]
}
