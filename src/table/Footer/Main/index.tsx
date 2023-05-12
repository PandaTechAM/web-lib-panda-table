import React from 'react'
import {
  IColumnConfig,
  IColumnConfigStructure,
  IColumnTotal,
  IColumnTotalStructure,
  ITotalList,
} from '../../../Models/table.models'
import { Button, Menu } from '@mui/material'
import { useState } from 'react'
import './style.scss'
import { formatPrice } from '../../../utils'
import { StructureConfig } from '../../../Models/table.enum'
interface IFooterMain<T extends Object> {
  columnsTotalStructure: IColumnTotalStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
  isStickyFirstColumn?: boolean
  leftFreezedColumnWidth?: number
  setTotalType?(option: number | string): void
}
const FooterMain = <T extends Object>({
  columnsTotalStructure,
  columnsConfigStructure,
  columnMinWidth,
  footerColor,
  isStickyFirstColumn,
  leftFreezedColumnWidth,
  setTotalType,
}: IFooterMain<T>) => {
  const [selectedItem, setSelectedItem] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [listForDropdown] = useState<ITotalList[]>([
    {
      id: 1,
      title: 'AVG',
    },
    {
      id: 2,
      title: 'MIN',
    },
    {
      id: 3,
      title: 'MAX',
    },
    {
      id: 4,
      title: 'SUM',
    },
  ])
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <ul className='G-data-table-footer' style={{ flex: 1, backgroundColor: footerColor && footerColor }}>
      {!isStickyFirstColumn ? (
        <li
          className='G-Total-dropdown'
          style={{
            backgroundColor: footerColor && footerColor,
            minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : 60,
          }}
        >
          <div style={{ color: open ? '#4844c5' : 'black', marginRight: 2 }}>
            {`Total ${listForDropdown[selectedItem].title}`}
          </div>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{
              margin: 0,
              padding: 0,
              minWidth: 15,
            }}
          >
            <i
              style={{
                fontSize: '12px',
                paddingTop: '2px',
                color: open ? '#4844c5' : 'black',
              }}
              className={
                open
                  ? 'icon-material-symbols_arrow-forward-ios-rounded'
                  : 'icon-material-symbols_arrow-forward-ios-rounded-1'
              }
            />
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            style={{ translate: '-40px 16px' }}
          >
            <ul className='G-list'>
              {listForDropdown.map((item: any, index: any) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      setTotalType && selectedItem !== index && setTotalType(item.title)
                      setSelectedItem(index)
                    }}
                    style={{
                      color: index === selectedItem ? '#4844C5' : 'black',
                    }}
                  >
                    {item.title}
                  </li>
                )
              })}
            </ul>
          </Menu>
        </li>
      ) : null}
      {columnsTotalStructure[StructureConfig.BB55].items.map((item: IColumnTotal, index: number) =>
        //@ts-ignore
        columnsConfigStructure[StructureConfig.BB55].items.map((column: IColumnConfig<T>, indexx: number) => {
          if (index === indexx) {
            return (
              column.isVisible && (
                <li
                  tabIndex={0}
                  style={{
                    ...column.customStyle,
                    minWidth: columnMinWidth + 'px',
                    backgroundColor: footerColor && footerColor,
                  }}
                  key={item.id}
                  className='G-column-item'
                >
                  {columnsTotalStructure[StructureConfig.BB55].items[index].title
                    ? formatPrice(columnsTotalStructure[StructureConfig.BB55].items[index].title as number, ' AMD')
                    : null}
                </li>
              )
            )
          }
        }),
      )}
    </ul>
  )
}

export default FooterMain
