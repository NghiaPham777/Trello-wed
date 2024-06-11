import ModeSelect from '~/components/ModeSelect'
import  Box  from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon} from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menu/WorkSpaces'
import Recent from './Menu/Recent'
import Templates from './Menu/Templates'
import Starred from './Menu/Starred'
import Profiles from './Menu/Profiles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  return (
    <Box px={2} sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
        <AppsIcon sx={{ color: 'primary.main' }}/> 
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }}/>
          <Typography sx={{ fontSize:'1.2rem', fontWeight:'bold', color: 'primary.main' }}>Trello</Typography>
        </Box>

        <WorkSpaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Create</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
        <TextField id="outlined-search" label="Search..." type="search" size='small'/>
        <ModeSelect sx={{ color: 'primary.main' }}/>

        <Tooltip title="Notifications" placement="bottom-end">
          <Badge color="secondary" variant="dot"  sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </Tooltip>
        
        <Tooltip title="Help" placement="bottom-end">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }}/>
        </Tooltip>

        <Profiles sx={{ cursor: 'pointer' }}/>
      </Box>
    </Box>
  )
}

export default AppBar
