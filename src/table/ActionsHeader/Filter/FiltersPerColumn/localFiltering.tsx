import React, { useState, useEffect, SyntheticEvent } from 'react'
import Checkbox from '../../../components/checkbox'
import { Autocomplete, TextField } from '@mui/material'
import { IComparisonType, ItemFields } from '../../../../Models/table.models'

interface IPerField {
  item: IComparisonType
  data: any
  advancedSettings: boolean
  getFilteredData: any
  perColumnListForFilters?: string[]
  filteredColumn?: ItemFields[]
  getColumnName?(columnName: string): void
}

const LocalFilter = ({
  item,
  getFilteredData,
  perColumnListForFilters,
  advancedSettings,
  filteredColumn,
  getColumnName,
}: IPerField) => {
  const [filter, setFilter] = useState<ItemFields>({
    PropertyName: item.ColumnName,
    Values: [],
    ComparisonType: 'In',
    TypeForUi: item.ColumnType,
    Search: '',

    CheckedItems: [],
  })
  const [columnName, setCoulmnName] = useState<string>('')

  const selectComparisonType = (event: any) => {
    setFilter((prev) => {
      return { ...prev, ComparisonType: event.target.value as string }
    })
  }
  const selectValue = (event: SyntheticEvent<Element, Event>, value: any[]) => {
    setFilter((prev: any) => {
      return { ...prev, Values: value }
    })
  }
  const isEqual = (option: any, value: any) => {
    if (option === value) {
      return true
    }
    return false
  }
  const getLabel = (options: any) => {
    return options
  }
  const handleChangeInputValue = (value: string) => {
    setFilter((prev) => {
      return { ...prev, Search: value }
    })
  }

  useEffect(() => {
    getFilteredData(filter)
  }, [filter])

  return (
    <div className='G-justify-between' style={{ marginTop: 16 }}>
      <Autocomplete
        multiple
        limitTags={advancedSettings ? 1 : 2}
        id='multiple-limit-tags'
        options={item.ColumnName === columnName && perColumnListForFilters ? perColumnListForFilters : []}
        disableCloseOnSelect
        onOpen={() => {
          getColumnName?.(item.ColumnName)
          setCoulmnName(item.ColumnName)
        }}
        onClose={() => {
          setCoulmnName('')
          getColumnName?.('')
        }}
        onInputChange={(event, newInputValue) => {
          handleChangeInputValue(newInputValue)
        }}
        onChange={selectValue}
        noOptionsText='Waiting...'
        getOptionLabel={getLabel}
        // includeInputInList
        clearOnEscape
        // value={filter.Values}
        // inputValue={filter.Search}
        isOptionEqualToValue={isEqual}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #DCDCDC',
            }}
          >
            {option}
            <Checkbox isCheck={selected} />
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={item.ColumnName}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        sx={{ width: '100%' }}
      />
    </div>
  )
}

export default LocalFilter
