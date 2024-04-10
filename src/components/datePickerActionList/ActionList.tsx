import React from 'react'
import { PickersActionBarProps } from '@mui/x-date-pickers'
import './style.scss'
import { Button, Grid } from '@mui/material'
const ActionList = (props: PickersActionBarProps) => {
  const { onClear, onSetToday, className } = props
  const actions = [
    { text: 'Clear', method: onClear },
    { text: 'Today', method: onSetToday },
  ]

  return (
    <div className={`G-justify-between P-date-actions-component ${className}`}>
      <Grid container gap={1} className='G-flex P-actions-component'>
        {actions.map(({ text, method }) => (
          <Grid item xs={4} key={text}>
            <Button
              size='medium'
              variant={text === 'Clear' ? 'outlined' : 'text'}
              fullWidth
              style={{
                textTransform: 'capitalize',
              }}
              key={text}
              onClick={method}
            >
              {text}
            </Button>
          </Grid>
        ))}
      </Grid>
      <div className='G-center P-time-component'>
        <div>Hour</div>
        <div>Min</div>
        <div>Sec</div>
      </div>
    </div>
  )
}

export default ActionList
