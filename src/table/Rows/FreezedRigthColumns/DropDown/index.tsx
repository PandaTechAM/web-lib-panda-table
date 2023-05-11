import React from 'react'
import { Button, Menu } from '@mui/material'
import { ILinksList } from '../../../../Models/table.models'
import { useState } from 'react'

interface IDropDown<T extends Object> {
  item: T
  checkedLink?: T
  links?: ILinksList[]
  getRowForDropdown?(option: number): void
}

const DropDown = <T extends Object>({ item, checkedLink, links, getRowForDropdown }: IDropDown<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ minWidth: '10px' }}
      >
        <i
          //@ts-ignore
          onClick={() => getRowForDropdown && getRowForDropdown(item.id)}
          style={{
            color:
              //@ts-ignore
              checkedLink && checkedLink.id === item.id && open ? '#4844c5' : 'black',
          }}
          className={'icon-Vector1'}
        />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        //@ts-ignore
        open={checkedLink && checkedLink.id === item.id ? open : false}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <ul
          style={{
            border: '1px solid #CED8DD',
            padding: '0 26px',
            width: 240,
            height: 260,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 4,
          }}
        >
          {links &&
            links.length &&
            links.map((el, ind) => {
              return (
                <li
                  key={ind}
                  onClick={() => el.action(checkedLink, ind)}
                  className='G-align-center'
                  style={{
                    cursor: 'pointer',
                    padding: '12px 0',
                    borderBottom: ind !== links.length - 1 ? '1px solid #757575' : '',
                  }}
                >
                  <i className={el.icon} style={{ color: '#4844c5' }} />
                  <div style={{ paddingLeft: '10px', fontSize: '12px' }}>{el.name}</div>
                </li>
              )
            })}
        </ul>
      </Menu>
    </>
  )
}

export default DropDown
