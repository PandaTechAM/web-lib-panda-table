import React from 'react'
import ColumnsCustomizer from './ColumnsCustomizer'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  IComparisonType,
  IFiltersTypes,
  IPageSizes,
  ISelectPage,
  ItemFields,
} from '../../Models/table.models'
import CheckRows from './CheckRows'
import DeleteSvgIcon from '../../svgIcons/DeleteSvgIcon'
import EditSvgIcon from '../../svgIcons/EditSvgIcon'
import Filter from './Filter'

interface IActionsHeader<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  pageSizeStructure?: IPageSizes[]
  selectedPageCount?: ISelectPage
  currPage?: number
  pagesTotalCount?: number
  multipleCheck?: boolean
  data: T[]
  checkedRows: T[]
  columnsTotalStructure?: IColumnTotalStructure
  draggableColumns?: boolean
  filterColumns?: IComparisonType[]
  perColumnListForFilters?: string[]
  filterDataForRequest?: ItemFields[]
  isLoadingFilters?: boolean
  filtersTypes?: IFiltersTypes[]
  getColumnName?(columnName: string): void
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
}
const ActionsHeader = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  pageSizeStructure,
  multipleCheck,
  pagesTotalCount = 0,
  currPage = 1,
  data,
  checkedRows,
  columnsTotalStructure,
  draggableColumns,
  filterColumns,
  perColumnListForFilters,
  filterDataForRequest,
  isLoadingFilters,
  filtersTypes,
  handleChangePagePerFilterField,
  getColumnName,
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
}: IActionsHeader<T>) => {
  return (
    <div
      className='G-table-actions-header'
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {multipleCheck ? (
        <>
          <CheckRows
            data={data}
            checkedRows={checkedRows}
            handleCheckAll={handleCheckAll}
            unCheck={unCheck}
            checkAllDataFromDb={checkAllDataFromDb}
          />
          <div className='G-flex' style={{ marginRight: '27px' }}>
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
          columnsTotalStructure={columnsTotalStructure}
          setColumnTotalStructures={setColumnTotalStructures}
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
          getColumnName={getColumnName}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
        />
      </div>
    </div>
  )
}

export default ActionsHeader
