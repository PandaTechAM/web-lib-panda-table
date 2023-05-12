import React from 'react'
import { IColumnConfigStructure, ILinksList, IrowActions } from '../../../Models/table.models'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Checkbox from '../../components/checkbox'
import FreezedRightColumns from '../FreezedRigthColumns'
import FreezedLeftColumns from '../FreezedLeftColumns'
import { StructureConfig } from '../../../Models/table.enum'

interface IFreezedRows<T extends Object> {
  freezedRows: T[]
  columnsConfigStructure: IColumnConfigStructure<T>
  multipleCheck?: boolean
  columnMinWidth?: number
  rowActions?: IrowActions[]
  freezeIcon?: string
  links?: ILinksList[]
  checkedLink?: T
  freezedLeftSideColor?: string
  freezedRightSideColor?: string
  freezedRightSide?: string
  freezedRightSideVisible?: boolean
  isStickyFirstColumn?: boolean
  leftSideIcon?: string
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  headerHeight?: number
  LeftSideSelfAction?: (option: number | string) => void
  getRowForDropdown(option: number): void
  dragDropFreezeRow(option: T[]): void
  unFreezeRow(option: number): void
  isCheckedRows(option: number): boolean
  handleCheck(option: number): void
}
const FreezedRows = <T extends Object>({
  freezedRows,
  columnsConfigStructure,
  multipleCheck,
  columnMinWidth,
  rowActions,
  freezeIcon,
  links,
  checkedLink,
  freezedLeftSideColor,
  freezedRightSideColor,
  freezedRightSide,
  freezedRightSideVisible,
  isStickyFirstColumn,
  leftSideIcon,
  leftFreezedColumnWidth,
  rightFreezedColumnWidth,
  headerHeight,
  LeftSideSelfAction,
  getRowForDropdown,
  dragDropFreezeRow,
  unFreezeRow,
  isCheckedRows,
  handleCheck,
}: IFreezedRows<T>) => {
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(freezedRows)
    const [reOrderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reOrderedItem)

    dragDropFreezeRow(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='characters'>
        {(provided) => (
          <div
            className='G-FreezedRow'
            style={{ top: headerHeight ? `${headerHeight}px` : 48 }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {freezedRows.map((item: any, index) => {
              console.log(item)

              return (
                <Draggable
                  draggableId={typeof item.id === 'string' ? item.id : '' + item.id}
                  index={index}
                  key={item.id}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div style={{ display: 'flex' }}>
                        {/* FREEZED LEFT */}
                        <ul style={{ position: 'sticky', left: 0, zIndex: 45 }}>
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
                                  //@ts-ignore
                                  isCheck={isCheckedRows(item.id)}
                                  //@ts-ignore
                                  onClick={() => handleCheck(item.id)}
                                  customClass='G-checkbox'
                                />
                              ) : (
                                <p>{index + 1}</p>
                              )}
                            </li>
                          ) : null}
                          <FreezedLeftColumns
                            columnsConfigStructure={columnsConfigStructure}
                            columnMinWidth={columnMinWidth}
                            item={item}
                            freezedLeftSideColor={freezedLeftSideColor}
                          />
                        </ul>
                        {/* MAIN */}
                        <ul style={{ flex: 1 }}>
                          <li className='G-rows-icons' style={{ left: !isStickyFirstColumn ? '50%' : '' }}>
                            <div className='G-icons-group'>
                              {rowActions && rowActions.length
                                ? //@ts-ignore
                                  rowActions.map((elem, index) => {
                                    if (index < 2)
                                      return (
                                        <i
                                          key={index}
                                          className={
                                            elem.icon
                                              ? elem.icon
                                              : index === 0
                                              ? 'icon-material-symbols_edit'
                                              : 'icon-material-symbols_delete'
                                          }
                                          onClick={() => elem.action(item, index)}
                                        />
                                      )
                                  })
                                : null}
                              <i
                                className={freezeIcon ? freezeIcon : 'icon-material-symbols_dashboard-rounded'}
                                onClick={() => unFreezeRow && unFreezeRow(index)}
                              />
                            </div>
                          </li>
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
                                <p>{index + 1}</p>
                              )}
                            </li>
                          )}
                          {columnsConfigStructure[StructureConfig.BB55].items.map((column) => {
                            return (
                              column.isVisible && (
                                <li
                                  style={{
                                    ...column.customStyle,
                                    minWidth: columnMinWidth && columnMinWidth + 'px',
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
                              boxShadow: '7px 0px 9px -1px rgba(0,0,0,0.08)',
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
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default FreezedRows
