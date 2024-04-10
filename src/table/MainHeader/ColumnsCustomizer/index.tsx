import React, { memo, useEffect, useMemo, useState } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { StructureConfig } from '../../../Models/table.enum'
import { IColumnConfigStructure, IColumnHeaderStructure, IColumns } from '../../../Models/table.models'
import Checkbox from '../../../components/checkbox'
import PopUp from '../../../components/popUp'
import ColumnsSvgIcon from '../../../svgIcons/ColumnsSvgIcon'
import GroupSvgIcons from '../../../svgIcons/GroupSvgIcon'
import './style.scss'
import { Button, Tooltip } from '@mui/material'
const onDragEnd = <T extends Object>(
  result: DropResult,
  columnsConfigStructure: IColumnConfigStructure<T>,
  columnsHeaderStructure: IColumnHeaderStructure,
  setFreezeValidation?: React.Dispatch<React.SetStateAction<boolean>>,
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void,
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void,
) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    if (
      columnsConfigStructure[StructureConfig.Freezed].items.length === 3 &&
      source.droppableId !== StructureConfig.Freezed
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
  }
}

interface IColumnsCustomizer<T extends Object> {
  translations?: Record<string, any>
  columnsConfigStructure: IColumnConfigStructure<T>
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void
  columnsHeaderStructure: IColumnHeaderStructure
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void
  storeStructure?: () => void
}
function ColumnsCustomizer<T extends Object>({
  columnsConfigStructure,
  setColumnsConfigStructure,
  columnsHeaderStructure,
  setColumnHeaderStructure,
  storeStructure,
  translations,
}: IColumnsCustomizer<T>) {
  const [visibleColumnsCount, setVisibleColumnsCount] = useState<number>()
  const [freezeValidation, setFreezeValidation] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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

      setColumnsConfigStructure?.({
        ...columnsConfigStructure,
        [StructureConfig.Main]: {
          ...columnsConfigStructure[StructureConfig.Main],
          items: columnsConfigStructure[StructureConfig.Main].items.map((item, indexx) => {
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

      setColumnsConfigStructure?.({
        ...columnsConfigStructure,
        [StructureConfig.Freezed]: {
          ...columnsConfigStructure[StructureConfig.Freezed],
          items: columnsConfigStructure[StructureConfig.Freezed].items.map((item, indexx) => {
            if (index === indexx) {
              return { ...item, isVisible: !item.isVisible }
            }
            return item
          }),
        },
      })
    }
  }
  const allColumns = useMemo(
    () => [
      ...columnsConfigStructure[StructureConfig.Main].items,
      ...columnsConfigStructure[StructureConfig.Freezed].items,
    ],
    [columnsConfigStructure],
  )

  useEffect(() => {
    let count = 0
    allColumns.map((item) => {
      if (item.isVisible) {
        count += 1
      }
    })
    setVisibleColumnsCount(count)
  }, [columnsConfigStructure])

  return (
    <div className='G-costumize-wrapper'>
      <PopUp
        style={{
          textTransform: 'capitalize',
        }}
        ActiveIcon={ColumnsSvgIcon}
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        modalName={translations?.customizationAction.modalName || 'Customize Columns'}
      >
        <div className='G-costumize-modal'>
          <div className='G-align-center G-costumize-header'>
            <div className='G-flex-column'>
              <div>
                {translations?.customizationAction.info || 'Visible columns are '}
                {visibleColumnsCount} - {allColumns.length}
              </div>
              <div>
                {freezeValidation
                  ? translations?.customizationAction.validationMessage ||
                    'The maximum number of freezing columns can be 3'
                  : ''}
              </div>
            </div>
          </div>
          <div className='G-flex G-columns-header'>
            <div className='G-flex' style={{ width: '50%' }}>
              {translations?.customizationAction.columns || 'Columns'}
            </div>
            <div className='G-flex' style={{ width: '50%' }}>
              {translations?.customizationAction.pinnedColumns || 'Pinned Columns'}
            </div>
          </div>
          <div
            className='G-align-center'
            style={{
              height: '100%',
            }}
          >
            <DragDropContext
              onDragEnd={(result) =>
                onDragEnd(
                  result,
                  columnsConfigStructure,
                  columnsHeaderStructure,
                  setFreezeValidation,
                  setColumnsConfigStructure,
                  setColumnHeaderStructure,
                )
              }
            >
              {Object.entries(columnsConfigStructure).map(([columnId, column]: [string, IColumns<T>], indexx) => {
                return (
                  <div className='G-column-center' key={columnId}>
                    <div
                      style={{
                        margin: columnId === 'Freezed' ? '8px 24px 8px 8px' : 8,
                      }}
                    >
                      <Droppable droppableId={typeof columnId === 'string' ? columnId : '' + columnId} key={columnId}>
                        {(provided) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className='G-left-column'
                              style={{
                                background: columnId === 'Freezed' ? '#F6F6F6' : 'white',
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
                                            width: 235,
                                            backgroundColor: snapshot.isDragging ? '#F0F4F6' : 'rgba(255, 255, 255,0)',
                                            ...provided.draggableProps.style,
                                          }}
                                          className='G-justify-between'
                                        >
                                          <div
                                            className='G-justify-start '
                                            style={{
                                              alignItems: 'center',
                                              height: '24px',
                                            }}
                                          >
                                            <div
                                              className='G-justify-center'
                                              style={{
                                                marginRight: 8,
                                              }}
                                            >
                                              <GroupSvgIcons />
                                            </div>
                                            <Checkbox
                                              isCheck={item.isVisible}
                                              onClick={() =>
                                                handleCheck(index, indexx === 1 ? 'Freezed' : 'Columns', item.isVisible)
                                              }
                                              customClass='G-checkbox'
                                            />
                                          </div>
                                          <div className='G-item-name'>
                                            <div className='G-item-name-text' title={String(item.columnName)}>
                                              {item.columnName}
                                            </div>
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
          {storeStructure && (
            <div style={{ padding: 8 }}>
              <Button
                size='medium'
                fullWidth
                onClick={(e) => {
                  storeStructure()
                  handleClose?.()
                }}
              >
                {translations?.customizationAction.actionButtonName || 'Save'}
              </Button>
            </div>
          )}
        </div>
      </PopUp>
    </div>
  )
}

export default memo(ColumnsCustomizer) as <T extends Object>(props: IColumnsCustomizer<T>) => JSX.Element
