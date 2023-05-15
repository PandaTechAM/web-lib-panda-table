import React from 'react'
import Checkbox from '../../components/checkbox'
import { Button, Menu } from '@mui/material'
import { useState } from 'react'
// import './style.scss'
import { CheckedItems } from '../../../Models/table.enum'

interface ICheckRows<T extends Object> {
  data: T[]
  checkedRows: T[]
  handleCheckAll(): void
  unCheck(): void
  checkAllDataFromDb(): void
}
const CheckRows = <T extends Object>({
  data,
  checkedRows,
  handleCheckAll,
  unCheck,
  checkAllDataFromDb,
}: ICheckRows<T>) => {
  const [selectedItem, setSelectedItem] = useState(2)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [listForDropdown] = useState<Object[]>([
    {
      id: 1,
      title: CheckedItems.SELECTED_ALL,
      action: () => {
        checkAllDataFromDb()
        setSelectedItem(0)
      },
    },
    {
      id: 2,
      title: CheckedItems.SELECTED_VISIBLE,
      action: () => {
        handleCheckAll()
        setSelectedItem(1)
      },
    },
    {
      id: 3,
      title: CheckedItems.NONE,
      action: () => {
        unCheck()
        setSelectedItem(2)
      },
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
    <>
      <div className='G-align-center G-check-all-component'>
        <Checkbox
          isCheck={data.length === checkedRows.length}
          onClick={
            data.length === checkedRows.length
              ? () => {
                  unCheck()
                  setSelectedItem(2)
                }
              : () => {
                  handleCheckAll()
                  setSelectedItem(1)
                }
          }
          customClass='G-checkbox'
        />
      </div>
      <div className='G-check-all-dropdown'>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{
            height: '26px',
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
            translate: -10,
            backgroundColor: 'white',
            minWidth: 10,
          }}
        >
          <i
            style={{
              fontSize: '9px',
              color: open ? '#4844c5' : 'black',
            }}
            className={'icon-Polygon-4'}
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
          style={{ translate: '-32px 5px' }}
        >
          <ul className='G-dropdown-list'>
            {listForDropdown.map((item: any, index: any) => {
              return (
                <li
                  key={item.id}
                  onClick={item.action}
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
      </div>
    </>
  )
}

export default CheckRows
