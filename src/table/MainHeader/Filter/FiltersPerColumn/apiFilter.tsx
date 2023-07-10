import React, { useState, useEffect } from 'react'
import { MenuItem, Select, TextField } from '@mui/material'
import { IComparisonType, ItemFields } from '../../../../Models/table.models'
import { filterUiHelper } from '../../../../utils'
import MultipleCheck from './UiTypes/MultipleCheck'
import PickDate from './UiTypes/PickDate'
import BetweenDates from './UiTypes/BetweenDates'
import BetweenNumbers from './UiTypes/BetweenNumbers'
import ModalForSingleField from './UiTypes/ModalSingleField'
import FiltersModalWrapper from '../../../../components/modal/FiltersModalWrapper'

interface IPerField {
  item: IComparisonType
  data: any
  advancedSettings: boolean
  typeElem: any
  perColumnListForFilters?: string[]
  filteredColumn?: ItemFields[]
  isLoadingFilters?: boolean
  isDisabled: boolean
  selectedItem?: ItemFields
  getFilteredData?(option: ItemFields, ColumnName?: string): void
  checkIsDisabled(option: boolean): void
  handleChangePagePerFilterField?(): void
}
export interface ICoulmnError {
  columnName: string
  errorMessage: string
  columnField: string
}
const columnsSizes = '66%'
const ComparisonType = '30%'

const APIFilter = ({
  item,
  getFilteredData,
  perColumnListForFilters,
  typeElem,
  advancedSettings,
  filteredColumn,
  isLoadingFilters,
  isDisabled,
  selectedItem,
  checkIsDisabled,
  handleChangePagePerFilterField,
}: IPerField) => {
  const [filterTypeing, setfilterTypeing] = useState<ItemFields>({
    PropertyName: item.ColumnName,
    Search: '',
    Values: [],
    CheckedItems: [],
    ComparisonType: typeElem.DefaultSearchType,
    TypeForUi: typeElem.DefaultSearchType,
  })
  const [columnName, setCoulmnName] = useState<string>('')

  const handleChangeValue = (value: any) => {
    let columnFilter: ItemFields = {
      PropertyName: item.ColumnName,
      Values: [],
      CheckedItems: filterTypeing.CheckedItems,
      ComparisonType:
        item.ColumnType === 'Text' && filterTypeing.TypeForUi === 'Equal' ? 'Contains' : filterTypeing.TypeForUi,
      TypeForUi: filterTypeing.TypeForUi,
      Search: '',
    }
    if (value === 'invalid' && item.ColumnType === 'Date') {
      checkIsDisabled(true)
      return
    }
    checkIsDisabled(false)
    if (value === '') {
      columnFilter.Values = []
      columnFilter.Search = ''
    } else {
      const idNumeric =
        item.ColumnType === 'Number' || item.ColumnType === 'Percentage' || item.ColumnType === 'Currency'

      columnFilter.Values[0] = idNumeric ? Number(value) : value
      columnFilter.Search = idNumeric ? Number(value) : value
    }
    if (filterUiHelper(typeElem.ColumnType, filterTypeing.TypeForUi) === 2 && value === '') {
      getFilteredData?.(columnFilter, '')
      return
    }
    getFilteredData?.(columnFilter, filterTypeing.PropertyName)
  }
  const handleChangeRange = (from: string, to: string) => {
    let columnFilter: ItemFields = filterTypeing
    checkIsDisabled(false)

    if (from === '' && to === '') {
      columnFilter.Values = []
    } else {
      if (item.ColumnType !== 'Date') {
        let numericFrom = +from
        let numericTo = +to
        columnFilter.Values = [numericFrom, numericTo]
      } else {
        columnFilter.Values = [from, to]
      }
    }
    getFilteredData?.(columnFilter, '')
  }
  const handleChangeValueSingleInputs = (value: any) => {
    let columnFilter: ItemFields = filterTypeing

    if (value === 'invalid' && item.ColumnType === 'Date') {
      checkIsDisabled(true)
      return
    }
    checkIsDisabled(false)
    if (value === '') {
      columnFilter.Values = []
      columnFilter.Search = ''
    } else {
      if (item.ColumnType === 'Number' || item.ColumnType === 'Percentage' || item.ColumnType === 'Currency') {
        let numeric = +value
        columnFilter.Values[0] = numeric
        columnFilter.Search = numeric
      } else {
        columnFilter.Values[0] = value
        columnFilter.Search = value
      }
    }

    getFilteredData?.(columnFilter, '')
  }
  const selectComparisonType = (event: any) => {
    const { value } = event.target
    if (filterUiHelper(typeElem.ColumnType, value) === 2) {
    }
    let columnFilter: ItemFields = {
      PropertyName: item.ColumnName,
      Search: '',
      Values: [],
      CheckedItems: filterTypeing.CheckedItems,
      ComparisonType: value,
      TypeForUi: value,
    }
    setfilterTypeing((prev) => {
      return {
        ...prev,
        Values: [],
        CheckedItems: [],
        ComparisonType: value,
        TypeForUi: value,
      }
    })

    if (value === 'IsEmpty') {
      columnFilter.Values = ['']
    } else if (value === 'IsTrue') {
      columnFilter.Values = [true]
    } else if (value === 'IsFalse') {
      columnFilter.Values = [false]
    }

    getFilteredData?.(columnFilter, '')
  }
  const selectedColumnName = (options: string) => {
    setCoulmnName(options)
  }
  const handleSelectItems = (checkedItems: any[], isOpened: boolean) => {
    if (isOpened) {
      getFilteredData?.(
        {
          PropertyName: filterTypeing.PropertyName,
          Values: [],
          ComparisonType: 'Contains',
          CheckedItems: [],
          Search: '',
          TypeForUi: filterTypeing.ComparisonType,
        },
        filterTypeing.PropertyName,
      )
      setfilterTypeing((prev) => {
        return { ...prev, ComparisonType: filterTypeing.TypeForUi }
      })
    } else {
      let filteredData = {
        PropertyName: filterTypeing.PropertyName,
        Values: checkedItems,
        ComparisonType: filterTypeing.TypeForUi,
        CheckedItems: checkedItems,
        Search: '',
        TypeForUi: filterTypeing.TypeForUi,
      }
      if (filterUiHelper(typeElem.ColumnType, filterTypeing.TypeForUi) !== 2) {
        filteredData.ComparisonType = checkedItems.length > 1 ? 'In' : 'Equal'
      }

      getFilteredData?.(filteredData, '')
    }
  }
  const setCheckedItemsLocaly = (option: any[]) => {
    setfilterTypeing((prev) => {
      return { ...prev, CheckedItems: option }
    })
  }
  const uiTypes = () => {
    const type = filterUiHelper(typeElem.ColumnType, filterTypeing.TypeForUi)

    switch (type) {
      case 0:
        return (
          <TextField
            disabled
            id='outlined-basic'
            label={item.ColumnName}
            variant='outlined'
            sx={{ width: advancedSettings ? columnsSizes : '100%' }}
          />
        )
      case 1:
        return (
          <MultipleCheck
            columnsSizes={columnsSizes}
            advancedSettings={advancedSettings}
            item={item}
            perColumnListForFilters={perColumnListForFilters}
            columnName={columnName}
            filterTypeing={filterTypeing}
            isLoadingFilters={isLoadingFilters}
            isDisabled={isDisabled}
            setCheckedItemsLocaly={setCheckedItemsLocaly}
            getFilteredData={getFilteredData}
            handleChangePagePerFilterField={handleChangePagePerFilterField}
            handleChangeValue={handleChangeValue}
            handleSelectItems={handleSelectItems}
            setCoulmnName={selectedColumnName}
          />
        )
      case 2:
        return (
          <FiltersModalWrapper
            isDisabled={isDisabled}
            advancedSettings={advancedSettings}
            columnsSizes={columnsSizes}
            filterTypeing={filterTypeing}
            setCoulmnName={selectedColumnName}
          >
            <ModalForSingleField
              item={item}
              perColumnListForFilters={perColumnListForFilters}
              columnName={columnName}
              filterTypeing={filterTypeing}
              isLoadingFilters={isLoadingFilters}
              setCheckedItemsLocaly={setCheckedItemsLocaly}
              handleChangeValue={handleChangeValue}
              handleSelectItems={handleSelectItems}
              setCoulmnName={selectedColumnName}
              handleChangePagePerFilterField={handleChangePagePerFilterField}
            />
          </FiltersModalWrapper>
        )
      case 3:
        return (
          <BetweenNumbers
            columnsSizes={columnsSizes}
            advancedSettings={advancedSettings}
            item={item}
            columnName={columnName}
            filterTypeing={filterTypeing}
            isDisabled={isDisabled}
            checkIsDisabled={checkIsDisabled}
            setCoulmnName={setCoulmnName}
            handleChangeRange={handleChangeRange}
          />
        )
      case 4:
        return (
          <TextField
            disabled
            id='outlined-basic'
            variant='outlined'
            label='Status'
            sx={{ width: advancedSettings ? columnsSizes : '100%' }}
          />
        )
      case 5:
        return (
          <BetweenDates
            columnsSizes={columnsSizes}
            advancedSettings={advancedSettings}
            item={item}
            columnName={columnName}
            filterTypeing={filterTypeing}
            isDisabled={isDisabled}
            checkIsDisabled={checkIsDisabled}
            setCoulmnName={setCoulmnName}
            handleChangeRange={handleChangeRange}
          />
        )
      case 6:
        return (
          <PickDate
            columnsSizes={columnsSizes}
            advancedSettings={advancedSettings}
            item={item}
            columnName={columnName}
            filterTypeing={filterTypeing}
            isDisabled={isDisabled}
            setCoulmnName={setCoulmnName}
            handleChangeValue={handleChangeValueSingleInputs}
          />
        )
    }
  }

  useEffect(() => {
    if (filteredColumn?.length)
      filteredColumn?.map((column) => {
        if (column.PropertyName === item.ColumnName) {
          setfilterTypeing(column)
        }
      })
  }, [filteredColumn])

  return (
    <div className='G-justify-between' style={{ marginTop: 16, flexDirection: 'row-reverse' }}>
      {uiTypes()}

      {advancedSettings && (
        <Select
          disabled={isDisabled}
          sx={{ width: ComparisonType, height: 56 }}
          onChange={selectComparisonType}
          value={filterTypeing.TypeForUi}
        >
          {typeElem.FilterTypes.map((types: string) => (
            <MenuItem key={types} value={types}>
              {types}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  )
}

export default APIFilter
