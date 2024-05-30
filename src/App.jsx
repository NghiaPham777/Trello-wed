
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import {  useColorScheme,} from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}
function App() {
  return (
    <>
    <ModeToggle></ModeToggle>
    <hr />
    <div>Pham Huu Nghia</div>

    <Typography variant='body' color="text.secondary">Test Typography</Typography> 
    <br></br>

    <Button variant="text">Text</Button>
    <Button variant="contained">Contained</Button>

    <Button variant="outlined">Outlined</Button>  
    <AccessAlarmIcon></AccessAlarmIcon>
    <ThreeDRotation></ThreeDRotation>

    </>
  )

}

export default App
