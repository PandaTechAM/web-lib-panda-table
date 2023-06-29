import React, { useEffect, useState } from 'react'
import ColumnsCustomizer from './ColumnsCustomizer'
import Pagination from '../components/pagination'
import Select from '../components/select/select'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  IComparisonType,
  IPageSizes,
  ISelectPage,
  ItemFields,
} from '../../Models/table.models'
import CheckRows from './CheckRows'
import DeleteSvgIcon from '../../svgIcons/DeleteSvgIcon'
import EditSvgIcon from '../../svgIcons/EditSvgIcon'
import DropdownSvgIcon from '../../svgIcons/DropdownSvgIcon'
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
  comporisionTypes?: IComparisonType[]
  perColumnListForFilters?: string[]
  filterDataForRequest?: ItemFields[]
  isLoadingFilters?: boolean
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
  comporisionTypes,
  perColumnListForFilters,
  filterDataForRequest,
  isLoadingFilters,
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
  const [isOpenList, setOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(currPage)
  const [selectedPage, setSelectedPage] = useState<ISelectPage>({ id: 1 })
  const [totalCount, setTotalCount] = useState<number>(pagesTotalCount)

  const setIsOpenList = () => {
    setOpen((prev) => !prev)
  }

  const handleSelectDataSize = (options: IPageSizes) => {
    setSelectedPage({ id: options.id })
    setCurrentPage(1)
    if (pageSizeStructure && selectedPage && getPageRowsCountAndCurrentPage) {
      getPageRowsCountAndCurrentPage(1, pageSizeStructure[options.id - 1].count)
    }
  }
  const handleChangePage = (option: number) => {
    setCurrentPage(option)
    if (pageSizeStructure && selectedPage && getPageRowsCountAndCurrentPage) {
      getPageRowsCountAndCurrentPage(option, pageSizeStructure[selectedPage.id - 1].count)
    }
  }

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
            {checkedRows.length !== 1 ? null : (
              <div
                className='G-flex G-edit'
                style={{ marginRight: '20px' }}
                onClick={() => handleEdit && handleEdit(checkedRows[0])}
              >
                <div>
                  <EditSvgIcon />
                </div>
                <span>Edit</span>
              </div>
            )}
            {checkedRows.length ? (
              <div className='G-flex G-delete' onClick={() => handleDelete && handleDelete(checkedRows)}>
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
          comporisionTypes={comporisionTypes}
          perColumnListForFilters={perColumnListForFilters}
          filterDataForRequest={filterDataForRequest}
          isLoadingFilters={isLoadingFilters}
          getFilter={getFilteredData}
          getFilteredDataForTable={getFilteredDataForTable}
          getColumnName={getColumnName}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
        />
      </div>

      {/* {handleChangePage && currentPage && totalCount && (
        <>
          {pageSizeStructure && selectedPage && (
            <div
              className="G-justify-between G-align-center"
              style={{ width: "138px" }}
            >
              <div>Show</div>
              <div
                style={{
                  fontSize: "16px",
                }}
              ></div>
              <Select
                optionsList={pageSizeStructure}
                value={selectedPage.id}
                selectedNameKey={"count"}
                selectedValueKey={"id"}
                onChange={handleSelectDataSize}
                customClass="G-Select-container"
                isOpenList={isOpenList}
                setIsOpenList={setIsOpenList}
                ButtonSvg={DropdownSvgIcon}
              />
              <div>Rows</div>
            </div>
          )}
          <Pagination
            onPageChange={handleChangePage}
            totalCount={totalCount}
            currentPage={currentPage}
            pageSizeStructure={
              pageSizeStructure && selectedPage
                ? pageSizeStructure[selectedPage.id - 1].count
                : 15
            }
            className={"G-pagionation"}
          />
        </>
      )} */}
    </div>
  )
}

export default ActionsHeader
