import React from 'react'
import { Button, Menu } from '@mui/material'
import { ILinksList } from '../../../../../Models/table.models'
import { useState } from 'react'
import LinkSvgIcon from '../../../../../svgIcons/LinkSvgIcon'
import PopUp from '../../../../../components/popUp'
interface IDropDown<T extends Object> {
  item: T
  checkedLink?: T
  links?: ILinksList[]
  RightSideIcon?: any
  getRowForDropdown?(option: any): void
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
      <PopUp
        ActiveIcon={LinkSvgIcon}
        checkedLink={checkedLink}
        item={checkedLink}
        getRowForDropdown={getRowForDropdown}
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      >
        <ul
          style={{
            border: '1px solid #CED8DD',
            padding: '0 26px',
            width: 240,
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
                  onClick={(e) => {
                    e.stopPropagation()
                    el.action(checkedLink, ind)
                  }}
                  className='G-align-center'
                  style={{
                    cursor: 'pointer',
                    padding: '12px 0',
                    borderBottom: ind !== links.length - 1 ? '1px solid #757575' : '',
                  }}
                >
                  {el.icon ? el.icon() : <LinkSvgIcon fill='#4844c5' />}
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
      </PopUp>
    </>
  )
}

export default DropDown
