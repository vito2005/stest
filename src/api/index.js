import defects from '../data/bugs_for_test'
export const getData = (page = 1, pageSize = 50) => {
  return new Promise((resolve) => {
    const data = {
      value: defects.slice((page - 1) * pageSize, page * pageSize),
      size: defects.length
    }
    setTimeout(() => resolve(data), 100)
  })
}
export const getChartData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(defects
      .sort((a, b) => a['Дата создания'] > b['Дата создания'] ? 1 : -1)
      .reduce((grouped, def) => {
        let date = new Date(def['Дата создания']).toLocaleString('ru', { month: 'numeric', year: 'numeric' })
        grouped[date] = grouped[date] + 1 || 0
        return grouped
      }, {})), 100)
  })
}
