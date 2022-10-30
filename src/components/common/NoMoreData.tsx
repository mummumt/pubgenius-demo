import { FC } from 'react'
import Typography from '@mui/material/Typography'

type NoMoreDataProps = {}

const NoMoreData: FC<NoMoreDataProps> = ({}) => {
  return (
    <Typography variant="h5" color="primary.contrastText">
      Out of people.
    </Typography>
  )
}

export default NoMoreData
