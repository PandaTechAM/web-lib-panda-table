import { ColumnTypeEnums, ConditionalOperatorsEnums } from '../Models/table.enum'
import { ItemFields } from '../Models/table.models'

export const filtersConvertor = (filterData: ItemFields[]) => {
  const regex = /([(),|\\]|\[\/i)/g

  const returnType = (item: any) => {
    if (typeof item === 'number') {
      return item
    } else if (typeof item === 'string') {
      return item.replace(regex, '\\$1')
    } else {
      return item === null ? item : item.toISOString()
    }
  }

  const generateFilterString = (filter: ItemFields) => {
    let filterString = ''
    switch (filter.ComparisonType) {
      case 'Between':
        {
          const from = filter.PropertyName + ConditionalOperatorsEnums.GreaterThanOrEqual + returnType(filter.Values[0])
          const to = filter.PropertyName + ConditionalOperatorsEnums.LessThanOrEqual + returnType(filter.Values[1])

          filterString = `${from},${to}`
        }
        break
      case 'In':
        {
          let conditionOperators = ConditionalOperatorsEnums[filter.TypeForUi as keyof typeof ConditionalOperatorsEnums]
          if (filter.ColumnType === ColumnTypeEnums.Tags) {
            conditionOperators = ConditionalOperatorsEnums.Equal
          }
          const filterValues = filter.Values.map((item) => {
            return filter.PropertyName + conditionOperators + returnType(item)
          })
          filterString =
            filter.ColumnType === ColumnTypeEnums.Tags ? filterValues.join(',') : `(${filterValues.join('|')})`
        }
        break
      default:
        filterString = `${filter.PropertyName}${
          ConditionalOperatorsEnums[filter.ComparisonType as keyof typeof ConditionalOperatorsEnums]
        }${returnType(filter.Values[0])}`
        break
    }
    return filterString
  }

  const filters = filterData.map(generateFilterString)

  const combinedFilterString = filters.join(',')
  const output = {
    page: 2,
    pageSize: 10,
    orderBy: 'name desc',
    filter: `${combinedFilterString}`,
  }
  return output.filter
}
