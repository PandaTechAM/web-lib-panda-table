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
import DeleteSvgIcon from '../../svgIcons/DeleteSvgIcon'
import EditSvgIcon from '../../svgIcons/EditSvgIcon'
import { downloadFile } from '../../utils'

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
  const exportToCsv = (e: any) => {
    e.preventDefault()

    // Headers for each column
    let headers = ['Id,Name,Surname,Age']

    // Convert users data to a csv
    let usersCsv = data.reduce((acc, user) => {
      const { id, easywalletAgentId, agentCreationDate, agentName } = user as any
      //@ts-ignore
      acc.push([id, easywalletAgentId, agentCreationDate, agentName].join(','))

      return acc
    }, [])

    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'users.csv',
      fileType: 'text/csv',
    })
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

      {handleChangePage && currentPage && totalCount && (
        <>
          {pageSize && selectedPage && (
            <div className='G-justify-between G-align-center' style={{ width: '138px' }}>
              <div>Show</div>
              <div
                style={{
                  fontSize: '16px',
                }}
              ></div>
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
