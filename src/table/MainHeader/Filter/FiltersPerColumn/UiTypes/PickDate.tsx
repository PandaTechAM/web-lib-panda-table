import React from 'react'
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
  const handlePick = (newValue: any) => {
    handleChangeValue(
      newValue
        ? isNaN(newValue.valueOf() as number)
          ? 'invalid'
          : new Date(newValue.valueOf() as number | string)
        : '',
    )
  }
  const handleOpenList = () => {
    setCoulmnName(item.ColumnName)
  }

  return (
    <div className={item.IsBold ? 'IsBold' : ''} style={{ width: advancedSettings ? columnsSizes : '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          minutesStep={1}
          ampm={false}
          label={item.ColumnName}
          disabled={isDisabled && item.ColumnName !== columnName}
          displayWeekNumber
          onOpen={handleOpenList}
          value={filterTypeing.Values.length ? dayjs(filterTypeing.Values[0]) : null}
          format='YYYY-MM-DD hh:mm:ss'
          onChange={handlePick}
          views={['year', 'day', 'hours', 'minutes', 'seconds']}
          sx={{ width: '100%' }}
          slots={{
            actionBar: ActionList,
          }}
        />
      </LocalizationProvider>
    </div>
  )
}
export default PickDate
