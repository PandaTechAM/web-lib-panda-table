import React from 'react'
import { IProps } from '../Models/table.models'
import MainHeader from './MainHeader'
import Header from './Layout/Header'
import Rows from './Layout/Rows'
import useTable from './useTable'
import Footer from './Layout/Footer'
import './index.scss'
import '../index.scss'
import '../assets/style/index.scss'
import MainFooter from './MainFooter'

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
  rowsFreezeAction,
  aggregates,
  handleChangePagePerFilterField,
  getRow,
  RightSideSelfAction,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleEdit,
  handleDelete,
  getPageRowsCountAndCurrentPage,
  storeStructure,
  getFilteredData,
  getFilteredDataForTable,
  getDownloadType,
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
        <MainHeader
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
          draggableColumns={draggableColumns}
          filterColumns={filterColumns}
          filterDataForRequest={filterDataForRequest}
          isLoadingFilters={isLoadingFilters}
          filtersTypes={filtersTypes}
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
          getDownloadType={getDownloadType}
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
              rowsFreezeAction={rowsFreezeAction}
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

          {aggregates ? (
            <div className='G-total-footer' style={{ minHeight: footerHeight ? `${footerHeight}px` : 48 }}>
              <Footer
                rightFreezeConfig={rightFreezeConfig}
                columnsHeaderStructure={columnsHeaderStructure}
                columnsConfigStructure={columnsConfigStructure}
                columnMinWidth={columnMinWidth}
                footerColor={footerColor}
                freezedRightSideVisible={freezedRightSideVisible}
                isStickyFirstColumn={isStickyFirstColumn}
                leftFreezedColumnWidth={leftFreezedColumnWidth}
                rightFreezedColumnWidth={rightFreezedColumnWidth}
                listForDropdown={listForDropdown}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className='G-justify-end G-align-center' style={{ padding: 10 }}>
        {currentPage && pagesTotalCount && (
          <MainFooter
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
