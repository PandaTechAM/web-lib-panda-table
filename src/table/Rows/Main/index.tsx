import React from 'react'
import { IColumnConfig, IColumnConfigStructure, ILinksList, IrowActions } from '../../../Models/table.models'
import { forwardRef } from 'react'
import FreezedRightColumns from '../FreezedRigthColumns'
import Checkbox from '../../components/checkbox'
import FreezedLeftColumns from '../FreezedLeftColumns'
import { StructureConfig } from '../../../Models/table.enum'
import HoveredRow from '../HoveredRow'
interface IMainRows<T extends Object> {
  unFreezedRows: T[]
  freezedRows: T[]
  columnsConfigStructure: IColumnConfigStructure<T>
  multipleCheck?: boolean
  columnMinWidth?: number
  rowActions?: IrowActions[]
  freezeIcon?: string
  isStickyFirstColumn?: boolean
  tableWidth?: number
  links?: ILinksList[]
  checkedLink?: T
  isHoveredRow?: boolean
  freezedLeftSideColor?: string
  freezedRightSideColor?: string
  freezedRightSide?: string
  freezedRightSideVisible?: boolean
  leftSideIcon?: string
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  LeftSideSelfAction?: (option: number | string) => void
  freezeRow(option: number): void
  getRowForDropdown(option: number): void
  isCheckedRows(option: number): boolean
  handleCheck(option: number): void
}
const MainRows = forwardRef<any, IMainRows<any>>(
  (
    {
      unFreezedRows,
      freezedRows,
      columnsConfigStructure,
      multipleCheck,
      columnMinWidth,
      rowActions,
      freezeIcon,
      links,
      checkedLink,
      isHoveredRow,
      freezedLeftSideColor,
      freezedRightSideColor,
      freezedRightSide,
      freezedRightSideVisible,
      isStickyFirstColumn,
      leftSideIcon,
      leftFreezedColumnWidth,
      rightFreezedColumnWidth,
      LeftSideSelfAction,
      freezeRow,
      getRowForDropdown,
      isCheckedRows,
      handleCheck,
    },
    ref,
  ) => {
    return (
      <>
        {unFreezedRows.map((item, index) => {
          return (
            <div key={item.id} style={{ display: 'flex' }}>
              {/* FREEZED LEFT */}
              <ul
                style={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 20,
                  boxShadow: '10px 1px 9px -2px  rgba(0,0,0,0.08)',
                }}
              >
                {isStickyFirstColumn ? (
                  <li
                    style={{
                      maxWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
                      minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
                      backgroundColor: freezedLeftSideColor && freezedLeftSideColor,
                    }}
                  >
                    {multipleCheck ? (
                      <Checkbox
                        isCheck={isCheckedRows(item.id)}
                        onClick={() => handleCheck(item.id)}
                        customClass='G-checkbox'
                      />
                    ) : (
                      <p>{freezedRows.length + index + 1}</p>
                    )}
                  </li>
                ) : null}
                {columnsConfigStructure[StructureConfig.BB33].items.length ? (
                  <FreezedLeftColumns
                    ref={ref}
                    columnsConfigStructure={columnsConfigStructure}
                    columnMinWidth={columnMinWidth}
                    item={item}
                    freezedLeftSideColor={freezedLeftSideColor}
                  />
                ) : null}
              </ul>
              {/* MAIN */}
              <ul
                style={{
                  flex: 1,
                }}
              >
                {isHoveredRow ? (
                  <HoveredRow
                    rowActions={rowActions}
                    item={item}
                    index={index}
                    freezedRows={freezedRows}
                    freezeIcon={freezeIcon}
                    freezeRow={freezeRow}
                  />
                ) : null}
                {isStickyFirstColumn ? null : (
                  <li
                    style={{
                      maxWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
                      minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
                      backgroundColor: freezedLeftSideColor && freezedLeftSideColor,
                    }}
                  >
                    {multipleCheck ? (
                      <Checkbox
                        isCheck={isCheckedRows(item.id)}
                        onClick={() => handleCheck(item.id)}
                        customClass='G-checkbox'
                      />
                    ) : (
                      <p>{freezedRows.length + index + 1}</p>
                    )}
                  </li>
                )}

                {/* Columns */}
                {columnsConfigStructure[StructureConfig.BB55].items.map((column: IColumnConfig<any>, i: number) => {
                  return (
                    column.isVisible && (
                      <li
                        style={{
                          ...column.customStyle,
                          minWidth: columnMinWidth + 'px',
                        }}
                        key={column.id}
                      >
                        {column.setRow(item)}
                      </li>
                    )
                  )
                })}
              </ul>
              {/* FREEZED RIGHT */}
              {freezedRightSideVisible ? (
                <ul
                  style={{
                    position: 'sticky',
                    zIndex: 25,
                    right: 0,
                    boxShadow: '-6px 0px 8px 0px rgba(0,0,0,0.08)',
                  }}
                >
                  <li
                    style={{
                      maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : '60px',
                      minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : '60px',
                      backgroundColor: freezedRightSideColor && freezedRightSideColor,
                    }}
                  >
                    <FreezedRightColumns
                      item={item}
                      checkedLink={checkedLink}
                      links={links}
                      freezedRightSide={freezedRightSide}
                      leftSideIcon={leftSideIcon}
                      LeftSideSelfAction={LeftSideSelfAction}
                      getRowForDropdown={getRowForDropdown}
                    />
                  </li>
                </ul>
              ) : null}
            </div>
          )
        })}
      </>
    )
  },
)

export default MainRows
