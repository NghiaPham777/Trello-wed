import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Card({ temporaryHideMedia }) {
    if (temporaryHideMedia) {
      return (
        <MuiCard sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
            overflow: 'unset'
        }}>
            <CardContent sx={{ p:1.5, '&:last-child': { p:1.5 } }}>
            <Typography>Cart test 01</Typography>
            </CardContent>
        </MuiCard>
      )
    }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/444769983_981213614004123_5569462626602401111_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGW-xUCq_qpmiUiMDW1AiXcOcNCabTTg_Q5w0JptNOD9KQnodyGuW08ooq_n85ZdO4QL9iftT9C38UPIP2wkWAH&_nc_ohc=JEYIDOIq_YIQ7kNvgHjHuR5&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYBGIWzwhHnWZS7h_TnpcNXNmYe6xYunBt4VlPyZHk8kAw&oe=66768490"
        title="green iguana"
      />
      <CardContent sx={{ p:1.5, '&:last-child': { p:1.5 } }}>
        <Typography> NghiaPH </Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button startIcon={<GroupIcon />} size="small">20</Button>
        <Button startIcon={<CommentIcon />} size="small">15</Button>
        <Button startIcon={<AttachmentIcon />} size="small">10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card