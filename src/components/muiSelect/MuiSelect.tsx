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
  handlesetData: (option: any) => void
}
export default function MuiSelect({ aggregates, columnName, onArgChange, handlesetData }: IMuiSelect) {
  const [type, setType] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
    onArgChange?.(columnName, event.target.value)
    handlesetData(event.target.value)
  }

  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel id='demo-simple-select-standard-label'>{type ? '' : 'Aggregates'}</InputLabel>
      <Select
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standart'
        value={type}
        label={type ? '' : 'Aggregates'}
        onChange={handleChange}
      >
        {aggregates?.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
