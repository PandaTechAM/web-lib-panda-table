import React from 'react'
import ColumnsCustomizer from './ColumnsCustomizer'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  IComparisonType,
  IFiltersTypes,
  IPageSizes,
  ISelected,
  ItemFields,
} from '../../Models/table.models'
import CheckRows from './CheckRows'
import DeleteSvgIcon from '../../svgIcons/DeleteSvgIcon'
import EditSvgIcon from '../../svgIcons/EditSvgIcon'
import Filter from './Filter'
import Select from '../../components/select/select'
import Download from './Download'
import { CheckedItems } from '../../Models/table.enum'

interface IActionsHeader<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  selectedPageCount?: ISelected
  multipleCheck?: boolean
  data: T[]
  checkedRows: T[]
  draggableColumns?: boolean
  filterColumns?: IComparisonType[]
  perColumnListForFilters?: string[]
  filterDataForRequest?: ItemFields[]
  isLoadingFilters?: boolean
  filtersTypes?: IFiltersTypes[]
  selectedType: string
  perColumnTotalCount?: number
  hasFilters?: boolean
  setColumnTotalStructures?(option: IColumnTotalStructure): void
  handleCheckAll(): void
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void
  handleChangePage?(option: number): void
  handleEdit?(option: T): void
  handleDelete?(option: T[] | string): void
  handleSelectDataSize?(options: IPageSizes): void
  storeStructure?(): void
  unCheck(): void
  checkAllDataFromDb(): void
  getFilteredData?(options: any): void
  getFilteredDataForTable?(): void
  handleChangePagePerFilterField?(): void
  getDownloadType?: (option: string, checkedRows: T[] | string) => void
  customHeaderAction?(option: T[] | string): JSX.Element
}
const MainHeader = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  multipleCheck,
  data,
  checkedRows,
  draggableColumns,
  filterColumns,
  perColumnListForFilters,
  filterDataForRequest,
  isLoadingFilters,
  filtersTypes,
  selectedType,
  perColumnTotalCount,
  hasFilters,
  handleChangePagePerFilterField,
  unCheck,
  checkAllDataFromDb,
  handleCheckAll,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleEdit,
  handleDelete,
  storeStructure,
  getFilteredData,
  getFilteredDataForTable,
  getDownloadType,
  customHeaderAction,
}: IActionsHeader<T>) => {
  return (
    <div className='G-justify-start G-table-actions-header'>
      {multipleCheck ? (
        <>
          <CheckRows
            data={data}
            checkedRows={checkedRows}
            handleCheckAll={handleCheckAll}
            unCheck={unCheck}
            checkAllDataFromDb={checkAllDataFromDb}
          />
          <div className='G-center' style={{ marginRight: '27px' }}>
            {checkedRows.length == 1 && handleEdit ? (
              <div className='G-flex G-edit' style={{ marginRight: '20px' }} onClick={() => handleEdit(checkedRows[0])}>
                <div>
                  <EditSvgIcon />
                </div>
                <span>Edit</span>
              </div>
            ) : null}
            {checkedRows.length && handleDelete ? (
              <div
                className='G-flex G-delete'
                onClick={() => handleDelete(selectedType === CheckedItems.SELECTED_ALL ? 'All' : checkedRows)}
              >
                <div>
                  <DeleteSvgIcon />
                </div>
                <span>Delete</span>
              </div>
            ) : null}
            {checkedRows.length
              ? customHeaderAction?.(selectedType === CheckedItems.SELECTED_ALL ? 'All' : checkedRows)
              : null}
          </div>
        </>
      ) : null}
      {draggableColumns ? (
        <ColumnsCustomizer
          columnsConfigStructure={columnsConfigStructure}
          setColumnsConfigStructure={setColumnsConfigStructure}
          columnsHeaderStructure={columnsHeaderStructure}
          setColumnHeaderStructure={setColumnHeaderStructure}
          storeStructure={storeStructure}
        />
      ) : null}

      {hasFilters ? (
        <Filter
          data={data}
          filterColumns={filterColumns}
          perColumnListForFilters={perColumnListForFilters}
          filterDataForRequest={filterDataForRequest}
          isLoadingFilters={isLoadingFilters}
          filtersTypes={filtersTypes}
          perColumnTotalCount={perColumnTotalCount}
          getFilter={getFilteredData}
          getFilteredDataForTable={getFilteredDataForTable}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
        />
      ) : null}
      {getDownloadType && (
        <div className='G-center'>
          <Download selectedType={selectedType} getDownloadType={getDownloadType} checkedRows={checkedRows} />
        </div>
      )}
    </div>
  )
}

export default MainHeader
