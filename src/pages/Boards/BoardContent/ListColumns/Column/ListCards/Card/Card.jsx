import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Card({ card }) {
  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachment?.length
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
      overflow: 'unset'
    }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} /> }
      <CardContent sx={{ p:1.5, '&:last-child': { p:1.5 } }}>
        <Typography> {card?.title} </Typography>
      </CardContent>
      {shouldShowCardAction() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button startIcon={<GroupIcon />} size="small">{card?.memberIds?.length}</Button>
          <Button startIcon={<CommentIcon />} size="small">{card?.comments?.length}</Button>
          <Button startIcon={<AttachmentIcon />} size="small">{card?.comments?.length}</Button>
        </CardActions>}
    </MuiCard>
  )
}

export default Card