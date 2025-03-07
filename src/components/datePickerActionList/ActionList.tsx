import React from 'react'
import { PickersActionBarProps } from '@mui/x-date-pickers'
import './style.scss'
import { Button, Grid } from '@mui/material'
const ActionList = (props: PickersActionBarProps, translations: Record<string, string>) => {
  const { onClear, onSetToday, onAccept, className } = props
  const actions = [
    { text: translations.confirmFilters, method: onAccept, variant: 'text' },
    { text: translations.clearDate, method: onClear, variant: 'outlined' },
    {
      text: translations.todayButton,
      method: onSetToday,
      variant: 'container',
    },
  ]
  const locale = localStorage.getItem('locale')
  const handlingLocale = locale === 'hy'

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
                fontSize: handlingLocale ? '12px' : '14px',
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
        <div>{translations.hour}</div>
        <div>{translations.min}</div>
        <div>{translations.sec}</div>
      </div>
    </div>
  )
}

export default ActionList
