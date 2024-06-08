import { createTheme } from '@mui/material/styles';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors';


// Create a theme instance.
const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: teal,
          secondary: deepOrange,
        }
      },
      dark: {
        palette: {
          primary: cyan,
          secondary: orange,
        }
      },
    },
    trello: {
      appBarHeight: "58px",
      boardBarHeight: "60px"
    },
  })

export default theme;