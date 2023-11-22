import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { filterTypesUiHelper, inputSize } from '../../../../Models/table.enum'
import { IComparisonType, ItemFields } from '../../../../Models/table.models'
import { filterUiHelper } from '../../../../utils'
import BetweenDates from './UiTypes/BetweenDates'
import BetweenNumbers from './UiTypes/BetweenNumbers'
import ModalForSingleField from './UiTypes/ModalSingleField'
import MultipleCheck from './UiTypes/MultipleCheck'
import MultipleSelectCheckmarks from './UiTypes/MultipleSelectCheckmarks'
import PickDate from './UiTypes/PickDate'

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
  perColumnTotalCount?: number
  translations?: Record<string, any>
  getFilteredData?(option: ItemFields, ColumnName?: string): void
  checkIsDisabled(option: boolean): void
  handleChangePagePerFilterField?(): void
}

const inputSizes: inputSize = 'small'
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
  perColumnTotalCount,
  translations,
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
      const idNumeric = ['Number', 'Percentage', 'Currency'].includes(item.ColumnType)

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
      if (['Number', 'Percentage', 'Currency'].includes(item.ColumnType)) {
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
  const selectComparisonType = (value: any) => {
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
  const handleSelectItems = (checkedItems: any[], isOpened: boolean, fieldName?: string) => {
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
        filteredData.ComparisonType =
          item.ColumnType === 'Tags' && filteredData.ComparisonType === 'Contains'
            ? filteredData.ComparisonType
            : checkedItems.length > 1
            ? 'In'
            : 'Equal'
      }

      getFilteredData?.(filteredData, '')
    }
  }
  const setCheckedItemsLocaly = (option: any[], closeCallBack?: () => void) => {
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
            size={inputSizes}
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
            perColumnTotalCount={perColumnTotalCount}
            inputSizes={inputSizes}
            translations={translations}
            setCheckedItemsLocaly={setCheckedItemsLocaly}
            handleChangePagePerFilterField={handleChangePagePerFilterField}
            handleChangeValue={handleChangeValue}
            handleSelectItems={handleSelectItems}
            setCoulmnName={selectedColumnName}
          />
        )
      case 2:
        return (
          <ModalForSingleField
            item={item}
            columnsSizes={columnsSizes}
            advancedSettings={advancedSettings}
            perColumnListForFilters={perColumnListForFilters}
            columnName={columnName}
            filterTypeing={filterTypeing}
            isLoadingFilters={isLoadingFilters}
            perColumnTotalCount={perColumnTotalCount}
            isDisabled={isDisabled}
            inputSizes={inputSizes}
            translations={translations}
            setCheckedItemsLocaly={setCheckedItemsLocaly}
            handleChangeValue={handleChangeValue}
            handleSelectItems={handleSelectItems}
            setCoulmnName={selectedColumnName}
            handleChangePagePerFilterField={handleChangePagePerFilterField}
          />
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
            inputSizes={inputSizes}
            translations={translations}
            checkIsDisabled={checkIsDisabled}
            setCoulmnName={setCoulmnName}
            handleChangeRange={handleChangeRange}
          />
        )
      case 4:
        return (
          <MultipleSelectCheckmarks
            item={item}
            columnsSizes={columnsSizes}
            perColumnListForFilters={perColumnListForFilters}
            columnName={columnName}
            isLoadingFilters={isLoadingFilters}
            isDisabled={isDisabled}
            advancedSettings={advancedSettings}
            filterTypeing={filterTypeing}
            inputSizes={inputSizes}
            translations={translations}
            setCheckedItemsLocaly={setCheckedItemsLocaly}
            setCoulmnName={selectedColumnName}
            handleSelectItems={handleSelectItems}
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
            inputSizes={inputSizes}
            translations={translations}
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
            inputSizes={inputSizes}
            translations={translations}
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
    <div style={{ marginTop: 8 }}>
      {filterUiHelper(typeElem.ColumnType, filterTypeing.TypeForUi) == 5 ||
      filterUiHelper(typeElem.ColumnType, filterTypeing.TypeForUi) == 3 ? (
        <div style={{ margin: '0 0 10px 0', fontSize: 14 }}>{item.key || item.ColumnName}</div>
      ) : null}
      <div className='G-justify-between'>
        {advancedSettings ? (
          <div
            style={{
              width: advancedSettings ? ComparisonType : '100%',
              position: 'relative',
            }}
          >
            <Autocomplete
              value={filterTypesUiHelper[filterTypeing.TypeForUi as keyof typeof filterTypesUiHelper]}
              onChange={(event: any, newValue: string | null) => {
                selectComparisonType(newValue)
              }}
              inputValue={filterTypesUiHelper[filterTypeing.TypeForUi as keyof typeof filterTypesUiHelper]}
              disablePortal
              disableClearable
              disabled={isDisabled}
              size={inputSizes}
              onInputChange={() => console.log()}
              sx={{ ':hover': { cursor: 'pointer' } }}
              id='controllable-states-demo'
              options={typeElem.FilterTypes}
              renderOption={(props, option, { selected }) => {
                return (
                  <div key={props.id}>
                    <li
                      {...props}
                      style={{
                        padding: '6px 16px',
                      }}
                    >
                      {filterTypesUiHelper[option as keyof typeof filterTypesUiHelper]}
                    </li>
                  </div>
                )
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    caretColor: 'transparent',
                  }}
                />
              )}
            />
          </div>
        ) : null}
        {uiTypes()}
      </div>
    </div>
  )
}

export default APIFilter
