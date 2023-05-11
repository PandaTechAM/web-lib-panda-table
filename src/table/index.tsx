import React from 'react'
import { IProps } from '../Models/table.models'
import ActionsHeader from './ActionsHeader'
import Header from './Header'
import Rows from './Rows'
import useTable from './useTable'
import Footer from './Footer'
import './style.scss'
import '../index.scss'
import '../assets/style/index.scss'

function Table<T extends Object>({
  data = [],
  allDataFromDb,
  pageSize,
  currentPage,
  selectedPage,
  totalCount,
  multipleCheck,
  isStickyFirstColumn,
  columnMinWidth,
  columnsConfigStructure = {} as any,
  columnsHeaderStructure = {} as any,
  columnsTotalStructure,
  rowActions,
  freezeIcon,
  isHoveredRow,
  links,
  listForDropdown,
  headerColor,
  footerColor,
  freezedLeftSideColor,
  freezedRightSideColor,
  draggableColumns,
  freezedRightSideVisible,
  freezedRightSide,
  leftSideIcon,
  footerHeight,
  leftFreezedColumnWidth,
  rightFreezedColumnWidth,
  headerHeight,
  LeftSideSelfAction,
  setColumnTotalStructures,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleEdit,
  handleDelete,
  handleSelectDataSize,
  handleChangePage,
  storeStructure,
  setTotalType,
}: IProps<T>) {
  const {
    freezedRows,
    unFreezedRows,
    checkedRows,
    checkedLink,
    freezeRow,
    unFreezeRow,
    dragDropFreezeRow,
    getRowForDropdown,
    handleCheckAll,
    handleCheck,
    isCheckedRows,
    unCheck,
    checkAllDataFromDb,
  } = useTable(data, allDataFromDb, LeftSideSelfAction)

  return (
    <div>
      {(pageSize && currentPage && selectedPage && totalCount) || multipleCheck || draggableColumns ? (
        <ActionsHeader
          columnsConfigStructure={columnsConfigStructure}
          columnsHeaderStructure={columnsHeaderStructure}
          pageSize={pageSize}
          selectedPage={selectedPage}
          currentPage={currentPage}
          totalCount={totalCount}
          multipleCheck={multipleCheck}
          data={data}
          checkedRows={checkedRows}
          columnsTotalStructure={columnsTotalStructure}
          draggableColumns={draggableColumns}
          setColumnTotalStructures={setColumnTotalStructures}
          handleCheckAll={handleCheckAll}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setColumnsConfigStructure={setColumnsConfigStructure}
          setColumnHeaderStructure={setColumnHeaderStructure}
          handleSelectDataSize={handleSelectDataSize}
          handleChangePage={handleChangePage}
          storeStructure={storeStructure}
          unCheck={unCheck}
          checkAllDataFromDb={checkAllDataFromDb}
        />
      ) : null}

      <div className='G-data-table'>
        <div className='G-data-scroll'>
          <div className='G-header' style={{ minHeight: headerHeight ? `${headerHeight}px` : 48 }}>
            <Header
              columnsConfigStructure={columnsConfigStructure}
              columnsHeaderStructure={columnsHeaderStructure}
              headerColor={headerColor}
              multipleCheck={multipleCheck}
              isStickyFirstColumn={isStickyFirstColumn}
              columnMinWidth={columnMinWidth}
              freezedRightSideVisible={freezedRightSideVisible}
              leftFreezedColumnWidth={leftFreezedColumnWidth}
              rightFreezedColumnWidth={rightFreezedColumnWidth}
            />
          </div>

          <div className='G-data-table-body'>
            <Rows
              freezedRows={freezedRows}
              columnsConfigStructure={columnsConfigStructure}
              multipleCheck={multipleCheck}
              columnMinWidth={columnMinWidth}
              rowActions={rowActions}
              freezeIcon={freezeIcon}
              links={links}
              checkedLink={checkedLink}
              unFreezedRows={unFreezedRows}
              isHoveredRow={isHoveredRow}
              freezedLeftSideColor={freezedLeftSideColor}
              freezedRightSideColor={freezedRightSideColor}
              freezedRightSideVisible={freezedRightSideVisible}
              freezedRightSide={freezedRightSide}
              isStickyFirstColumn={isStickyFirstColumn}
              leftSideIcon={leftSideIcon}
              leftFreezedColumnWidth={leftFreezedColumnWidth}
              rightFreezedColumnWidth={rightFreezedColumnWidth}
              headerHeight={headerHeight}
              LeftSideSelfAction={LeftSideSelfAction}
              freezeRow={freezeRow}
              getRowForDropdown={getRowForDropdown}
              isCheckedRows={isCheckedRows}
              handleCheck={handleCheck}
              dragDropFreezeRow={dragDropFreezeRow}
              unFreezeRow={unFreezeRow}
            />
          </div>

          {columnsTotalStructure ? (
            <div className='G-total-footer' style={{ minHeight: footerHeight ? `${footerHeight}px` : 48 }}>
              <Footer
                columnsConfigStructure={columnsConfigStructure}
                columnsTotalStructure={columnsTotalStructure}
                columnMinWidth={columnMinWidth}
                footerColor={footerColor}
                freezedRightSideVisible={freezedRightSideVisible}
                isStickyFirstColumn={isStickyFirstColumn}
                leftFreezedColumnWidth={leftFreezedColumnWidth}
                rightFreezedColumnWidth={rightFreezedColumnWidth}
                listForDropdown={listForDropdown}
                setTotalType={setTotalType}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Table
