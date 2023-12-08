import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F6FAFD',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})
