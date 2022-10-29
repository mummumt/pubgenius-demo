import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556ce6',
    },
    secondary: {
      main: '#19157b',
    },
    error: {
      main: red[300],
    },
  },
})

export default theme
