import defects from '../data/bugs_for_test'
const dictionaryNames = ['System',
  'Summary',
  'Состояние',
  'Найдено при',
  'Критичность',
  'Тип Дефекта',
  'Метод обнаружения',
  'reopens_amount']
export const getData = (page = 1, pageSize = 50, filters = {}) => {
  return new Promise((resolve) => {
    const result = defects.reduce((res, item) => {
      for (let prop in filters) {
        if (prop === 'reopens_amount' && filters[prop].length) {
          if (+item.reopens_amount < +filters[prop][0]) {
            return res
          }
          if (+item.reopens_amount > (+filters[prop][1] || 10000)) {
            return res
          }
        } else if (['Дата создания', 'Дата изменения', 'Дата закрытия'].includes(prop) &&
          filters[prop] &&
          filters[prop].length) {
          if (!item[prop] || new Date(item[prop]) < new Date(filters[prop][0]).setHours(0, 0)) {
            return res
          }
          if (!item[prop] || new Date(item[prop]) > new Date(filters[prop][1]).setHours(23, 59)) {
            return res
          }
        } else if (filters[prop] && filters[prop].length && !filters[prop].includes(item[prop])) {
          return res
        }
      }
      res.push(item)
      return res
    }, [])
    const data = {
      value: result.slice((page - 1) * pageSize, page * pageSize),
      size: result.length
    }
    setTimeout(() => resolve(data), 100)
  })
}
export const getDictionaries = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(defects
      .reduce((grouped, def) => {
        for (const prop in def) {
          if (dictionaryNames.includes(prop)) {
            if (!grouped[prop]) {
              grouped[prop] = new Set()
            }
            grouped[prop].add(def[prop])
          }
        }
        return grouped
      }, {})), 100)
  })
}
export const getChartData = (chartFilters) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...defects]
      .filter(item => {
        for (let prop in chartFilters) {
          if (prop === 'Дата создания' &&
          chartFilters[prop] &&
          chartFilters[prop].length) {
            const month = new Date(+chartFilters[prop][1])
            const lastDayOfMonth = Date.parse(new Date(month.getFullYear(), month.getMonth() + 1, 0))
            if (!item[prop] || Date.parse(item[prop]) < +chartFilters[prop][0]) {
              return false
            }
            if (!item[prop] || Date.parse(item[prop]) > lastDayOfMonth) {
              return false
            }
          } else if (chartFilters[prop] && chartFilters[prop].length && !chartFilters[prop].includes(item[prop])) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => a['Дата создания'] > b['Дата создания'] ? 1 : -1)
      .reduce((grouped, def) => {
        let date = new Date(def['Дата создания']).toLocaleString('ru', { month: 'numeric', year: 'numeric' })
        grouped[date] = grouped[date] + 1 || 0
        return grouped
      }, {})), 100)
  })
}
