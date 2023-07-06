import React, { useState, Fragment } from 'react'
import { Button, Menu } from '@mui/material'
import FilterSvgIcon from '../../../svgIcons/FilterSvgIcon'
import { IComparisonType, IFiltersTypes, ItemFields } from '../../../Models/table.models'
import APIFilter from './FiltersPerColumn/apiFilter'
import LocalFilter from './FiltersPerColumn/localFiltering'
import AdvancedFilerEnabled from '../../../svgIcons/AdvancedFilerEnabledSvgIcon'
import AdvancedFilerDisabled from '../../../svgIcons/AdvancedFilerDisabledSvgIcon'
import PopUp from '../../../components/popUp'

interface IFilter {
  data: any
  filterColumns?: IComparisonType[]
  perColumnListForFilters?: string[]
  filterDataForRequest?: ItemFields[]
  isLocalFilter?: boolean
  isLoadingFilters?: boolean
  filtersTypes?: IFiltersTypes[]
  getFilter?(option: ItemFields[], ColumnName?: string): void
  getFilteredDataForTable?(): void
  handleChangePagePerFilterField?(): void
}
const filtersButton = {
  display: 'flex',
  justifyContent: 'start',
  backgroundColor: 'white',
  border: 'none',
  margin: 0,
  padding: '0px 10px',
}
const Filter = ({
  data,
  filterColumns,
  perColumnListForFilters,
  filterDataForRequest,
  isLocalFilter = true,
  isLoadingFilters,
  filtersTypes,
  handleChangePagePerFilterField,
  getFilter,
  getFilteredDataForTable,
}: IFilter) => {
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCancel = () => {
    getFilter?.([], '')
    // handleClose();
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
    getFilter?.(updatedRow, ColumnName)
  }

  return (
    <div>
      <PopUp
        ActiveIcon={FilterSvgIcon}
        modalName='Filter By'
        style={filtersButton}
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      >
        <div style={{ padding: '48px 32px', width: 553 }}>
          <div style={{ width: '100%' }} className='G-justify-end'>
            <Button
              onClick={() => setAdvancedSettings((prev) => !prev)}
              style={{
                backgroundColor: 'white',
                width: 'auto',
                color: advancedSettings ? '#4844C5' : 'black',
              }}
            >
              {advancedSettings ? <AdvancedFilerDisabled /> : <AdvancedFilerEnabled />}
            </Button>
          </div>
          <ul className='G-dropdown-list P-Filters' style={{ border: 'none', padding: 0 }}>
            {isLocalFilter ? (
              filterColumns?.length ? (
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
                                  handleChangePagePerFilterField={handleChangePagePerFilterField}
                                  checkIsDisabled={checkIsDisabled}
                                  // selectedItem={selectedItem}
                                  filteredColumn={filterDataForRequest}
                                  perColumnListForFilters={perColumnListForFilters}
                                  getFilteredData={getFilteredData}
                                />
                              </Fragment>
                            )
                        })}
                    </Fragment>
                  )
                })
              ) : (
                <div>something went wrong</div>
              )
            ) : (
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
            )}
            <li>
              <Button
                size='large'
                fullWidth
                style={{
                  marginBottom: '10px',
                  backgroundColor: isDisabled ? 'silver' : '#FB9C59',
                  color: isDisabled ? 'white' : 'black',
                }}
                disabled={isDisabled}
                onClick={(e) => {
                  getFilteredDataForTable?.()
                  handleClose()
                }}
              >
                Submit
              </Button>
              <Button
                size='large'
                fullWidth
                style={{ color: 'black', border: '1px solid #FB9C59' }}
                onClick={handleCancel}
              >
                Clear All Filters
              </Button>
            </li>
          </ul>
        </div>
      </PopUp>
    </div>
  )
}

export default Filter
