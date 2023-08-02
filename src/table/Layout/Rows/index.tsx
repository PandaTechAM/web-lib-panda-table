import React from 'react'
import { IColumnConfig, IColumnConfigStructure, ILinksList, IrowActions } from '../../../Models/table.models'
import FreezedRows from './FreezedTop'
import MainRows from './Main'
import { forwardRef } from 'react'

interface IRows<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  rightFreezeConfig?: IColumnConfig<T>[]
  unFreezedRows: T[]
  freezedRows: T[]
  rowActions?: IrowActions[]
  links?: ILinksList[]
  checkedLink?: T
  tableWidth?: number
  columnMinWidth?: number
  FreezeIcon?: any
  multipleCheck?: boolean
  isStickyFirstColumn?: boolean
  isHoveredRow?: boolean
  freezedRightSideVisible?: boolean
  freezedLeftSideColor?: string
  freezedRightSideColor?: string
  freezedRightSide?: string
  RightSideIcon?: React.MemoExoticComponent<(props: React.SVGProps<SVGSVGElement>) => JSX.Element>
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  headerHeight?: number
  rowsFreezeAction?: boolean
  selectedType: string
  getRow?: (option: any) => void
  RightSideSelfAction?: (option: number | string) => void
  freezeRow(e: any, option: number): void
  unFreezeRow(e: any, option: number): void
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
      rightFreezeConfig,
      multipleCheck,
      columnMinWidth,
      rowActions,
      FreezeIcon,
      links,
      checkedLink,
      unFreezedRows,
      isHoveredRow,
      freezedLeftSideColor,
      freezedRightSideColor,
      freezedRightSideVisible,
      freezedRightSide,
      isStickyFirstColumn,
      RightSideIcon,
      leftFreezedColumnWidth,
      rightFreezedColumnWidth,
      headerHeight,
      rowsFreezeAction,
      selectedType,
      getRow,
      RightSideSelfAction,
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
        {freezedRows ? (
          <FreezedRows
            freezedRows={freezedRows}
            columnsConfigStructure={columnsConfigStructure}
            rightFreezeConfig={rightFreezeConfig}
            multipleCheck={multipleCheck}
            columnMinWidth={columnMinWidth}
            rowActions={rowActions}
            FreezeIcon={FreezeIcon}
            links={links}
            checkedLink={checkedLink}
            freezedLeftSideColor={freezedLeftSideColor}
            freezedRightSideColor={freezedRightSideColor}
            freezedRightSideVisible={freezedRightSideVisible}
            freezedRightSide={freezedRightSide}
            isStickyFirstColumn={isStickyFirstColumn}
            RightSideIcon={RightSideIcon}
            leftFreezedColumnWidth={leftFreezedColumnWidth}
            rightFreezedColumnWidth={rightFreezedColumnWidth}
            headerHeight={headerHeight}
            selectedType={selectedType}
            getRow={getRow}
            RightSideSelfAction={RightSideSelfAction}
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
          rightFreezeConfig={rightFreezeConfig}
          freezedRows={freezedRows}
          columnsConfigStructure={columnsConfigStructure}
          multipleCheck={multipleCheck}
          columnMinWidth={columnMinWidth}
          rowActions={rowActions}
          FreezeIcon={FreezeIcon}
          links={links}
          checkedLink={checkedLink}
          isHoveredRow={isHoveredRow}
          freezedLeftSideColor={freezedLeftSideColor}
          freezedRightSideColor={freezedRightSideColor}
          freezedRightSideVisible={freezedRightSideVisible}
          freezedRightSide={freezedRightSide}
          isStickyFirstColumn={isStickyFirstColumn}
          RightSideIcon={RightSideIcon}
          leftFreezedColumnWidth={leftFreezedColumnWidth}
          rightFreezedColumnWidth={rightFreezedColumnWidth}
          rowsFreezeAction={rowsFreezeAction}
          selectedType={selectedType}
          getRow={getRow}
          RightSideSelfAction={RightSideSelfAction}
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
