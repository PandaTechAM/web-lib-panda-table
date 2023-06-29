import React, { useState, cloneElement, ReactElement } from 'react'
import { Autocomplete, TextField, Modal } from '@mui/material'
import { ItemFields } from '../../../Models/table.models'

interface IModal {
  isDisabled: boolean
  children: ReactElement
  columnsSizes: string
  advancedSettings: boolean
  filterTypeing: ItemFields
  setCoulmnName: (name: string) => void
}

const FiltersModalWrapper = ({
  isDisabled,
  children,
  columnsSizes,
  advancedSettings,
  filterTypeing,
  setCoulmnName,
}: IModal) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    // setCoulmnName(filterTypeing.PropertyName);
  }
  const handleClose = () => {
    setOpen(false)
    setCoulmnName('')
  }
  const childrenWithProps = cloneElement(children, { handleClose })
  return (
    <div className='ForModal' style={{ width: advancedSettings ? columnsSizes : '100%' }}>
      <Autocomplete
        multiple
        disablePortal
        id='Favorite-tags'
        options={[]}
        readOnly
        disabled={isDisabled}
        limitTags={advancedSettings ? 1 : 2}
        value={filterTypeing.CheckedItems}
        autoFocus={false}
        fullWidth
        onOpen={handleOpen}
        renderInput={(params) => <TextField {...params} label={filterTypeing.PropertyName} disabled />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {childrenWithProps}
      </Modal>
    </div>
  )
}

export default FiltersModalWrapper
