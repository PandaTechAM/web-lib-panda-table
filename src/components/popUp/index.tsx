import React, { useState, ReactElement } from 'react'
import { Button, Menu } from '@mui/material'
interface IPopUp {
  children: ReactElement
  ActiveIcon?: any
  DisabledIcon?: any
  modalName?: string
  style?: any
  checkedLink?: any
  item?: any
  open: boolean
  anchorEl: any
  handleClose: () => void
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  getRowForDropdown?: (option: any) => void
}
const PopUp = ({
  children,
  ActiveIcon,
  DisabledIcon,
  modalName,
  style,
  checkedLink,
  item,
  open,
  anchorEl,
  handleClose,
  handleClick,
  getRowForDropdown,
}: IPopUp) => {
  return (
    <>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={
          style
            ? style
            : {
                margin: 0,
                padding: '3px',
                minWidth: 15,
                border: 'none',
                backgroundColor: 'rgba(0,0,0,0)',
              }
        }
      >
        <div
          className='G-center'
          onClick={(e) => {
            getRowForDropdown?.(item?.id)
          }}
        >
          {ActiveIcon ? (
            DisabledIcon ? (
              open ? (
                <ActiveIcon />
              ) : (
                <DisabledIcon />
              )
            ) : (
              <ActiveIcon fill={!open ? '#4A4C56' : '#4844C5'} />
            )
          ) : null}
          <div
            style={{
              color: open ? '#4844c5' : 'black',
            }}
          >
            {modalName}
          </div>
        </div>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={checkedLink && item ? (checkedLink.id === item.id ? open : false) : open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {children}
      </Menu>
    </>
  )
}

export default PopUp
