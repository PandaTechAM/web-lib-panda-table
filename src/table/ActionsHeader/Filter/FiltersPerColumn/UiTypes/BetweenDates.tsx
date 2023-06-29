import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'
import './style.scss'
import { validateRangeColumns } from '../../../../../utils'
interface IPickDate {
  columnsSizes: string
  item: IComparisonType
  advancedSettings: boolean
  filterTypeing: ItemFields
  columnName: string
  isDisabled: boolean
  setCoulmnName: (name: string) => void
  checkIsDisabled: (option: boolean) => void
  handleChangeRange(from: any, to: any): void
}
interface IDateValues {
  from: undefined | Date | string
  to: undefined | Date | string
}
const BetweenDates = ({
  columnsSizes,
  item,
  advancedSettings,
  columnName,
  filterTypeing,
  isDisabled,
  checkIsDisabled,
  setCoulmnName,
  handleChangeRange,
}: IPickDate) => {
  const [val, setVal] = useState<IDateValues>({
    from: undefined,
    to: undefined,
  })
  const [errMessage, setErrMessage] = useState({ from: '', to: '' })
  const [isFocused, setIsFocused] = useState({ from: false, to: false })
  const [isOpenedModal, setIsOpenedModal] = useState({
    from: false,
    to: false,
  })

  const handleChangeInputValue = (value: any, name: string) => {
    let stateValues = { from: val.from, to: val.to }
    if (value === null) {
      value = ''
    } else {
      value = new Date(value.valueOf() as number | string)
    }
    if (stateValues.to === undefined) {
      stateValues.to = ''
    }
    if (stateValues.from === undefined) {
      stateValues.from = ''
    }
    setErrMessage({ from: '', to: '' })
    if (name === 'to') {
      if (!validateRangeColumns(stateValues.from, value, item, setErrMessage)) {
        handleChangeRange(stateValues.from, value)
      } else {
        checkIsDisabled(true)
      }
    } else {
      if (!validateRangeColumns(value, stateValues.to, item, setErrMessage)) {
        handleChangeRange(value, stateValues.to)
      } else {
        checkIsDisabled(true)
      }
    }

    if (value) {
      if (name === 'from') {
        stateValues = { from: value, to: val.to }
      } else {
        stateValues = { from: val.from, to: value }
      }
    } else {
      if (name === 'from') {
        stateValues = { from: undefined, to: val.to }
      } else {
        stateValues = { from: val.from, to: undefined }
      }
    }
    setVal(stateValues)
  }

  const unFocused = (type: string) => {
    let focus = isFocused
    if (type === 'from') {
      setIsFocused((prev) => {
        return { ...prev, from: false }
      })
    } else {
      setIsFocused((prev) => {
        return { ...prev, to: false }
      })
    }
  }

  const handleOpenModal = (type: string) => {
    setCoulmnName(item.ColumnName)
    if (type === 'from') {
      setIsOpenedModal((prev) => {
        return { ...prev, from: true }
      })
    } else {
      setIsOpenedModal((prev) => {
        return { ...prev, to: true }
      })
    }
    unFocused(type)
  }

  const handleClose = (type: string) => {
    if (type === 'from') {
      setIsOpenedModal((prev) => {
        return { ...prev, from: false }
      })
    } else {
      setIsOpenedModal((prev) => {
        return { ...prev, to: false }
      })
    }
    unFocused(type)
  }
  const focused = (type: string) => {
    if (type === 'from') {
      setIsFocused((prev) => {
        return { ...prev, from: true }
      })
    } else {
      setIsFocused((prev) => {
        return { ...prev, to: true }
      })
    }
  }

  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      let newValues: string[] = filterTypeing.CheckedItems
      setVal({ from: newValues[0], to: newValues[1] })
    }
  }, [filterTypeing])
  // useEffect(() => {
  //   if (
  //     isOpenedModal.from === false &&
  //     isOpenedModal.to === false &&
  //     isFocused.from === false &&
  //     isFocused.to === false &&
  //     errMessage.from === "" &&
  //     errMessage.to === ""
  //   ) {
  //     setCoulmnName("");
  //   }
  // }, [isOpenedModal, isFocused]);
  return (
    <div
      className={`G-justify-between ${item.IsBold ? 'IsBold' : ''}`}
      style={{ width: advancedSettings ? columnsSizes : '100%' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{ width: '48%', position: 'relative' }}
          tabIndex={0}
          // onBlur={() => unFocused("from")}
          // onFocus={() => focused("from")}
        >
          <DateTimePicker
            sx={{
              border: errMessage.from.length ? '1px solid red' : 'none',
              borderRadius: 1,
            }}
            ampm={false}
            label='From'
            onOpen={() => handleOpenModal('from')}
            // onClose={() => handleClose("from")}
            format={!advancedSettings ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD'}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
            maxDateTime={dayjs(filterTypeing.Values[1])}
            disabled={isDisabled && item.ColumnName !== columnName}
            value={
              filterTypeing.Values.length
                ? dayjs(filterTypeing.Values[0])
                : val.from !== undefined
                ? dayjs(val.from)
                : undefined
            }
            onChange={(newValue: any) => handleChangeInputValue(newValue, 'from')}
          />
          {errMessage.from.length ? <div style={{ color: 'red', fontSize: 12 }}>{errMessage.from}</div> : null}
        </div>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{ width: '48%' }}
          tabIndex={1}
          // onBlur={() => unFocused("to")}
          // onFocus={() => focused("to")}
        >
          <DateTimePicker
            ampm={false}
            label='To'
            sx={{
              border: errMessage.to.length ? '1px solid red' : 'none',
              borderRadius: 1,
            }}
            onOpen={() => handleOpenModal('to')}
            // onClose={() => handleClose("to")}
            format={!advancedSettings ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD'}
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
            minDateTime={dayjs(filterTypeing.Values[0])}
            disabled={isDisabled && item.ColumnName !== columnName}
            value={
              filterTypeing.Values.length
                ? dayjs(filterTypeing.Values[1])
                : val.to !== undefined
                ? dayjs(val.to)
                : undefined
            }
            onChange={(newValue: any) => handleChangeInputValue(newValue, 'to')}
          />
          {errMessage.to.length ? <div style={{ color: 'red', fontSize: 12 }}>{errMessage.to}</div> : null}
        </div>
      </LocalizationProvider>
    </div>
  )
}
export default BetweenDates
