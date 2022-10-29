/// <reference types="@emotion/react/types/css-prop" />
import { Theme as MuiTheme } from '@mui/material/styles'

declare module '@emotion/react' {
  interface Theme extends MuiTheme {}
}

declare module '@mui/material/styles' {
  interface DefaultTheme extends MuiTheme {}
}
