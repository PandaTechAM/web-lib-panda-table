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
  EmptyDataIcon,
  perColumnTotalCount,
  selectedPageSizeId,
  hasFilters,
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
  customHeaderAction,
}: IProps<T>) {
  const {
    freezedRows,
    unFreezedRows,
    checkedRows,
    checkedLink,
    selectedType,
    freezeRow,
    unFreezeRow,
    dragDropFreezeRow,
    getRowForDropdown,
    handleCheckAll,
    handleCheck,
    isCheckedRows,
    unCheck,
    checkAllDataFromDb,
  } = useTable(data, freezedRightSide, RightSideSelfAction)

  return (
    <div>
      {multipleCheck || draggableColumns || hasFilters || getDownloadType ? (
        <MainHeader
          columnsConfigStructure={columnsConfigStructure}
          columnsHeaderStructure={columnsHeaderStructure}
          perColumnListForFilters={perColumnListForFilters}
          selectedPageCount={selectedPageCount}
          multipleCheck={multipleCheck}
          data={data}
          checkedRows={checkedRows}
          draggableColumns={draggableColumns}
          filterColumns={filterColumns}
          filterDataForRequest={filterDataForRequest}
          isLoadingFilters={isLoadingFilters}
          filtersTypes={filtersTypes}
          selectedType={selectedType}
          perColumnTotalCount={perColumnTotalCount}
          hasFilters={hasFilters}
          handleCheckAll={handleCheckAll}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setColumnsConfigStructure={setColumnsConfigStructure}
          setColumnHeaderStructure={setColumnHeaderStructure}
          storeStructure={storeStructure}
          unCheck={unCheck}
          checkAllDataFromDb={checkAllDataFromDb}
          getFilteredData={getFilteredData}
          getFilteredDataForTable={getFilteredDataForTable}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
          getDownloadType={getDownloadType}
          customHeaderAction={customHeaderAction}
        />
      ) : null}

      <div className='G-data-table G-data-scroll'>
        {data.length ? (
          <>
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
                selectedType={selectedType}
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
                />
              </div>
            ) : null}
          </>
        ) : (
          <div className='G-center'>
            <EmptyDataIcon />
          </div>
        )}
      </div>
      <div className='G-justify-end G-align-center' style={{ padding: 10 }}>
        {currentPage && pagesTotalCount && selectedPageSizeId ? (
          <MainFooter
            pageSizeStructure={pageSizeStructure}
            currPage={currentPage}
            pagesTotalCount={pagesTotalCount}
            selectedPageSizeId={selectedPageSizeId}
            getPageRowsCountAndCurrentPage={getPageRowsCountAndCurrentPage}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Table
