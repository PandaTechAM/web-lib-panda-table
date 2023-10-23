import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface IMuiSelect {
  aggregates?: string[]
  columnName: string
  selectedAggregates?: any
  onArgChange?(columnName: string, type: string): void
}
export default function MuiSelect({ aggregates, columnName, selectedAggregates, onArgChange }: IMuiSelect) {
  const [type, setType] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
    onArgChange?.(columnName, event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>
          Aggregates {type ? selectedAggregates[`${columnName}_${type}`] : ''}
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={type}
          label={`Aggregates ${type ? selectedAggregates[`${columnName}_${type}`] : ''}`}
          onChange={handleChange}
        >
          {aggregates?.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
