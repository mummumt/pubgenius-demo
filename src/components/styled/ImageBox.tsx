import styled from '@emotion/styled'
import { Box, BoxTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const ImageBox = styled(Box)`
  width: 100%;
  height: 300px;
  border-radius: 32px 32px 0px 0px;
` as OverridableComponent<BoxTypeMap<{}, 'image'>>

export default ImageBox
