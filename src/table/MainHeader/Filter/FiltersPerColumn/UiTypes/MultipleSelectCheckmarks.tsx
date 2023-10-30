import React, { memo, useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { IComparisonType, ItemFields } from '../../../../../Models/table.models'

interface IMultipleSelectCheckmarks {
  item: IComparisonType
  columnsSizes: string
  isDisabled: boolean
  perColumnListForFilters?: string[]
  columnName: string
  isLoadingFilters?: boolean
  advancedSettings: boolean
  filterTypeing: ItemFields
  setCheckedItemsLocaly(options: any[]): void
  handleSelectItems: (option: any[], isClosed: boolean) => void
  setCoulmnName: (name: string) => void
}

const MultipleSelectCheckmarks = ({
  item,
  columnsSizes,
  isDisabled,
  perColumnListForFilters,
  columnName,
  isLoadingFilters,
  advancedSettings,
  filterTypeing,
  setCheckedItemsLocaly,
  handleSelectItems,
  setCoulmnName,
}: IMultipleSelectCheckmarks) => {
  const [checkedItems, setCheckedItems] = useState<any[]>([])

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    console.log(value)

    setCheckedItems(typeof value === 'string' ? value.split(',') : value)
    setCheckedItemsLocaly(value)
  }

  const handleOpenList = () => {
    if (!isDisabled) {
      setCoulmnName(item.ColumnName)
      handleSelectItems([], true)
    }
  }
  const handleCloseList = () => {
    setCoulmnName('')
    handleSelectItems(checkedItems, false)
  }

  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      let newValues: string[] = filterTypeing.CheckedItems
      setCheckedItems(newValues)
    }
  }, [filterTypeing])

  return (
    <div
      style={{
        width: advancedSettings ? columnsSizes : '100%',
        position: 'relative',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id='demo-multiple-checkbox-label'>{item.ColumnName}</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={checkedItems}
          fullWidth
          onChange={handleChange}
          onOpen={handleOpenList}
          onClose={handleCloseList}
          disabled={isDisabled && item.ColumnName !== columnName}
          input={<OutlinedInput label={item.ColumnName} />}
          renderValue={(selected) => selected.join(', ')}
        >
          {perColumnListForFilters?.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={typeof name === 'boolean' ? String(name) : name} />
              <Checkbox checked={checkedItems.indexOf(name) > -1} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default memo(MultipleSelectCheckmarks)
