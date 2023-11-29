import { Button } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import { IComparisonType, IFiltersTypes, ItemFields } from '../../../Models/table.models'
import NativePopup from '../../../components/NativePopup/NativePopup'
import FilterSvgIcon from '../../../svgIcons/FilterSvgIcon'
import APIFilter from './FiltersPerColumn/apiFilter'
import LocalFilter from './FiltersPerColumn/localFiltering'

interface IFilter {
  data?: any
  filterColumns?: IComparisonType[]
  perColumnListForFilters?: string[]
  filterDataForRequest?: ItemFields[]
  isLocalFilter?: boolean
  isLoadingFilters?: boolean
  filtersTypes?: IFiltersTypes[]
  perColumnTotalCount?: number
  translations?: Record<string, any>
  getFilter?(option: ItemFields[], ColumnName?: string): void
  getFilteredDataWithDebounce?(option: ItemFields[], ColumnName?: string): void
  getFilteredDataForTable?(): void
  handleChangePagePerFilterField?(): void
}

const Filter = ({
  data,
  filterColumns,
  perColumnListForFilters,
  filterDataForRequest,
  isLocalFilter = false,
  isLoadingFilters,
  filtersTypes,
  perColumnTotalCount,
  translations,
  handleChangePagePerFilterField,
  getFilter,
  getFilteredDataWithDebounce,
  getFilteredDataForTable,
}: IFilter) => {
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [open, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleCancel = () => {
    getFilter?.([], 'ClearAll')
    setIsOpen(false)
  }
  const checkIsDisabled = (option: boolean) => {
    setIsDisabled(option)
  }
  const getFilteredData = (option: ItemFields, ColumnName?: string) => {
    const updatedRow = filterDataForRequest ? [...filterDataForRequest] : []
    if (option.Values.length === 0) {
      const indexToRemove = updatedRow.findIndex((item) => item.PropertyName === option.PropertyName)
      if (indexToRemove !== -1) {
        updatedRow.splice(indexToRemove, 1)
      }
    } else {
      const existingItemIndex = updatedRow.findIndex((item) => item.PropertyName === option.PropertyName)
      if (existingItemIndex !== -1) {
        updatedRow[existingItemIndex] = option
      } else {
        updatedRow.push(option)
      }
    }
    option.Search ? getFilteredDataWithDebounce?.(updatedRow, ColumnName) : getFilter?.(updatedRow, ColumnName)
  }

  return (
    <div>
      <NativePopup
        ActiveIcon={FilterSvgIcon}
        isOpen={open}
        popupName={translations?.filterAction.modalName || 'Filter By'}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div style={{ padding: '20px 0', width: 553 }}>
          <div style={{ width: '100%' }} className='G-justify-end'>
            <div
              onClick={() => setAdvancedSettings((prev) => !prev)}
              style={{
                backgroundColor: 'white',
                width: 'auto',
                color: advancedSettings ? '#4844C5' : 'black',
                cursor: 'pointer',
                marginRight: 32,
                textDecoration: 'underline',
              }}
            >
              {translations?.filterAction.advanced}
            </div>
          </div>
          <ul
            className='P-Filters'
            style={{
              border: 'none',
              overflowX: 'auto',
              overflowY: 'auto',
              maxHeight: '60dvh',
              padding: '0px 32px 10px 32px',
            }}
          >
            {isLocalFilter ? (
              data.map((item: any, index: any) => {
                return (
                  <LocalFilter
                    advancedSettings={advancedSettings}
                    key={item}
                    item={item}
                    data={data}
                    filteredColumn={filterDataForRequest}
                    perColumnListForFilters={perColumnListForFilters}
                    getFilteredData={getFilteredData}
                  />
                )
              })
            ) : filterColumns?.length ? (
              filterColumns.map((item: IComparisonType, index) => {
                return (
                  <Fragment key={index}>
                    {filtersTypes?.length &&
                      filtersTypes.map((type: any) => {
                        if (item.ColumnType === type.ColumnType)
                          return (
                            <Fragment key={item.ColumnName}>
                              <APIFilter
                                isLoadingFilters={isLoadingFilters}
                                advancedSettings={advancedSettings}
                                item={item}
                                data={data}
                                typeElem={type}
                                isDisabled={isDisabled}
                                perColumnTotalCount={perColumnTotalCount}
                                translations={translations}
                                handleChangePagePerFilterField={handleChangePagePerFilterField}
                                checkIsDisabled={checkIsDisabled}
                                filteredColumn={filterDataForRequest}
                                perColumnListForFilters={perColumnListForFilters}
                                getFilteredData={getFilteredData}
                                filterColumns={filterColumns}
                              />
                            </Fragment>
                          )
                      })}
                  </Fragment>
                )
              })
            ) : (
              <div>{translations?.filterAction.emptyColumns || 'Add Filters Columns'}</div>
            )}
          </ul>
          <div style={{ padding: 20, borderTop: '1px  solid #F3F6F8' }}>
            <Button
              size='medium'
              fullWidth
              disabled={isDisabled}
              style={{
                marginBottom: 8,
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.16)',
              }}
              onClick={(e) => {
                getFilteredDataForTable?.()
                handleClose()
              }}
            >
              {translations?.filterAction.confirmFilters || 'Submit'}
            </Button>
            <Button
              size='medium'
              variant='outlined'
              fullWidth
              style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)' }}
              onClick={handleCancel}
            >
              {translations?.filterAction.clearFilters || 'Clear All Filters'}
            </Button>
          </div>
        </div>
      </NativePopup>
    </div>
  )
}

export default memo(Filter)
