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

export const filterUiHelper = (ColumnType: string, ComparisonType: string) => {
  if (ColumnType === 'Number' || ColumnType === 'NumericText') {
    if (ComparisonType === 'Equal' || ComparisonType === 'NotEqual' || ComparisonType === 'In') {
      return 1
    } else if (
      ComparisonType === 'GreaterThan' ||
      ComparisonType === 'LessThan' ||
      ComparisonType === 'GreaterThanOrEqual' ||
      ComparisonType === 'LessThanOrEqual'
    ) {
      return 2
    } else if (ComparisonType === 'Between') {
      return 3
    } else {
      return 0
    }
  } else if (ColumnType === 'Text') {
    if (ComparisonType === 'IsEmpty' || ComparisonType === 'IsNotEmpty') {
      return 0
    } else if (ComparisonType === 'Equal' || ComparisonType === 'NotEqual') {
      return 1
    } else {
      return 2
    }
  } else if (ColumnType === 'Boolean') {
    if (ComparisonType === 'IsEmpty' || ComparisonType === 'IsNotEmpty') {
      return 0
    } else {
      return 4
    }
  } else if (ColumnType === 'Date') {
    if (ComparisonType === 'IsEmpty' || ComparisonType === 'IsNotEmpty') {
      return 0
    } else if (ComparisonType === 'Equal' || ComparisonType === 'NotEqual' || ComparisonType === 'In') {
      return 1
    } else if (ComparisonType === 'Between') {
      return 5
    } else {
      return 6
    }
  }
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
