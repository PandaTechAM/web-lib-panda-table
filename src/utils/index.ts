import { ColumnTypeEnums } from '../Models/table.enum'
import { ItemFields } from '../Models/table.models'

export const containsOnlyNumbers = (value: string) => {
  return /^-?\d*\.?\d+$/.test(value) || value.trim() === ''
}
export const formatPrice = (num: number, symbol: string, isPrice = false, fixedCount = 5) => {
  const moneyFix = isPrice ? 2 : fixedCount
  const p = isPrice ? num.toFixed(moneyFix).split('.') : parseFloat(num.toFixed(moneyFix)).toString().split('.')

  return (
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num + (num !== '-' && i && !(i % 3) ? ',' : '') + acc
      }, '') +
    (p[1] ? '.' + p[1] : '') +
    symbol
  )
}

const filterUiHelperMap = {
  Number: {
    Equal: 1,
    NotEqual: 1,
    GreaterThan: 2,
    LessThan: 2,
    GreaterThanOrEqual: 2,
    LessThanOrEqual: 2,
    Between: 3,
  },
  Currency: {
    Equal: 1,
    NotEqual: 1,
    GreaterThan: 2,
    LessThan: 2,
    GreaterThanOrEqual: 2,
    LessThanOrEqual: 2,
    Between: 3,
  },
  Percentage: {
    Equal: 1,
    NotEqual: 1,
    GreaterThan: 2,
    LessThan: 2,
    GreaterThanOrEqual: 2,
    LessThanOrEqual: 2,
    Between: 3,
  },
  EncryptedData: {
    Equal: 1,
    NotEqual: 1,
  },
  Base36Id: {
    Equal: 1,
    NotEqual: 1,
  },
  Text: {
    Equal: 1,
    NotEqual: 1,
    StartsWith: 2,
    EndsWith: 2,
    Contains: 2,
    NotContains: 2,
  },
  Date: {
    Between: 5,
    Equal: 6,
    NotEqual: 6,
    GreaterThan: 6,
    GreaterThanOrEqual: 6,
    LessThan: 6,
    LessThanOrEqual: 6,
  },
  Tags: {
    In: 4,
  },
  Boolean: {
    Equal: 4,
  },
  NumberCollection: {
    Equal: 7,
    NotEqual: 7,
    GreaterThan: 7,
    LessThan: 7,
    GreaterThanOrEqual: 7,
    LessThanOrEqual: 7,
    Between: 3,
  },
  TextCollection: {
    IsEmpty: 7,
    IsNotEmpty: 7,
    Equal: 7,
    NotEqual: 7,
    StartsWith: 7,
    EndsWith: 7,
    Contains: 7,
    NotContains: 7,
  },
} as const

export const filterUiHelper = (ColumnType: string, ComparisonType: string) => {
  const columnTypeMap = filterUiHelperMap[ColumnType as keyof typeof filterUiHelperMap]
  if (columnTypeMap) {
    return columnTypeMap[ComparisonType as keyof typeof columnTypeMap]
  }
  return 0
}

export const validateRangeColumns = (
  from: any,
  to: any,
  item: any,
  setErrorMessage: (option: any) => void,
  errMessages?: any,
) => {
  let isValid = false
  const columnError = { from: '', to: '' }
  if (from == undefined && to !== undefined && item.ColumnType === 'Date') {
    columnError.from = errMessages.isEmpty
    isValid = true
  }
  if (from !== undefined && to === undefined && item.ColumnType === 'Date') {
    columnError.to = errMessages.isEmpty
    isValid = true
  }
  if (item.ColumnType !== 'Date' && !containsOnlyNumbers(from) && from !== '') {
    columnError.from = errMessages.onlyNumbers
    isValid = true
  }
  if (item.ColumnType !== 'Date' && !containsOnlyNumbers(to) && to !== '') {
    columnError.to = errMessages.onlyNumbers
    isValid = true
  }
  if (from !== null && isNaN(from.valueOf() as number) && item.ColumnType === 'Date') {
    columnError.from = errMessages.invalid
    isValid = true
  }
  if (to !== null && isNaN(to.valueOf() as number) && item.ColumnType === 'Date') {
    columnError.to = errMessages.invalid
    isValid = true
  }
  if (from > to && item.ColumnType === 'Date') {
    columnError.to = errMessages.err
    isValid = true
  }
  if (item.ColumnType !== 'Date' && +from > +to) {
    columnError.to = errMessages.err
    isValid = true
  }
  if (from == '' && to !== '') {
    columnError.from = errMessages.isEmpty
    isValid = true
  }
  if (from !== '' && to === '') {
    columnError.to = errMessages.isEmpty
    isValid = true
  }

  setErrorMessage(columnError)

  return isValid
}

export const getColumnName = (inputString: string) => {
  const underscoreIndex = inputString.indexOf('_')

  if (underscoreIndex !== -1) {
    const columnNam = inputString.slice(0, underscoreIndex)
    const type = inputString.slice(underscoreIndex + 1)
    return { columnNam, type }
  }
}

export const handleEnumColumns = (option: ItemFields[]) => {
  return option.map((el) => {
    if (el.ColumnType === ColumnTypeEnums.Tags || el.ColumnType === ColumnTypeEnums.Boolean) {
      return {
        ...el,
        Values: el.Values.map((item) => (typeof item === 'object' ? item.id : item)),
      }
    } else {
      return el
    }
  })
}

export function hasScroll() {
  const element = document.getElementsByClassName('G-data-scroll')[0]
  if (!element) return
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
}
