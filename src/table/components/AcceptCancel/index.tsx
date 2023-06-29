import React from 'react'
import { Button } from '@mui/material'
interface IAcceptCancel {
  errMessage: string
  checkedItems: string[]
  handleClose(): void
  onAccept(): void
}
const AcceptCancel = ({ errMessage, checkedItems, handleClose, onAccept }: IAcceptCancel) => {
  return (
    <div className='G-justify-between'>
      <Button
        size='large'
        fullWidth
        style={{
          width: '48%',
          color: 'black',
          border: '1px solid #FB9C59',
        }}
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button
        size='large'
        fullWidth
        style={{
          width: '48%',
          backgroundColor: '#FB9C59',
          color: 'black',
        }}
        disabled={errMessage !== ''}
        onClick={onAccept}
      >
        Save
      </Button>
    </div>
  )
}

export default AcceptCancel
