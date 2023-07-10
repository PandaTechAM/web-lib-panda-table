import React, { SyntheticEvent, memo, useEffect, useState } from 'react'
import { Autocomplete, Button, CircularProgress, TextField, Checkbox } from '@mui/material'
// import Checkbox from "../../../../components/checkbox";
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'
import { containsOnlyNumbers } from '../../../../../utils'
import { ICoulmnError } from '../apiFilter'
interface IMultipleCHeck {
  columnsSizes: string
  item: IComparisonType
  advancedSettings: boolean
  perColumnListForFilters?: string[]
  columnName: string
  filterTypeing: ItemFields
  isLoadingFilters?: boolean
  isDisabled: boolean
  setCheckedItemsLocaly(options: any[]): void
  handleSelectItems: (option: any[], isClosed: boolean) => void
  setCoulmnName: (name: string) => void
  handleChangeValue: (value: string) => void
  handleChangePagePerFilterField?(): void
  getFilteredData?(option: ItemFields, ColumnName?: string): void
}
const MultipleCheck = ({
  columnsSizes,
  item,
  advancedSettings,
  perColumnListForFilters,
  columnName,
  filterTypeing,
  isLoadingFilters,
  isDisabled,
  setCheckedItemsLocaly,
  getFilteredData,
  handleSelectItems,
  setCoulmnName,
  handleChangePagePerFilterField,
  handleChangeValue,
}: IMultipleCHeck) => {
  const [checkedItems, setcheckedItems] = useState<string[]>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [val, setVal] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')

  const onChnage = (newInputValue: any) => {
    if (item.ColumnType !== 'Text' && !containsOnlyNumbers(newInputValue)) {
      setErrMessage('only numbers')
      setVal(newInputValue)

      return
    }
    setErrMessage('')
    handleChangeValue(newInputValue)
    setVal(newInputValue)
  }
  const selectValue = (event: SyntheticEvent<Element, Event>, value: any[]) => {
    setcheckedItems(value)
    if (item.ColumnType !== 'Text') {
      let newValues: number[] = []
      newValues = value.map((item: string) => +item)
      if (!isOpened) {
        handleSelectItems(newValues, false)
      }
      setCheckedItemsLocaly(newValues)
    } else {
      if (!isOpened) {
        handleSelectItems(value, false)
      }
      setCheckedItemsLocaly(value)
    }
  }
  const handleOpenList = () => {
    if (!isDisabled) {
      setCoulmnName(item.ColumnName)
      handleSelectItems([], true)
      setIsOpened(true)
    }
  }
  const handleCloseList = () => {
    setCoulmnName('')
    setVal('')
    setIsOpened(false)

    if (item.ColumnType !== 'Text') {
      let newValues: number[] = []
      newValues = checkedItems.map((item: string) => +item)
      handleSelectItems(newValues, false)
    } else {
      handleSelectItems(checkedItems, false)
    }
  }
  const getLabel = (options: any) => {
    return options
  }
  const isEqual = (option: any, value: any) => {
    if (option === value) {
      return true
    }
    return false
  }
  const isEmpty = () => {
    if (item.ColumnType !== 'Text') {
      if (
        containsOnlyNumbers(val) &&
        item.ColumnName === columnName &&
        !isLoadingFilters &&
        !perColumnListForFilters?.length
        // val.length
      )
        return true
    } else {
      if (
        item.ColumnName === columnName &&
        !isLoadingFilters &&
        !perColumnListForFilters?.length
        // val.length
      )
        return true
    }
    return false
  }
  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      let newValues: string[] = filterTypeing.CheckedItems
      if (item.ColumnType !== 'Text') {
        newValues = filterTypeing.CheckedItems.map((item: number) => item + '')
      }
      setcheckedItems(newValues)
    }
  }, [filterTypeing])

  return (
    <div
      style={{
        width: advancedSettings ? columnsSizes : '100%',
        position: 'relative',
      }}
    >
      <Autocomplete
        multiple
        limitTags={advancedSettings ? 1 : 2}
        id='multiple-limit-tags'
        // sx={{ height: 56 }}
        options={
          item.ColumnName === columnName && perColumnListForFilters && errMessage === '' ? perColumnListForFilters : []
        }
        disabled={isDisabled && item.ColumnName !== columnName}
        disableCloseOnSelect
        onOpen={handleOpenList}
        onClose={handleCloseList}
        onInputChange={(event, newInputValue) => onChnage(newInputValue)}
        onChange={selectValue}
        noOptionsText={'Empty Data'}
        getOptionLabel={getLabel}
        clearOnEscape
        value={checkedItems}
        inputValue={val}
        isOptionEqualToValue={isEqual}
        freeSolo
        size='medium'
        filterOptions={(options, state) => options}
        renderOption={(props, option, { selected }) => {
          return (
            <div key={props.id} style={{ textAlign: 'center' }}>
              <li
                {...props}
                style={{
                  marginLeft: 5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  minHeight: 40,
                  // borderBottom: "1px solid #DCDCDC",
                }}
              >
                {option}
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
              </li>
              {perColumnListForFilters &&
              option === perColumnListForFilters[perColumnListForFilters.length - 1] &&
              filterTypeing.PropertyName !== 'Gender' ? (
                <Button
                  size='large'
                  style={{
                    margin: '10px',
                    width: '90%',
                    backgroundColor: '#FB9C59',
                    color: 'black',
                  }}
                  onClick={handleChangePagePerFilterField}
                >
                  load more
                </Button>
              ) : null}
            </div>
          )
        }}
        renderInput={(params) => (
          <TextField
            onFocus={() => setErrMessage('')}
            onBlur={() => setErrMessage('')}
            error={!!errMessage}
            helperText={errMessage}
            {...params}
            label={item.ColumnName}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {item.ColumnName !== columnName ? null : (perColumnListForFilters &&
                      perColumnListForFilters?.length > 0) ||
                    (perColumnListForFilters?.length === 0 && !isLoadingFilters) ? null : (
                    <CircularProgress color='inherit' size={20} />
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {isEmpty() ? (
        <div
          className='G-align-center G-shadow-around'
          style={{
            borderRadius: 4,
            height: 56,
            padding: 15,
            color: 'silver',
            position: 'absolute',
            backgroundColor: 'white',
            opacity: 1,
            zIndex: 888888,
            width: '100%',
          }}
        >
          empty data
        </div>
      ) : null}
    </div>
  )
}

export default MultipleCheck
