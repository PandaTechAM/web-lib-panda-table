import React from 'react'
import { IProps } from '../Models/table.models'
import MainHeader from './MainHeader'
import Header from './Layout/Header'
import Rows from './Layout/Rows'
import useTable from './useTable'
import Footer from './Layout/Footer'
import './index.scss'
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
  EmptyDataIcon,
  perColumnTotalCount,
  selectedPageSizeId,
  hasFilters,
  isEnableAggregates,
  aggregates,
  isLoadedData,
  translations,
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
  getFilteredDataWithDebounce,
  getFilteredDataForTable,
  getDownloadType,
  customHeaderAction,
  handleSorting,
  handleArgChange,
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
          translations={translations}
          handleCheckAll={handleCheckAll}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setColumnsConfigStructure={setColumnsConfigStructure}
          setColumnHeaderStructure={setColumnHeaderStructure}
          storeStructure={storeStructure}
          unCheck={unCheck}
          checkAllDataFromDb={checkAllDataFromDb}
          getFilteredData={getFilteredData}
          getFilteredDataWithDebounce={getFilteredDataWithDebounce}
          getFilteredDataForTable={getFilteredDataForTable}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
          getDownloadType={getDownloadType}
          customHeaderAction={customHeaderAction}
        />
      ) : null}

      <div className='G-data-table G-data-scroll'>
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
              handleSorting={handleSorting}
            />
          </div>
          {data.length ? (
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
          ) : (
            <div className='G-empty-data-component'>
              {EmptyDataIcon ? (
                <EmptyDataIcon className='G-empty-data-icon' />
              ) : (
                <div className='G-center' style={{ height: 500 }}>
                  {translations?.emptyData || 'Empty data'}
                </div>
              )}
            </div>
          )}

          {isEnableAggregates ? (
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
                aggregates={aggregates}
                isLoadedData={isLoadedData}
                handleArgChange={handleArgChange}
              />
            </div>
          ) : null}
        </>
      </div>
      <div className='G-justify-end G-align-center' style={{ padding: 10 }}>
        {data.length && currentPage && pagesTotalCount && selectedPageSizeId ? (
          <MainFooter
            translations={translations}
            pageSizeStructure={pageSizeStructure}
            currPage={currentPage}
            pagesTotalCount={pagesTotalCount}
            selectedPageSizeId={selectedPageSizeId}
            unCheck={unCheck}
            getPageRowsCountAndCurrentPage={getPageRowsCountAndCurrentPage}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Table
