
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import {  useColorScheme,} from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value
    console.log(selectedMode);
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="lable-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="lable-select-dark-light-mode"
        id="dselect-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: "center", gap: 1}}>
            <DarkModeOutlinedIcon fontSize="small"/>
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: "center", gap: 1}}>
            <LightModeIcon fontSize="small"/>
            Light
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: "center", gap: 1}}>
            <SettingsBrightnessIcon fontSize="small"/>
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
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
    <ModeSelect></ModeSelect>
    <hr></hr>
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
