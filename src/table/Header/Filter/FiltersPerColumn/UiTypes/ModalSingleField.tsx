import React, { useState, useEffect } from 'react'
import { Autocomplete, TextField, Box, CircularProgress, Button } from '@mui/material'
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
  item: IComparisonType
  filterTypeing: ItemFields
  columnName: string
  perColumnListForFilters?: string[]
  isLoadingFilters?: boolean
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
  handleChangeValue,
  handleSelectItems,
  setCoulmnName,
  setCheckedItemsLocaly,
  handleClose,
  handleChangePagePerFilterField,
}: IModalForSingleField) => {
  const [checkedItems, setcheckedItems] = useState<string[]>([])
  const [fakeItems] = useState<string[]>([])
  const [val, setVal] = useState<string>('')
  const [errMessage, setErrMessage] = useState<string>('')
  const [isLoadedMoreData, setIsLoadedMoreData] = useState<boolean>(false)
  const handleOpenList = () => {
    setCoulmnName(item.ColumnName)
    // handleSelectItems([], true);
  }
  const handleCloseList = () => {
    setVal('')
    setIsLoadedMoreData(false)
  }
  const selectValue = (event: any, value: any[]) => {
    setIsLoadedMoreData(false)

    if (!value.length) {
      setcheckedItems(value)
      return
    }
    if (checkedItems.includes(value[0])) {
      let newItems = checkedItems.filter((elem) => elem !== value[0])
      setcheckedItems(newItems)
      return
    }
    setcheckedItems((prev) => [...prev, value[0]])
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
  const onAccept = () => {
    if (item.ColumnType !== 'Text') {
      let newValues: number[] = []
      checkedItems.map((item) => newValues.push(+item))
      handleSelectItems(newValues, false)
      setCheckedItemsLocaly(newValues)
    } else {
      handleSelectItems(checkedItems, false)
      setCheckedItemsLocaly(checkedItems)
    }
    handleClose?.()
  }
  const onCancel = () => {
    handleSelectItems(filterTypeing.CheckedItems, false)
    setcheckedItems(filterTypeing.CheckedItems)
    handleClose?.()
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
      if (!isLoadedMoreData) {
        perColumnListForFilters?.unshift(val)
      }
      if (perColumnListForFilters.length === 2) {
        return [perColumnListForFilters[1]]
      } else {
        return perColumnListForFilters
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
    <Box sx={style}>
      <div className='G-justify-between' style={{ marginBottom: 32 }}>
        <div style={{ width: '48%', position: 'relative' }}>
          <Autocomplete
            multiple
            id='multiple-limit-tags'
            noOptionsText={'Empty Data'}
            options={rendData()}
            value={fakeItems}
            inputValue={val}
            disabled={checkedItems.length > 0}
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
                      {option}
                    </li>
                    {perColumnListForFilters &&
                    option === perColumnListForFilters[perColumnListForFilters.length - 1] ? (
                      <Button
                        size='large'
                        style={{
                          margin: '10px',
                          width: '90%',
                          backgroundColor: '#FB9C59',
                          color: 'black',
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
                top: 58,
                zIndex: 888888,
                width: '100%',
              }}
            >
              empty data
            </div>
          ) : null}
        </div>
        <Autocomplete
          limitTags={1}
          multiple
          id='checkboxes-tag'
          options={[]}
          autoFocus={false}
          value={checkedItems}
          onChange={selectValue}
          fullWidth
          popupIcon={''}
          inputValue=''
          renderInput={(params) => (
            <TextField key={params.id} {...params} label={filterTypeing.PropertyName} value='' />
          )}
          open={false}
          sx={{ width: '48%', height: 'max-content' }}
        />
        {/* {checkedItems?.map((item) => {
          return <div>{item}</div>;
        })} */}
      </div>
      <AcceptCancel errMessage={errMessage} checkedItems={checkedItems} handleClose={onCancel} onAccept={onAccept} />
    </Box>
  )
}

export default ModalForSingleField
