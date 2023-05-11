import React from 'react'
import { IColumnConfigStructure, ILinksList, IrowActions } from '../../Models/table.models'
import FreezedRows from './FreezedTop'
import MainRows from './Main'
import { forwardRef } from 'react'

interface IRows<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  unFreezedRows: T[]
  freezedRows: T[]
  rowActions?: IrowActions[]
  links?: ILinksList[]
  checkedLink?: T
  tableWidth?: number
  columnMinWidth?: number
  freezeIcon?: string
  multipleCheck?: boolean
  isStickyFirstColumn?: boolean
  isHoveredRow?: boolean
  freezedRightSideVisible?: boolean
  freezedLeftSideColor?: string
  freezedRightSideColor?: string
  freezedRightSide?: string
  leftSideIcon?: string
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  headerHeight?: number
  LeftSideSelfAction?: (option: number | string) => void
  freezeRow(option: number): void
  unFreezeRow(option: number): void
  handleCheck(option: number): void
  dragDropFreezeRow(option: T[]): void
  isCheckedRows(option: number): boolean
  isCheckedRows(option: number): boolean
  getRowForDropdown(option: number): void
}
const Rows = forwardRef<any, IRows<any>>(
  (
    {
      freezedRows,
      columnsConfigStructure,
      multipleCheck,
      columnMinWidth,
      rowActions,
      freezeIcon,
      links,
      checkedLink,
      unFreezedRows,
      isHoveredRow,
      freezedLeftSideColor,
      freezedRightSideColor,
      freezedRightSideVisible,
      freezedRightSide,
      isStickyFirstColumn,
      leftSideIcon,
      leftFreezedColumnWidth,
      rightFreezedColumnWidth,
      headerHeight,
      LeftSideSelfAction,
      freezeRow,
      getRowForDropdown,
      isCheckedRows,
      handleCheck,
      dragDropFreezeRow,
      unFreezeRow,
    },
    ref,
  ) => {
    return (
      <>
        {freezedRows && freezeIcon ? (
          <FreezedRows
            freezedRows={freezedRows}
            columnsConfigStructure={columnsConfigStructure}
            multipleCheck={multipleCheck}
            columnMinWidth={columnMinWidth}
            rowActions={rowActions}
            freezeIcon={freezeIcon}
            links={links}
            checkedLink={checkedLink}
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
            getRowForDropdown={getRowForDropdown}
            dragDropFreezeRow={dragDropFreezeRow}
            unFreezeRow={unFreezeRow}
            isCheckedRows={isCheckedRows}
            handleCheck={handleCheck}
          />
        ) : null}
        <MainRows
          ref={ref}
          unFreezedRows={unFreezedRows}
          freezedRows={freezedRows}
          columnsConfigStructure={columnsConfigStructure}
          multipleCheck={multipleCheck}
          columnMinWidth={columnMinWidth}
          rowActions={rowActions}
          freezeIcon={freezeIcon}
          links={links}
          checkedLink={checkedLink}
          isHoveredRow={isHoveredRow}
          freezedLeftSideColor={freezedLeftSideColor}
          freezedRightSideColor={freezedRightSideColor}
          freezedRightSideVisible={freezedRightSideVisible}
          freezedRightSide={freezedRightSide}
          isStickyFirstColumn={isStickyFirstColumn}
          leftSideIcon={leftSideIcon}
          leftFreezedColumnWidth={leftFreezedColumnWidth}
          rightFreezedColumnWidth={rightFreezedColumnWidth}
          LeftSideSelfAction={LeftSideSelfAction}
          freezeRow={freezeRow}
          getRowForDropdown={getRowForDropdown}
          isCheckedRows={isCheckedRows}
          handleCheck={handleCheck}
        />
      </>
    )
  },
)

export default Rows
