import React from 'react'
import { IColumnConfigStructure, IColumnTotalStructure, ITotalList } from '../../../Models/table.models'
import { Button, Menu } from '@mui/material'
import FreezedItems from './FreezedItems'
import { useState } from 'react'
import './style.scss'
import { StructureConfig } from '../../../Models/table.enum'
import ArrowTopSvgIcon from '../../../svgIcons/ArrowtopSvgIcon'
import ArrowBottomSvgIcon from '../../../svgIcons/ArrowBottomSvgIcon'
interface IFooterFreezedLeft<T extends Object> {
  columnsTotalStructure: IColumnTotalStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
  isStickyFirstColumn?: boolean
  leftFreezedColumnWidth?: number
  listForDropdown?: ITotalList[]
  setTotalType?(option: number | string): void
}

const FooterFreezedLeft = <T extends Object>({
  columnsTotalStructure,
  columnsConfigStructure,
  columnMinWidth,
  footerColor,
  isStickyFirstColumn,
  leftFreezedColumnWidth,
  listForDropdown,
  setTotalType,
}: IFooterFreezedLeft<T>) => {
  const [selectedItem, setSelectedItem] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <ul
      className='G-data-table-footer'
      style={{
        left: 0,
        zIndex: 1000,
        boxShadow: '7px 0px 9px -1px rgba(0,0,0,0.08)',
      }}
    >
      {isStickyFirstColumn ? (
        <li
          className='G-dropdown'
          style={{
            backgroundColor: footerColor && footerColor,
            minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : 60,
          }}
        >
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{
              margin: 0,
              padding: '3px',
              minWidth: 15,
              border: 'none',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <div
              className='G-dropdown-name'
              style={{
                color: open ? '#4844c5' : 'black',
              }}
            >
              {`Total ${listForDropdown && listForDropdown[selectedItem].title}`}
            </div>
            {open ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowTopSvgIcon />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowBottomSvgIcon />
              </div>
            )}
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <ul className='G-list'>
              {listForDropdown &&
                listForDropdown.map((item: any, index: any) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        selectedItem !== index && setTotalType?.(item.title)
                        setSelectedItem(index)
                        handleClose()
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
      {columnsTotalStructure[StructureConfig.BB33].items.length ? (
        <FreezedItems
          columnsConfigStructure={columnsConfigStructure}
          columnsTotalStructure={columnsTotalStructure}
          columnMinWidth={columnMinWidth}
          footerColor={footerColor}
        />
      ) : null}
    </ul>
  )
}

export default FooterFreezedLeft
