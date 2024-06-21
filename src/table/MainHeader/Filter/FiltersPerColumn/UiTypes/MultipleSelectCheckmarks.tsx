//@ts-nocheck
import { Autocomplete, CircularProgress, TextField, Checkbox } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import React, { SyntheticEvent, memo, useEffect, useState } from 'react'
import { inputSize } from '../../../../../Models/table.enum'
import { IComparisonType, ISelect, ItemFields } from '../../../../../Models/table.models'

interface IMultipleSelectCheckmarks {
  item: IComparisonType
  columnsSizes: string
  isDisabled: boolean
  perColumnListForFilters?: ISelect[]
  columnName: string
  isLoadingFilters?: boolean
  advancedSettings: boolean
  filterTyping: ItemFields
  inputSizes: inputSize
  filterColumns?: IComparisonType[]
  translations?: Record<string, any>
  setCheckedItemsLocaly(options: any[]): void
  handleSelectItems: (option: any[], isClosed: boolean) => void
  setColumnName: (name: string) => void
}

const MultipleSelectCheckmarks = ({
  item,
  columnsSizes,
  isDisabled,
  perColumnListForFilters,
  columnName,
  isLoadingFilters,
  advancedSettings,
  filterTyping,
  inputSizes,
  translations,
  filterColumns,
  setCheckedItemsLocaly,
  handleSelectItems,
  setColumnName,
}: IMultipleSelectCheckmarks) => {
  const [checkedItems, setCheckedItems] = useState<ISelect[]>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const handleChange = (value: ISelect[]) => {
    setCheckedItems(value)
    if (!isOpened) {
      handleSelectItems(value, false)
    }
    setCheckedItemsLocaly(value)
  }

  const handleOpenList = () => {
    if (!isDisabled) {
      setColumnName(item.ColumnName)
      handleSelectItems([], true)
      setIsOpened(true)
    }
  }
  const handleCloseList = () => {
    setColumnName('')
    handleSelectItems(checkedItems, false)
    setIsOpened(false)
  }
  const isEmpty = item.ColumnName === columnName && !isLoadingFilters && !perColumnListForFilters?.length

  const getLabel = (option: any) => {
    return option.name
  }

  useEffect(() => {
    if (item.ColumnName === filterTyping.PropertyName) {
      setCheckedItems(filterTyping.CheckedItems)
    }
  }, [filterTyping])

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
            backgroundColor: 'rgba(0, 0, 0, )',
            zIndex: 999,
          }}
        ></div>
      ) : null}
      <FormControl fullWidth size={inputSizes}>
        <Autocomplete
          id={item.ColumnName}
          multiple
          limitTags={advancedSettings ? 1 : 2}
          options={perColumnListForFilters ?? []}
          value={checkedItems}
          onChange={(event: SyntheticEvent<Element, Event>, value: any[]) => {
            handleChange(value)
          }}
          getOptionLabel={getLabel}
          onOpen={handleOpenList}
          onClose={handleCloseList}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          disableCloseOnSelect
          size={inputSizes}
          disabled={isDisabled && item.ColumnName !== columnName}
          freeSolo
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
                    borderBottom: option.name === '' ? '1px solid silver' : 'none',
                  }}
                >
                  {item.ColumnName === columnName && isLoadingFilters ? null : (
                    <>
                      <div>{option.name}</div>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    </>
                  )}
                </li>
              </div>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name={item.ColumnName}
              label={item.key || item.ColumnName}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {item.ColumnName === columnName && isLoadingFilters && (
                      <CircularProgress color='inherit' size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
      {isEmpty ? (
        <div
          className='G-align-center G-shadow-around'
          style={{
            borderRadius: 4,
            height: 56,
            padding: 15,
            color: 'silver',
            position: 'absolute',
            backgroundColor: 'white',
            top: filterColumns?.at(-1)?.ColumnName === item.ColumnName ? -55 : 40,
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

export default memo(MultipleSelectCheckmarks)

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
