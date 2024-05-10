import React, { memo, useRef } from 'react'
import { IProps } from '../Models/table.models'
import '../assets/style/index.scss'
import Footer from './Layout/Footer'
import Header from './Layout/Header'
import Rows from './Layout/Rows'
import MainFooter from './MainFooter'
import MainHeader from './MainHeader'
import './index.scss'
import useTable from './useTable'

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
  emptyDataIcon,
  perColumnTotalCount,
  selectedPageSizeId,
  hasFilters,
  isEnableAggregates,
  aggregates,
  isLoadedData,
  translations,
  hasOrdering,
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
    <div id='table-wrapper'>
      {data.length !== 0 ? null : (
        <img
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '25%',
          }}
          className='G-empty-data-icon'
          src={emptyDataIcon}
          alt='Empty data'
          width={500}
        />
      )}
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

      <div className={`G-data-table G-data-scroll ${!data.length ? 'G-empty-data-wrapper' : ''}`}>
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
              hasOrdering={hasOrdering}
              handleSorting={handleSorting}
            />
          </div>
          {
            data.length ? (
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
                  hasOrdering={hasOrdering}
                  isLoadedData={isLoadedData}
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
            ) : null
            // <div
            //   style={{
            //     position: "sticky",

            //     left: setNoDataImageStyles() + "px",
            //   }}
            //   className="G-empty-data-component"
            // >
            //   {emptyDataIcon ? (
            //     <img
            //       className="G-empty-data-icon"
            //       src={emptyDataIcon}
            //       alt="Empty data"
            //       width={500}
            //     />
            //   ) : (
            //     <div className="G-center">
            //       {translations?.emptyData || "Empty data"}
            //     </div>
            //   )}
            // </div>
          }

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
                hasOrdering={hasOrdering}
                multipleCheck={multipleCheck}
                handleArgChange={handleArgChange}
              />
            </div>
          ) : null}
        </>
      </div>
      <div className='G-justify-end G-align-center' style={{ padding: '30px 10px 10px 10px' }}>
        {data.length && currentPage && pagesTotalCount && selectedPageSizeId ? (
          <MainFooter
            translations={translations}
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

export default memo(Table)
