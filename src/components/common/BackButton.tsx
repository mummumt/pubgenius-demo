import styled from '@emotion/styled'
import { ArrowLeftRounded } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'

const AbsoluteBox = styled(Box)`
  position: absolute;
  top: 3%;
  left: 3%;
  z-index: 5000;
  border-radius: 100%;
  width: 48px;
  height: 48px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

type BackButtonProps = {}

const BackButton: FC<BackButtonProps> = ({}) => {
  const router = useRouter()

  const onClickBack = () => {
    router.push('/', '/', { shallow: true })
  }

  return (
    <AbsoluteBox>
      <IconButton onClick={onClickBack} color="primary">
        <ArrowLeftRounded sx={{ width: 60, height: 60 }} />
      </IconButton>
    </AbsoluteBox>
  )
}

export default BackButton
