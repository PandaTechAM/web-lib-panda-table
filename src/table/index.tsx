import React from 'react'
import { IProps } from '../Models/table.models'
import ActionsHeader from './ActionsHeader'
import Header from './Header'
import Rows from './Rows'
import useTable from './useTable'
import Footer from './Footer'
import './index.scss'
import '../index.scss'
import '../assets/style/index.scss'
import FooterPagination from './FooterPagination'

function Table<T extends Object>({
  data = [],
  allDataFromDb,
  pageSizeStructure,
  pagesTotalCount,
  currentPage,
  selectedPageCount,
  multipleCheck,
  isStickyFirstColumn,
  columnMinWidth,
  columnsConfigStructure = {} as any,
  columnsHeaderStructure = {} as any,
  rightFreezeConfig,
  columnsTotalStructure,
  rowActions,
  FreezeIcon,
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
  RightSideIcon,
  footerHeight,
  leftFreezedColumnWidth,
  rightFreezedColumnWidth,
  headerHeight,
  perColumnListForFilters,
  filterDataForRequest,
  isLoadingFilters,
  filterColumns,
  filtersTypes,
  handleChangePagePerFilterField,
  getColumnName,
  getRow,
  RightSideSelfAction,
  setColumnTotalStructures,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleEdit,
  handleDelete,
  getPageRowsCountAndCurrentPage,
  storeStructure,
  setTotalType,
  getFilteredData,
  getFilteredDataForTable,
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
  } = useTable(data, allDataFromDb, freezedRightSide, RightSideSelfAction)

  return (
    <div>
      {(pageSizeStructure && pagesTotalCount) || multipleCheck || draggableColumns ? (
        <ActionsHeader
          columnsConfigStructure={columnsConfigStructure}
          columnsHeaderStructure={columnsHeaderStructure}
          pageSizeStructure={pageSizeStructure}
          perColumnListForFilters={perColumnListForFilters}
          currPage={currentPage}
          selectedPageCount={selectedPageCount}
          pagesTotalCount={pagesTotalCount}
          multipleCheck={multipleCheck}
          data={data}
          checkedRows={checkedRows}
          columnsTotalStructure={columnsTotalStructure}
          draggableColumns={draggableColumns}
          filterColumns={filterColumns}
          filterDataForRequest={filterDataForRequest}
          isLoadingFilters={isLoadingFilters}
          filtersTypes={filtersTypes}
          getColumnName={getColumnName}
          setColumnTotalStructures={setColumnTotalStructures}
          handleCheckAll={handleCheckAll}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setColumnsConfigStructure={setColumnsConfigStructure}
          setColumnHeaderStructure={setColumnHeaderStructure}
          storeStructure={storeStructure}
          unCheck={unCheck}
          checkAllDataFromDb={checkAllDataFromDb}
          getPageRowsCountAndCurrentPage={getPageRowsCountAndCurrentPage}
          getFilteredData={getFilteredData}
          getFilteredDataForTable={getFilteredDataForTable}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
        />
      ) : null}

      <div className='G-data-table'>
        <div className='G-data-scroll'>
          <div className='G-header' style={{ minHeight: headerHeight ? `${headerHeight}px` : 48 }}>
            <Header
              columnsConfigStructure={columnsConfigStructure}
              columnsHeaderStructure={columnsHeaderStructure}
              rightFreezeConfig={rightFreezeConfig}
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
              rightFreezeConfig={rightFreezeConfig}
              columnsConfigStructure={columnsConfigStructure}
              multipleCheck={multipleCheck}
              columnMinWidth={columnMinWidth}
              rowActions={rowActions}
              FreezeIcon={FreezeIcon}
              links={links}
              checkedLink={checkedLink}
              unFreezedRows={unFreezedRows}
              isHoveredRow={isHoveredRow}
              freezedLeftSideColor={freezedLeftSideColor}
              freezedRightSideColor={freezedRightSideColor}
              freezedRightSideVisible={freezedRightSideVisible}
              freezedRightSide={freezedRightSide}
              isStickyFirstColumn={isStickyFirstColumn}
              RightSideIcon={RightSideIcon}
              leftFreezedColumnWidth={leftFreezedColumnWidth}
              rightFreezedColumnWidth={rightFreezedColumnWidth}
              headerHeight={headerHeight}
              getRow={getRow}
              RightSideSelfAction={RightSideSelfAction}
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
                rightFreezeConfig={rightFreezeConfig}
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
      <div className='G-justify-end G-align-center' style={{ padding: 10 }}>
        {currentPage && pagesTotalCount && (
          <FooterPagination
            pageSizeStructure={pageSizeStructure}
            currPage={currentPage}
            pagesTotalCount={pagesTotalCount}
            getPageRowsCountAndCurrentPage={getPageRowsCountAndCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default Table
