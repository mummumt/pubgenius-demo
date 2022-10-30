import { createTheme } from '@mui/material/styles'
import { pink, red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556ce6',
    },
    secondary: {
      main: pink[500],
    },
    error: {
      main: red[300],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
        },
        body: {
          width: '100%',
          height: '100%',
          minWidth: '320px',
          overflow: 'hidden',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {},
    },
  },
})

export default theme
