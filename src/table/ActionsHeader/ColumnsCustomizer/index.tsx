import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import './style.scss'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  IColumns,
} from '../../../Models/table.models'
import Checkbox from '../../components/checkbox'
import { StructureConfig } from '../../../Models/table.enum'

const onDragEnd = <T extends Object>(
  result: DropResult,
  columnsConfigStructure: IColumnConfigStructure<T>,
  columnsHeaderStructure: IColumnHeaderStructure,
  columnsTotalStructure?: IColumnTotalStructure,
  setFreezeValidation?: React.Dispatch<React.SetStateAction<boolean>>,
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void,
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void,
  setColumnTotalStructures?: (option: IColumnTotalStructure) => void,
) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    if (
      columnsConfigStructure[StructureConfig.BB33].items.length === 3 &&
      source.droppableId !== StructureConfig.BB33
    ) {
      setFreezeValidation && setFreezeValidation(true)
      return
    }
    setFreezeValidation && setFreezeValidation(false)
    //header
    // @ts-ignore
    const headersourceColumn = columnsHeaderStructure[source.droppableId]
    // @ts-ignore
    const headerdestColumn = columnsHeaderStructure[destination.droppableId]
    const headersourceItems = [...headersourceColumn.items]
    const headerdestItems = [...headerdestColumn.items]
    const [headerremoved] = headersourceItems.splice(source.index, 1)
    headerdestItems.splice(destination.index, 0, headerremoved)

    //config
    // @ts-ignore
    const sourceColumn = columnsConfigStructure[source.droppableId]
    // @ts-ignore
    const destColumn = columnsConfigStructure[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)

    //Total
    // @ts-ignore
    const totalsourceColumn = columnsTotalStructure[source.droppableId]
    // @ts-ignore
    const totaldestColumn = columnsTotalStructure[destination.droppableId]
    const totalsourceItems = [...totalsourceColumn.items]
    const totaldestItems = [...totaldestColumn.items]
    const [totalremoved] = totalsourceItems.splice(source.index, 1)
    totaldestItems.splice(destination.index, 0, totalremoved)

    setColumnsConfigStructure &&
      setColumnsConfigStructure({
        ...columnsConfigStructure,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    setColumnHeaderStructure &&
      setColumnHeaderStructure({
        ...columnsHeaderStructure,
        [source.droppableId]: {
          ...sourceColumn,
          items: headersourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: headerdestItems,
        },
      })
    setColumnTotalStructures &&
      columnsTotalStructure &&
      setColumnTotalStructures({
        ...columnsTotalStructure,
        [source.droppableId]: {
          ...totalsourceColumn,
          items: totalsourceItems,
        },
        [destination.droppableId]: {
          ...totaldestColumn,
          items: totaldestItems,
        },
      })
  } else {
    //header
    // @ts-ignore
    const headercolumn = columnsHeaderStructure[source.droppableId]
    const headercopiedItems = [...headercolumn.items]
    const [headerremoved] = headercopiedItems.splice(source.index, 1)
    headercopiedItems.splice(destination.index, 0, headerremoved)
    //config
    // @ts-ignore
    const column = columnsConfigStructure[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    //total
    // @ts-ignore
    const totalcolumn = columnsTotalStructure[source.droppableId]
    const totalcopiedItems = [...totalcolumn.items]
    const [totalremoved] = totalcopiedItems.splice(source.index, 1)
    totalcopiedItems.splice(destination.index, 0, totalremoved)
    setColumnsConfigStructure &&
      setColumnsConfigStructure({
        ...columnsConfigStructure,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    setColumnHeaderStructure &&
      setColumnHeaderStructure({
        ...columnsHeaderStructure,
        [source.droppableId]: {
          ...column,
          items: headercopiedItems,
        },
      })
    setColumnTotalStructures &&
      columnsTotalStructure &&
      setColumnTotalStructures({
        ...columnsTotalStructure,
        [source.droppableId]: {
          ...column,
          items: totalcopiedItems,
        },
      })
  }
}

interface IColumnsCustomizer<T extends Object> {
  columnsTotalStructure?: IColumnTotalStructure
  setColumnTotalStructures?(option: IColumnTotalStructure): void
  columnsConfigStructure: IColumnConfigStructure<T>
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void
  columnsHeaderStructure: IColumnHeaderStructure
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void
  storeStructure?: () => void
}
function ColumnsCustomizer<T extends Object>({
  columnsTotalStructure,
  setColumnTotalStructures,
  columnsConfigStructure,
  setColumnsConfigStructure,
  columnsHeaderStructure,
  setColumnHeaderStructure,
  storeStructure,
}: IColumnsCustomizer<T>) {
  const [visibleColumnsCount, setVisibleColumnsCount] = useState<number>()
  const [freezeValidation, setFreezeValidation] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCheck = (index: number, type: string, visible: boolean) => {
    if (type === 'Columns') {
      if (visibleColumnsCount === 1 && visible) {
        return
      }
      setColumnsConfigStructure &&
        setColumnsConfigStructure({
          ...columnsConfigStructure,
          [StructureConfig.BB55]: {
            ...columnsConfigStructure[StructureConfig.BB55],
            items: columnsConfigStructure[StructureConfig.BB55].items.map((item, indexx) => {
              if (index === indexx) {
                return { ...item, isVisible: !item.isVisible }
              }
              return item
            }),
          },
        })
    } else {
      if (visibleColumnsCount === 1 && visible) {
        return
      }
      setColumnsConfigStructure &&
        setColumnsConfigStructure({
          ...columnsConfigStructure,
          [StructureConfig.BB33]: {
            ...columnsConfigStructure[StructureConfig.BB33],
            items: columnsConfigStructure[StructureConfig.BB33].items.map((item, indexx) => {
              if (index === indexx) {
                return { ...item, isVisible: !item.isVisible }
              }
              return item
            }),
          },
        })
    }
  }

  const allColumns = columnsConfigStructure[StructureConfig.BB55].items.concat(
    columnsConfigStructure[StructureConfig.BB33].items,
  )

  useEffect(() => {
    let count = 0
    allColumns.map((item, indexx) => {
      if (item.isVisible) {
        count += 1
      }
    })
    setVisibleColumnsCount(count)
  }, [allColumns, columnsConfigStructure])
  return (
    <div style={{ marginLeft: '5px', flex: '1 1 auto' }}>
      <div className='G-align-center'>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{
            color: open ? '#4844C5' : 'black',
          }}
        >
          <i className='icon-bx_columns' />
          <div style={{ fontWeight: 'bold' }}>Customize Columns</div>
        </Button>
      </div>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div
          style={{
            border: '1px solid #A3A5AF',
            backgroundColor: 'white',
            borderRadius: '4px',
          }}
        >
          <div
            style={{
              margin: '0 0 0 32px',
              height: '74px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px',
            }}
          >
            <div className='G-flex-column' style={{ height: '48px' }}>
              <div>
                {visibleColumnsCount} of {allColumns.length} columns are visible
              </div>
              <div>{freezeValidation ? `The maximum number of freezing columns can be 3` : ''}</div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <DragDropContext
              onDragEnd={(result) =>
                onDragEnd(
                  result,
                  columnsConfigStructure,
                  columnsHeaderStructure,
                  columnsTotalStructure,
                  setFreezeValidation,
                  setColumnsConfigStructure,
                  setColumnHeaderStructure,
                  setColumnTotalStructures,
                )
              }
            >
              {Object.entries(columnsConfigStructure).map(([columnId, column]: [string, IColumns<T>], indexx) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(0, 0, 0, 0.16)',
                    }}
                    key={columnId}
                  >
                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={typeof columnId === 'string' ? columnId : '' + columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: 'white',
                                borderRadius: '4px',
                                padding: 4,
                                width: 250,
                                minHeight: 250,
                                maxHeight: 250,
                                overflowY: 'auto',
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={typeof item.id === 'string' ? item.id : '' + item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: 'none',
                                            padding: 13,
                                            backgroundColor: snapshot.isDragging ? '#F0F4F6' : 'white',
                                            ...provided.draggableProps.style,
                                          }}
                                          className='G-flex G-justify-between'
                                        >
                                          <div
                                            className='G-flex G-justify-start '
                                            style={{
                                              alignItems: 'center',
                                              height: '24px',
                                            }}
                                          >
                                            <i
                                              className='icon-Group-173'
                                              style={{
                                                fontSize: '10px',
                                                paddingRight: '8px',
                                              }}
                                            />
                                            <Checkbox
                                              isCheck={item.isVisible}
                                              onClick={() =>
                                                handleCheck(index, indexx === 1 ? 'Freezed' : 'Columns', item.isVisible)
                                              }
                                              customClass='G-checkbox'
                                            />
                                          </div>
                                          <div
                                            style={{
                                              minWidth: '150px',
                                              fontSize: '18px',
                                              display: 'flex',
                                              justifyContent: 'start',
                                              maxWidth: '150px',
                                              overflow: 'hidden',
                                              whiteSpace: 'nowrap',
                                              textOverflow: 'ellipsis',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <div>{item.columnName}</div>
                                          </div>
                                        </div>
                                      )
                                    }}
                                  </Draggable>
                                )
                              })}
                              {provided.placeholder}
                            </div>
                          )
                        }}
                      </Droppable>
                    </div>
                  </div>
                )
              })}
            </DragDropContext>
          </div>
          <div className='G-confirm-button'>
            <button
              onClick={() => {
                storeStructure && storeStructure()
                handleClose()
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Menu>
    </div>
  )
}

export default ColumnsCustomizer
