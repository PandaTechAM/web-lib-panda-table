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

interface IActionsHeader<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  pageSizeStructure?: IPageSizes[]
  selectedPageCount?: ISelected
  currPage?: number
  pagesTotalCount?: number
  multipleCheck?: boolean
  data: T[]
  checkedRows: T[]
  draggableColumns?: boolean
  filterColumns?: IComparisonType[]
  perColumnListForFilters?: string[]
  filterDataForRequest?: ItemFields[]
  isLoadingFilters?: boolean
  filtersTypes?: IFiltersTypes[]
  setColumnTotalStructures?(option: IColumnTotalStructure): void
  handleCheckAll(): void
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void
  handleChangePage?(option: number): void
  handleEdit?(option: T): void
  handleDelete?(option: T[]): void
  getPageRowsCountAndCurrentPage?(pageNumber: number, rowsCount: number): void
  handleSelectDataSize?(options: IPageSizes): void
  storeStructure?(): void
  unCheck(): void
  checkAllDataFromDb(): void
  getFilteredData?(options: any): void
  getFilteredDataForTable?(): void
  handleChangePagePerFilterField?(): void
  getDownloadType?(option: string): void
}
const MainHeader = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  multipleCheck,
  pagesTotalCount = 0,
  currPage = 1,
  data,
  checkedRows,
  draggableColumns,
  filterColumns,
  perColumnListForFilters,
  filterDataForRequest,
  isLoadingFilters,
  filtersTypes,
  handleChangePagePerFilterField,
  unCheck,
  checkAllDataFromDb,
  setColumnTotalStructures,
  handleCheckAll,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleEdit,
  handleDelete,
  getPageRowsCountAndCurrentPage,
  storeStructure,
  getFilteredData,
  getFilteredDataForTable,
  getDownloadType,
}: IActionsHeader<T>) => {
  return (
    <div className='G-center G-table-actions-header'>
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
            {checkedRows.length && handleEdit ? (
              <div className='G-flex G-edit' style={{ marginRight: '20px' }} onClick={() => handleEdit(checkedRows[0])}>
                <div>
                  <EditSvgIcon />
                </div>
                <span>Edit</span>
              </div>
            ) : null}
            {checkedRows.length && handleDelete ? (
              <div className='G-flex G-delete' onClick={() => handleDelete(checkedRows)}>
                <div>
                  <DeleteSvgIcon />
                </div>
                <span>Delete</span>
              </div>
            ) : null}
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

      <div>
        <Filter
          data={data}
          filterColumns={filterColumns}
          perColumnListForFilters={perColumnListForFilters}
          filterDataForRequest={filterDataForRequest}
          isLoadingFilters={isLoadingFilters}
          filtersTypes={filtersTypes}
          getFilter={getFilteredData}
          getFilteredDataForTable={getFilteredDataForTable}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
        />
      </div>
      {getDownloadType && (
        <div className='G-center'>
          <Download getDownloadType={getDownloadType} />
        </div>
      )}
    </div>
  )
}

export default MainHeader
