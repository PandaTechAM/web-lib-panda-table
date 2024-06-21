import React from 'react'
import { PickersActionBarProps } from '@mui/x-date-pickers'
import './style.scss'
import { Button, Grid } from '@mui/material'
const ActionList = (props: PickersActionBarProps) => {
  const { onClear, onSetToday, onAccept, className } = props
  const actions = [
    { text: 'OK', method: onAccept, variant: 'text' },
    { text: 'Clear', method: onClear, variant: 'outlined' },
    { text: 'Today', method: onSetToday, variant: 'container' },
  ]

  return (
    <div className={`G-justify-between P-date-actions-component ${className}`}>
      <Grid container gap={1} className='G-flex P-actions-component'>
        {actions.map(({ text, method, variant }) => (
          <Grid item xs={3} key={text}>
            <Button
              size='medium'
              variant={variant as any}
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
