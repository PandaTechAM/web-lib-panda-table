import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'
import ActionList from '../../../../../components/datePickerActionList/ActionList'
import { inputSize } from '../../../../../Models/table.enum'
interface IPickDate {
  columnsSizes: string
  item: IComparisonType
  advancedSettings: boolean
  filterTyping: ItemFields
  columnName: string
  isDisabled: boolean
  inputSizes: inputSize
  translations?: Record<string, any>
  setColumnName: (name: string) => void
  handleChangeValue(option: any): void
}
const PickDate = ({
  columnsSizes,
  advancedSettings,
  item,
  columnName,
  filterTyping,
  isDisabled,
  inputSizes,
  translations,
  setColumnName,
  handleChangeValue,
}: IPickDate) => {
  const [errMessage, setErrMessage] = useState('')
  const handlePick = (newValue: any) => {
    if (newValue !== null && isNaN(newValue.valueOf() as number)) {
      setErrMessage(translations?.filterAction.validations.invalid || 'invalid')
    } else {
      setErrMessage('')

      setColumnName(item.ColumnName)
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
    setColumnName(item.ColumnName)
  }
  const handleClose = () => {
    !isDisabled && setColumnName('')
  }
  const unFocused = () => {
    !isDisabled && setColumnName('')
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
            slotProps={{ textField: { size: inputSizes } }}
            minutesStep={1}
            ampm={false}
            label={item.key || item.ColumnName}
            disabled={isDisabled && item.ColumnName !== columnName}
            displayWeekNumber
            onOpen={handleOpenList}
            onClose={handleClose}
            value={filterTyping.Values.length ? dayjs(filterTyping.Values[0]) : null}
            format='YYYY-MM-DD HH:mm:ss'
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
