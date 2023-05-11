import React from 'react'
import ColumnsCustomizer from './ColumnsCustomizer'
import Pagination from '../components/pagination'
import Select from '../components/select/select'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  IPageSizes,
  ISelectPage,
} from '../../Models/table.models'
import CheckRows from './CheckRows'

interface IActionsHeader<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  pageSize?: IPageSizes[]
  selectedPage?: ISelectPage
  multipleCheck?: boolean
  currentPage?: number
  totalCount?: number
  data: T[]
  checkedRows: T[]
  columnsTotalStructure?: IColumnTotalStructure
  draggableColumns?: boolean
  setColumnTotalStructures?(option: IColumnTotalStructure): void
  handleCheckAll(): void
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void
  handleChangePage?(option: number): void
  handleEdit?(option: T): void
  handleDelete?(option: T[]): void
  handleSelectDataSize?(options: IPageSizes): void
  storeStructure?(): void
  unCheck(): void
  checkAllDataFromDb(): void
}
const ActionsHeader = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  pageSize,
  selectedPage,
  multipleCheck,
  currentPage,
  totalCount,
  data,
  checkedRows,
  columnsTotalStructure,
  draggableColumns,
  unCheck,
  checkAllDataFromDb,
  setColumnTotalStructures,
  handleCheckAll,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleChangePage,
  handleEdit,
  handleDelete,
  handleSelectDataSize,
  storeStructure,
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
            {checkedRows.length !== 1 ? null : (
              <div
                className='G-edit'
                style={{ marginRight: '20px' }}
                onClick={() => handleEdit && handleEdit(checkedRows[0])}
              >
                <i className='icon-material-symbols_edit' />
                <span>Edit</span>
              </div>
            )}
            {checkedRows.length ? (
              <div className='G-delete' onClick={() => handleDelete && handleDelete(checkedRows)}>
                <i className='icon-material-symbols_delete' />
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
      {/*<div className="G-center">*/}
      {/*  <i className="icon-material-symbols_filter-alt" />*/}
      {/*  <div style={{ fontWeight: 600 }}>Filter by</div>*/}
      {/*</div>*/}

      {handleChangePage && currentPage && totalCount && (
        <>
          {pageSize && selectedPage && (
            <div className='G-justify-between G-align-center' style={{ width: '138px' }}>
              <div>Show</div>
              <Select
                optionsList={pageSize}
                value={selectedPage.id}
                selectedNameKey={'count'}
                selectedValueKey={'id'}
                onChange={handleSelectDataSize}
                customClass='G-Select-container'
              />
              <div>Rows</div>
            </div>
          )}
          <Pagination
            onPageChange={handleChangePage}
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize && selectedPage ? pageSize[selectedPage.id - 1].count : 15}
            className={'G-pagionation'}
          />
        </>
      )}
    </div>
  )
}

export default ActionsHeader
