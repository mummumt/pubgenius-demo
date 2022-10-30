import { trpc } from '@/utils/trpc'
import { FC } from 'react'
import TinderCard from 'react-tinder-card'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import ImageBox from '@/components/styled/ImageBox'
import { User } from '@prisma/client'
import RichTextDisplay from '../input/RichTextDisplay'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { useNotification } from '@/hooks/useNotification'

const StyledTinderCard = styled(TinderCard)`
  position: absolute;
  background: #f8b195;
  border-radius: 32px;
  min-width: 300px;
  min-height: 300px;
  width: calc(40vw + 50px);
  max-width: 540px;
  height: 75vh;
  box-shadow: 0px 0px 60px 0px rgba(228, 172, 20, 0.5);
  filter: ${(props: { disabled?: boolean }) => (props.disabled ? 'blur(8px)' : undefined)};
  pointer-events: ${(props: { disabled?: boolean }) => (props.disabled ? 'none' : undefined)};
  transition: 1s ease-in;
`

const RelativeBox = styled(Box)`
  position: relative;
  border-radius: 32px;
`

const FlexEndBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  const likeUserMutation = trpc.user.like.useMutation()
  const dislikeUserMutation = trpc.user.dislike.useMutation()

  const { displayNotification } = useNotification()

  const onSwipe = (direction: Direction) => {
    if (currentUser) {
      if (direction === 'right') {
        likeUserMutation.mutate(
          { userId: currentUser.id, likedId: user.id },
          {
            onSuccess: () => {
              displayNotification({ type: 'success', message: `You liked ${user.username}!` })
            },
            onError: (error) => {
              displayNotification({ type: 'error', message: `Error:${error.message}` })
            },
          },
        )
      } else {
        dislikeUserMutation.mutate(
          { userId: currentUser.id, likedId: user.id },
          {
            onSuccess: () => {
              displayNotification({ type: 'success', message: `You ignored ${user.username}!` })
            },
            onError: (error) => {
              displayNotification({ type: 'error', message: `Error:${error.message}` })
            },
          },
        )
      }
    }
  }

  return (
    <StyledTinderCard onSwipe={onSwipe} preventSwipe={['up', 'down']} disabled={!currentUser}>
      <RelativeBox>
        <Typography variant="h4" color="primary.contrastText" sx={{ position: 'absolute', right: 20, bottom: 10 }}>
          {user.username}
        </Typography>

        <ImageBox
          component="img"
          alt={user.username}
          src={
            user.profileUrl ||
            'https://steamuserimages-a.akamaihd.net/ugc/1644340994747007967/853B20CD7694F5CF40E83AAC670572A3FE1E3D35/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
          }
        />
      </RelativeBox>
      <PaddingBox>
        <RichTextDisplay value={user.userDetails} />
        <FlexEndBox sx={{ mr: 2, mt: 'auto', mb: 2 }}>
          <FavoriteRoundedIcon color="secondary" sx={{ mr: 2 }} />
          <Typography variant="h5" color="primary.contrastText">
            {user.likedBy.length}
          </Typography>
        </FlexEndBox>
      </PaddingBox>
    </StyledTinderCard>
  )
}

export default UserCard
