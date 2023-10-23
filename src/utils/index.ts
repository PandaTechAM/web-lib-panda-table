export const containsOnlyNumbers = (value: string) => {
  return /^\d+$/.test(value) || value.trim() === ''
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
  NumericText: {
    Equal: 1,
  },
  Text: {
    IsEmpty: 0,
    IsNotEmpty: 0,
    Equal: 1,
    NotEqual: 1,
    StartsWith: 2,
    EndsWith: 2,
    Contains: 2,
    NotContaining: 2,
  },
  Boolean: {
    Equal: 4,
    NotEqual: 4,
  },
  Date: {
    Between: 5,
    GreaterThan: 6,
    GreaterThanOrEqual: 6,
    LessThan: 6,
    LessThanOrEqual: 6,
  },
  Tags: {
    Contains: 1,
  },
} as const

export const filterUiHelper = (ColumnType: string, ComparisonType: string) => {
  const columnTypeMap = filterUiHelperMap[ColumnType as keyof typeof filterUiHelperMap]
  if (columnTypeMap) {
    return columnTypeMap[ComparisonType as keyof typeof columnTypeMap]
  }
  return 0
}

export const validateRangeColumns = (from: any, to: any, item: any, setErrorMessage: (option: any) => void) => {
  let isValid = false
  const columnError = { from: '', to: '' }
  if (from == undefined && to !== undefined && item.ColumnType === 'Date') {
    columnError.from = 'is empty'
    isValid = true
  }
  if (from !== undefined && to === undefined && item.ColumnType === 'Date') {
    columnError.to = 'is empty'
    isValid = true
  }

  if (item.ColumnType !== 'Date' && !containsOnlyNumbers(from) && from !== '') {
    columnError.from = 'only numbers'
    isValid = true
  }
  if (item.ColumnType !== 'Date' && !containsOnlyNumbers(to) && to !== '') {
    columnError.to = 'only numbers'
    isValid = true
  }

  if (from !== null && isNaN(from.valueOf() as number) && item.ColumnType === 'Date') {
    columnError.from = 'invalid'
    isValid = true
  }
  if (to !== null && isNaN(to.valueOf() as number) && item.ColumnType === 'Date') {
    columnError.to = 'invalid'
    isValid = true
  }
  if (from > to && item.ColumnType === 'Date') {
    columnError.to = 'errr'
    isValid = true
  }
  if (item.ColumnType !== 'Date' && +from > +to) {
    columnError.to = 'errr'
    isValid = true
  }
  if (from == '' && to !== '') {
    columnError.from = 'is empty'
    isValid = true
  }
  if (from !== '' && to === '') {
    columnError.to = 'is empty'
    isValid = true
  }

  setErrorMessage(columnError)

  return isValid
}

export const getColumnName = (inputString: string) => {
  const underscoreIndex = inputString.indexOf('_')

  if (underscoreIndex !== -1) {
    const slicedString = inputString.slice(0, underscoreIndex)
    return slicedString
  }
}
