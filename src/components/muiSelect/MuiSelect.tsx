import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface IMuiSelect {
  aggregates?: string[]
  columnName: string
  selectedAggregates?: any
  onArgChange?(columnName: string, type: string, handleChangeLoadStatus?: () => void): void
  handlesetData: (option: any) => void
  handleChangeLoadStatus(): void
}
export default function MuiSelect({
  aggregates,
  columnName,
  onArgChange,
  handlesetData,
  handleChangeLoadStatus,
}: IMuiSelect) {
  const [type, setType] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
    onArgChange?.(columnName, event.target.value, handleChangeLoadStatus)
    handlesetData(event.target.value)
  }

  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel id='demo-simple-select-standard-label' sx={{ fontSize: '12px' }}>
        {!type ? 'Aggregates' : ''}
      </InputLabel>
      <Select
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standart'
        value={type}
        label={type ? '' : 'Aggregates'}
        onChange={handleChange}
        size='small'
        sx={{
          fontSize: '12px',
          ':hover': {
            backgroundColor: 'none',
          },
        }}
      >
        {aggregates?.map((item) => (
          <MenuItem key={item} value={item} sx={{ fontSize: '12px' }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
