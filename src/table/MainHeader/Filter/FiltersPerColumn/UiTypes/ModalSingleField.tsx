import React, { useState, useEffect } from 'react'
import { Autocomplete, TextField, Box, CircularProgress, Button, Skeleton } from '@mui/material'
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'
import './style.scss'
import { containsOnlyNumbers } from '../../../../../utils'
import AcceptCancel from '../../../../../components/acceptCancel'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  minHeight: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
}
interface IModalForSingleField {
  columnsSizes: string
  advancedSettings: boolean
  item: IComparisonType
  filterTypeing: ItemFields
  columnName: string
  perColumnListForFilters?: string[]
  isLoadingFilters?: boolean
  perColumnTotalCount?: number
  isDisabled: boolean
  handleSelectItems: (option: any[], isClosed: boolean) => void
  setCoulmnName: (name: string) => void
  handleChangeValue: (value: string) => void
  setCheckedItemsLocaly(options: any[]): void
  handleChangePagePerFilterField?(): void
  handleClose?: () => void
}

const ModalForSingleField = ({
  item,
  perColumnListForFilters,
  columnName,
  filterTypeing,
  isLoadingFilters,
  perColumnTotalCount,
  isDisabled,
  advancedSettings,
  columnsSizes,
  handleChangeValue,
  handleSelectItems,
  setCoulmnName,
  setCheckedItemsLocaly,
  handleClose,
  handleChangePagePerFilterField,
}: IModalForSingleField) => {
  const [checkedItems, setcheckedItems] = useState<string[]>([])
  const [val, setVal] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isLoadedMoreData, setIsLoadedMoreData] = useState<boolean>(false)
  const handleOpenList = () => {
    if (!isDisabled) {
      setCoulmnName(item.ColumnName)
      setIsOpened(true)
      // handleSelectItems([], true);
    }
  }
  const handleCloseList = () => {
    setCoulmnName('')
    setVal('')
    setIsLoadedMoreData(false)
    setIsOpened(false)
    if (item.ColumnType !== 'Text') {
      let newValues: number[] = []
      checkedItems.map((item) => newValues.push(+item))
      handleSelectItems(newValues, false)
      setCheckedItemsLocaly(newValues)
    } else {
      handleSelectItems(checkedItems, false)
      setCheckedItemsLocaly(checkedItems)
    }
  }
  const selectValue = (event: any, value: any[]) => {
    setIsLoadedMoreData(false)
    const selectedValue: string[] = value.length ? [value.at(-1)] : []
    setcheckedItems(selectedValue)
    if (item.ColumnType !== 'Text') {
      let newValues: number[] = []
      newValues = selectedValue.map((item: string) => +item)
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
  const onChnage = (newInputValue: string) => {
    if (item.ColumnType !== 'Text' && !containsOnlyNumbers(newInputValue)) {
      setErrMessage('only numbers')
      setVal(newInputValue)
      return
    }
    setIsLoadedMoreData(false)
    setErrMessage('')
    handleChangeValue(newInputValue)
    setVal(newInputValue)
  }

  const isEmpty = () => {
    if (item.ColumnType !== 'Text') {
      if (
        containsOnlyNumbers(val) &&
        item.ColumnName === columnName &&
        !isLoadingFilters &&
        !perColumnListForFilters?.length &&
        val.length
      )
        return true
    } else {
      if (item.ColumnName === columnName && !isLoadingFilters && !perColumnListForFilters?.length && val.length)
        return true
    }
    return false
  }
  const rendData = () => {
    if (
      filterTypeing.PropertyName === columnName &&
      errMessage === '' &&
      val.length &&
      perColumnListForFilters?.length
    ) {
      let newPerColumnList: string[] = perColumnListForFilters
      if (!isLoadedMoreData) {
        newPerColumnList = perColumnListForFilters ? [val, ...perColumnListForFilters] : [val]
      }
      if (perColumnListForFilters.length === 2) {
        return [newPerColumnList[1]]
      } else {
        return newPerColumnList
      }
    } else {
      return []
    }
  }

  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      let newValues: string[] = filterTypeing.CheckedItems
      if (item.ColumnType !== 'Text') {
        newValues = filterTypeing.CheckedItems.map((item: number) => item + '')
      }
      setcheckedItems(newValues)
    }
  }, [])
  return (
    <div
      style={{
        width: advancedSettings ? columnsSizes : '100%',
        position: 'relative',
      }}
    >
      <Autocomplete
        multiple
        id='multiple-limit-tags'
        noOptionsText={'Empty Data'}
        options={rendData()}
        value={checkedItems}
        inputValue={val}
        onInputChange={(event, newInputValue) => onChnage(newInputValue)}
        onChange={selectValue}
        onOpen={handleOpenList}
        onClose={handleCloseList}
        getOptionLabel={(option) => option}
        disableCloseOnSelect
        autoFocus={false}
        fullWidth
        freeSolo
        filterOptions={(options, state) => options}
        sx={{ height: 'max-content' }}
        renderOption={(props, option, { selected }) => {
          if (option !== '')
            return (
              <div key={props.id} style={{ textAlign: 'center' }}>
                <li
                  {...props}
                  style={{
                    marginLeft: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    minHeight: 40,
                    borderBottom:
                      //@ts-ignore
                      props['data-option-index'] === 0 ? '1px solid #DCDCDC' : 'none',
                  }}
                >
                  {item.ColumnName === columnName && isLoadingFilters ? (
                    <div style={{ width: '100%' }}>
                      <Skeleton />
                    </div>
                  ) : (
                    <>
                      <div>{option === '' ? 'Empty' : option}</div>
                    </>
                  )}
                </li>
                {option === perColumnListForFilters?.at(-1) ? (
                  <div className='G-center' style={{ width: '100%' }}>
                    {perColumnTotalCount && perColumnListForFilters.length < perColumnTotalCount ? (
                      <Button
                        size='large'
                        style={{
                          margin: '0 16px',
                          width: 'auto',
                          backgroundColor: 'white',
                          color: 'black',
                          border: 'none',
                        }}
                        onClick={() => {
                          handleChangePagePerFilterField?.()
                          setIsLoadedMoreData(true)
                        }}
                      >
                        load more
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
            label={filterTypeing.TypeForUi}
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
            backgroundColor: 'white',
            opacity: 1,
            top: 58,
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

export default ModalForSingleField
