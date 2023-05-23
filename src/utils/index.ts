import { IDownloadData } from '../Models/table.models'

export const containsOnlyNumbers = (value: string) => {
  return /^\d+$/.test(value) || value.trim() === ''
}
export const formatPrice = (num: number, symbol: string, isPrice = false, fixedCount = 5) => {
  const moneyFix = isPrice ? 2 : fixedCount
  // const  parsedFlot = parseFloat(num.toString()).toString().split('.')[1]
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

export const downloadFile = ({ data, fileName, fileType }: IDownloadData) => {
  const blob = new Blob([data], { type: fileType })

  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}
