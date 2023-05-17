import React from 'react'
import { Button, Menu } from '@mui/material'
import { ILinksList } from '../../../../Models/table.models'
import { useState } from 'react'
import LinkSvgIcon from '../../../../svgIcons/LinkSvgIcon'
interface IDropDown<T extends Object> {
  item: T
  checkedLink?: T
  links?: ILinksList[]
  RightSideIcon?: any
  getRowForDropdown?(option: number): void
}

const DropDown = <T extends Object>({ item, checkedLink, links, RightSideIcon, getRowForDropdown }: IDropDown<T>) => {
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
        <div
          onClick={() =>
            //@ts-ignore
            getRowForDropdown && getRowForDropdown(item.id)
          }
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {!RightSideIcon ? (
            <LinkSvgIcon
              fill={
                //@ts-ignore
                checkedLink && checkedLink.id === item.id && open ? '#4844c5' : 'black'
              }
            />
          ) : (
            <RightSideIcon
              fill={
                //@ts-ignore
                checkedLink && checkedLink.id === item.id && open ? '#4844c5' : 'black'
              }
            />
          )}
        </div>
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
                  {el.icon ? el.icon() : null}
                  <div
                    style={{
                      paddingLeft: '10px',
                      fontSize: '12px',
                      width: '80%',
                    }}
                  >
                    {el.name}
                  </div>
                </li>
              )
            })}
        </ul>
      </Menu>
    </>
  )
}

export default DropDown
