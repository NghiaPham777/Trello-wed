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
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            textTransform: 'none',
          },
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          // Name of the slot
          root: ({ theme}) => ({
            color: theme.palette.primary.main,
            fontSize: '0.85rem',
          })
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          // Name of the slot
          root: ({ theme}) => ({
            color: theme.palette.primary.main,
            fontSize: '0.85rem',
            '& fieldset': {
              borderColor: theme.palette.primary.light,
              borderWidth: '1px !important',
            },
            
            '&:hover': {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            },
          })
        },
      },
    },
  })

export default theme;