import React, { useEffect, useRef, useState } from 'react'
import { IColumnConfig, IColumnConfigStructure, ILinksList, IrowActions } from '../../../../Models/table.models'
import { forwardRef } from 'react'
import FreezedRightColumns from '../FreezedRigthColumns'
import Checkbox from '../../../../components/checkbox'
import FreezedLeftColumns from '../FreezedLeftColumns'
import { CheckedItems, StructureConfig } from '../../../../Models/table.enum'
import HoveredRow from '../HoveredRow'
interface IMainRows<T extends Object> {
  unFreezedRows: T[]
  freezedRows: T[]
  rightFreezeConfig?: IColumnConfig<T>[]
  columnsConfigStructure: IColumnConfigStructure<T>
  multipleCheck?: boolean
  columnMinWidth?: number
  rowActions?: IrowActions[]
  FreezeIcon?: React.MemoExoticComponent<(props: React.SVGProps<SVGSVGElement>) => JSX.Element>
  isStickyFirstColumn?: boolean
  tableWidth?: number
  links?: ILinksList[]
  checkedLink?: T
  isHoveredRow?: boolean
  freezedLeftSideColor?: string
  freezedRightSideColor?: string
  freezedRightSide?: string
  freezedRightSideVisible?: boolean
  RightSideIcon?: React.MemoExoticComponent<(props: React.SVGProps<SVGSVGElement>) => JSX.Element>
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  rowsFreezeAction?: boolean
  selectedType: string
  getRow?(options: any): void
  RightSideSelfAction?: (option: number | string) => void
  freezeRow(e: any, option: number): void
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
      rightFreezeConfig,
      multipleCheck,
      columnMinWidth,
      rowActions,
      FreezeIcon,
      links,
      checkedLink,
      isHoveredRow,
      freezedLeftSideColor,
      freezedRightSideColor,
      freezedRightSide,
      freezedRightSideVisible,
      isStickyFirstColumn,
      RightSideIcon,
      leftFreezedColumnWidth,
      rightFreezedColumnWidth,
      rowsFreezeAction,
      selectedType,
      getRow,
      RightSideSelfAction,
      freezeRow,
      getRowForDropdown,
      isCheckedRows,
      handleCheck,
    },
    ref,
  ) => {
    const myRef = useRef<any>(null)
    const [width, setWidth] = useState<number>(0)
    function pickBackGroundColor(option: number) {
      if (option % 2 == 0) {
        return 'G-dark-background'
      }
      return 'G-light-background'
    }

    useEffect(() => {
      if (myRef?.current) {
        setWidth(myRef?.current.offsetWidth)
      }
    }, [])
    return (
      <>
        {unFreezedRows.map((item: any, index: number) => {
          return (
            <div key={item.id} className='G-flex G-row' onClick={() => getRow?.(item)}>
              <ul
                className='G-rows-icons'
                style={{
                  left: `calc(100% - ${(width || 60) + 50}px)`,
                }}
              >
                {isHoveredRow ? (
                  <HoveredRow
                    rowActions={rowActions}
                    item={item}
                    index={index}
                    freezedRows={freezedRows}
                    FreezeIcon={FreezeIcon}
                    links={links}
                    rowsFreezeAction={rowsFreezeAction}
                    freezeRow={freezeRow}
                  />
                ) : null}
              </ul>
              {/* FREEZED LEFT */}
              <ul
                className={pickBackGroundColor(index)}
                style={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 20,
                  boxShadow: '10px 1px 9px -2px  rgba(0,0,0,0.02)',
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
                        isDisable={selectedType === CheckedItems.SELECTED_ALL}
                        isCheck={isCheckedRows(item.id)}
                        onClick={() => handleCheck(item.id)}
                        customClass={'G-checkbox'}
                      />
                    ) : (
                      <p>{freezedRows.length + index + 1}</p>
                    )}
                  </li>
                ) : null}
                {columnsConfigStructure[StructureConfig.Freezed].items.length ? (
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
                  cursor: 'pointer',
                }}
                className={pickBackGroundColor(index)}
              >
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
                        isDisable={selectedType === CheckedItems.SELECTED_ALL}
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
                {columnsConfigStructure[StructureConfig.Main].items.map((column: IColumnConfig<any>) => {
                  return (
                    column.isVisible && (
                      <li
                        key={column.id}
                        style={{
                          ...column.customStyle,
                          minWidth: columnMinWidth + 'px',
                        }}
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
                  ref={myRef}
                  style={{
                    position: 'sticky',
                    zIndex: 12,
                    right: 0,
                    boxShadow: '-6px 0px 8px 0px rgba(0,0,0,0.02)',
                  }}
                  className={pickBackGroundColor(index)}
                >
                  {rightFreezeConfig ? (
                    rightFreezeConfig.map((elem, i) => {
                      if (i < 4)
                        return (
                          <li
                            key={elem.id}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `${elem.width}px`,
                              minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `${elem.width}px`,
                              backgroundColor: freezedRightSideColor && freezedRightSideColor,
                            }}
                          >
                            {elem.setRow(item)}
                          </li>
                        )
                    })
                  ) : (
                    <li
                      style={{
                        maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `60px`,
                        minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `60px`,
                        backgroundColor: freezedRightSideColor && freezedRightSideColor,
                      }}
                    >
                      <FreezedRightColumns
                        item={item}
                        checkedLink={checkedLink}
                        links={links}
                        freezedRightSide={freezedRightSide}
                        RightSideIcon={RightSideIcon}
                        RightSideSelfAction={RightSideSelfAction}
                        getRowForDropdown={getRowForDropdown}
                      />
                    </li>
                  )}
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
