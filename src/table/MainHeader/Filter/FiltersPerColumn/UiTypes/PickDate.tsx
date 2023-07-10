import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'
import ActionList from '../../../../../components/datePickerActionList/ActionList'
interface IPickDate {
  columnsSizes: string
  item: IComparisonType
  advancedSettings: boolean
  filterTypeing: ItemFields
  columnName: string
  isDisabled: boolean
  setCoulmnName: (name: string) => void
  handleChangeValue(option: any): void
}
const PickDate = ({
  columnsSizes,
  advancedSettings,
  item,
  columnName,
  filterTypeing,
  isDisabled,
  setCoulmnName,
  handleChangeValue,
}: IPickDate) => {
  const [errMessage, setErrMessage] = useState('')
  const handlePick = (newValue: any) => {
    if (newValue !== null && isNaN(newValue.valueOf() as number)) {
      setErrMessage('invalid')
    } else {
      setErrMessage('')

      setCoulmnName(item.ColumnName)
      handleChangeValue(
        newValue
          ? isNaN(newValue.valueOf() as number)
            ? 'invalid'
            : new Date(newValue.valueOf() as number | string)
          : '',
      )
    }
  }
  const handleOpenList = () => {
    setCoulmnName(item.ColumnName)
  }
  const handleClose = () => {
    !isDisabled && setCoulmnName('')
  }
  const unFocused = () => {
    !isDisabled && setCoulmnName('')
  }
  return (
    <div className={item.IsBold ? 'IsBold' : ''} style={{ width: advancedSettings ? columnsSizes : '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{ width: '100%', position: 'relative' }}
          tabIndex={0}
          onBlur={unFocused}
          className={errMessage ? 'date-picker' : ''}
        >
          <DateTimePicker
            minutesStep={1}
            ampm={false}
            label={item.ColumnName}
            disabled={isDisabled && item.ColumnName !== columnName}
            displayWeekNumber
            onOpen={handleOpenList}
            onClose={handleClose}
            value={filterTypeing.Values.length ? dayjs(filterTypeing.Values[0]) : null}
            format='YYYY-MM-DD hh:mm:ss'
            onChange={handlePick}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
            sx={{ width: '100%' }}
            slots={{
              actionBar: ActionList,
            }}
          />
          {errMessage.length ? <div style={{ color: 'red', fontSize: 12 }}>{errMessage}</div> : null}
        </div>
      </LocalizationProvider>
    </div>
  )
}
export default PickDate
