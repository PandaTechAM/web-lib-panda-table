import { Autocomplete, Button, Checkbox, CircularProgress, Skeleton, TextField } from '@mui/material'
import React, { SyntheticEvent, memo, useEffect, useRef, useState } from 'react'
// import Checkbox from "../../../../components/checkbox";
import { inputSize } from '../../../../../Models/table.enum'
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'
import { containsOnlyNumbers } from '../../../../../utils'

interface IMultipleCHeck {
  columnsSizes: string
  advancedSettings: boolean
  item: IComparisonType
  perColumnListForFilters?: any[]
  columnName: string
  filterTypeing: ItemFields
  isLoadingFilters?: boolean
  isDisabled: boolean
  perColumnTotalCount?: number
  inputSizes: inputSize
  translations?: Record<string, any>
  filterColumns?: IComparisonType[]
  setCheckedItemsLocaly(options: any[], closeCallBack?: () => void): void
  handleSelectItems: (option: any[], isClosed: boolean, fieldName?: string) => void
  setColumnName: (name: string) => void
  handleChangeValue: (value: string) => void
  handleChangePagePerFilterField?(): void
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
  perColumnTotalCount,
  inputSizes,
  translations,
  filterColumns,
  setCheckedItemsLocaly,
  handleSelectItems,
  setColumnName,
  handleChangePagePerFilterField,
  handleChangeValue,
}: IMultipleCHeck) => {
  const [checkedItems, setcheckedItems] = useState<string[]>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [val, setVal] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')
  const checkList = () => {
    return item.ColumnName === columnName && perColumnListForFilters && errMessage === ''
      ? perColumnListForFilters.includes(null)
        ? removeNullItemsFromArray(perColumnListForFilters)
        : perColumnListForFilters
      : []
  }
  const backSpaceRef = useRef(false)
  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log(event?.key, val);
    // if (event?.key === "Backspace" && !val) {
    //   backSpaceRef.current = true;
    // } else if (event?.key !== "Backspace") {
    //   console.log(123456);
    //   backSpaceRef.current = false;
    // }
  }
  const onChange = (event: React.SyntheticEvent<Element, Event>, newInputValue?: any) => {
    if (['Number', 'Currency', 'Percentage'].includes(item.ColumnType) && !containsOnlyNumbers(newInputValue)) {
      setErrMessage(translations?.filterAction.onlyNumbers || 'only numbers')
      setVal(newInputValue)

      return
    }
    if (item.ColumnType === 'EncryptedData' && !newInputValue) {
      setErrMessage('')
      setVal(newInputValue)
      return
    }
    setErrMessage('')
    handleChangeValue(newInputValue)
    setVal(newInputValue)
  }
  const selectValue = (event: SyntheticEvent<Element, Event>, value: any[]) => {
    setcheckedItems(value)
    if (['Number', 'Currency', 'Percentage'].includes(item.ColumnType)) {
      let newValues: (number | null)[] = value.map((item: string) => {
        if (item === translations?.filterAction.blank || item === null) {
          return null
        }
        return +item
      })
      if (!isOpened) {
        handleSelectItems(newValues, false)
      }
      setCheckedItemsLocaly(newValues)
    } else {
      let newValues = value.map((item: string) => {
        if (item === translations?.filterAction.blank) {
          return null
        }
        return item
      })

      if (!isOpened) {
        handleSelectItems(newValues, false)
      }
      setCheckedItemsLocaly(newValues)
    }
  }
  const handleOpenList = () => {
    if (!isDisabled) {
      item.ColumnType !== 'EncryptedData' && handleSelectItems([], true, item.ColumnName)
      setColumnName(item.ColumnName)
      setIsOpened(true)
    }
  }
  const handleCloseList = () => {
    setColumnName('')
    setVal('')
    setIsOpened(false)
    if (['Number', 'Currency', 'Percentage'].includes(item.ColumnType)) {
      const newValues: number[] = checkedItems.map((item: string) =>
        item !== null || item !== translations?.filterAction.blank ? +item : item,
      )
      handleSelectItems(newValues, false, item.ColumnName)
    } else {
      handleSelectItems(checkedItems, false, item.ColumnName)
    }
  }
  const getLabel = (options: any) => {
    if (typeof options !== 'string') {
      return options + ''
    }
    return options
  }
  const isEqual = (option: any, value: any) => {
    let numericValue = value
    if (['Number', 'Currency', 'Percentage'].includes(item.ColumnType) && typeof value === 'string') {
      numericValue = +value
    }

    if (option === numericValue) {
      return true
    }
    return false
  }
  const isEmpty = () => {
    if (item.ColumnName === columnName && !isLoadingFilters && !perColumnListForFilters?.length) {
      if (item.ColumnType !== 'Text') {
        if (item.ColumnType === 'EncryptedData') {
          if (val.length) return true
        } else if (item.ColumnType === 'Base36Id') {
          return true
        } else {
          if (containsOnlyNumbers(val)) return true
        }
      } else {
        return true
      }
    }

    return false
  }
  const drawOptionLabel = (option: any) => {
    if (option === '') {
      return translations?.filterAction.emptyString || 'Empty'
    }
    if (option === null) {
      return translations?.filterAction.blank || 'Blank'
    }
    return option
  }
  function removeNullItemsFromArray(arr: any[]) {
    let newArray = arr.filter((item: any) => item !== null)
    return [null, ...newArray]
  }
  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      let newValues: string[] = filterTypeing.CheckedItems
      if (item.ColumnType !== 'Text' && item.ColumnType !== 'Base36Id') {
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
      {isOpened ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, )', // Adjust the overlay color and opacity
            zIndex: 999, // Adjust the zIndex to make sure it's on top
          }}
        ></div>
      ) : null}
      <Autocomplete
        multiple
        limitTags={advancedSettings ? 1 : 2}
        id='multiple-limit-tags'
        onKeyUp={(event) => handleKeyUp(event)}
        options={checkList()}
        disabled={isDisabled && item.ColumnName !== columnName}
        disableCloseOnSelect
        onOpen={handleOpenList}
        onClose={handleCloseList}
        onInputChange={(event, newInputValue) => onChange(event, newInputValue)}
        onChange={selectValue}
        noOptionsText={'Empty Data'}
        getOptionLabel={getLabel}
        clearOnEscape
        value={checkedItems.map((item) => {
          if (item === '') {
            return translations?.filterAction.emptyString || 'Empty'
          } else if (item === 'null' || item === null) {
            return translations?.filterAction.blank || 'Blank'
          } else {
            return item
          }
        })}
        inputValue={val}
        isOptionEqualToValue={isEqual}
        freeSolo
        size={inputSizes}
        sx={{ fontSize: '8px' }}
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
                  borderBottom: option === '' || option === 'null' || option === 'Blank' ? '1px solid silver' : 'none',
                }}
              >
                {item.ColumnName === columnName && isLoadingFilters ? (
                  <div style={{ width: '100%' }}>
                    <Skeleton />
                  </div>
                ) : (
                  <>
                    <div>{drawOptionLabel(option)}</div>
                    <Checkbox
                      checked={selected}
                      sx={{
                        color: '#ACBCC3',
                      }}
                    />
                  </>
                )}
              </li>
              {/* <div>Empty</div> */}
              {option === perColumnListForFilters?.at(-1) ? (
                <div className='G-center' style={{ width: '100%' }}>
                  {(perColumnListForFilters?.length ?? 0) < (perColumnTotalCount ?? 0) ? (
                    <Button
                      className='G-center'
                      size='large'
                      style={{
                        margin: '0 16px',
                        width: 'auto',
                        backgroundColor: 'white',
                        color: 'black',
                        border: 'none',
                      }}
                      onClick={handleChangePagePerFilterField}
                    >
                      {translations?.filterAction.loadMore || 'Load more'}
                    </Button>
                  ) : null}
                </div>
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
            label={item.key || item.ColumnName}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {item.ColumnName === columnName && isLoadingFilters && <CircularProgress color='inherit' size={20} />}
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
            top: filterColumns?.at(-1)?.ColumnName === item.ColumnName ? -55 : 40,
            backgroundColor: 'white',
            opacity: 1,
            zIndex: 888888,
            width: '100%',
          }}
        >
          {translations?.filterAction.emptyFieldData || 'Empty data'}
        </div>
      ) : null}
    </div>
  )
}

export default memo(MultipleCheck)
