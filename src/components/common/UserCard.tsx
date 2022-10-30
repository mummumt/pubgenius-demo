import StyledCard from '@/components/styled/StyledCard'
import { trpc } from '@/utils/trpc'
import { FC } from 'react'
import TinderCard from 'react-tinder-card'
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'
import ImageBox from '@/components/styled/ImageBox'
import { User } from '@prisma/client'
import RichTextDisplay from '../input/RichTextDisplay'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const StyledTinderCard = styled(TinderCard)`
  position: absolute;
  background: linear-gradient(#e66465, #9198e5);
  border-radius: 32px;
  min-width: 300px;
  min-height: 300px;
  width: calc(40vw + 50px);
  max-width: 540px;
  height: 75vh;
`

const RelativeBox = styled(Box)`
  position: relative;
  border-radius: 32px;
`

const FlexEndBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
`

const PaddingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: calc(100% - 300px);
`

type Direction = 'left' | 'right' | 'up' | 'down'
type UserCardProps = {
  user: User & { likedBy: { id: User['id'] }[] }
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const currentUser = useSelector((state: RootState) => state.user.userInfo)

  const onSwipe = (direction: Direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = () => {
    console.log(user.username + ' left the screen')
  }

  const preventSwipe = currentUser ? ['up', 'down'] : ['up', 'down', 'left', 'right']

  return (
    <StyledTinderCard onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} preventSwipe={preventSwipe}>
      <RelativeBox>
        <Typography variant="h5" color="primary.contrastText" sx={{ position: 'absolute', right: 20, bottom: 20 }}>
          {user.username}
        </Typography>

        <ImageBox
          component="img"
          alt={user.username}
          src={
            user.profileUrl ??
            'https://steamuserimages-a.akamaihd.net/ugc/1644340994747007967/853B20CD7694F5CF40E83AAC670572A3FE1E3D35/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
          }
        />
      </RelativeBox>
      <PaddingBox>
        <RichTextDisplay value={user.userDetails} />
        <FlexEndBox sx={{ mr: 2, mt: 'auto', mb: 2 }}>
          <Typography variant="h5" color="primary.contrastText">
            Likes: {user.likedBy.length}
          </Typography>
        </FlexEndBox>
      </PaddingBox>
    </StyledTinderCard>
  )
}

export default UserCard
