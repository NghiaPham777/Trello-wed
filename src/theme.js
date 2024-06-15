import { createTheme } from '@mui/material/styles';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors';


// Create a theme instance.
const theme = extendTheme({
    colorSchemes: {
      // light: {
      //   palette: {
      //     primary: teal,
      //     secondary: deepOrange,
      //   }
      // },
      // dark: {
      //   palette: {
      //     primary: cyan,
      //     secondary: orange,
      //   }
      // },
    },
    trello: {
      appBarHeight: "58px",
      boardBarHeight: "60px"
    },
    components: {
      MuiCssBaseline:{
        styleOverrides: {
          body: {
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: '#dcdde1',
              borderRadius: '8px',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'white',
            },
          }
        }
      },
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            textTransform: 'none',
            borderWidth: '0.5px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          // Name of the slot
          root: {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '& fieldset': {
              borderWidth: '0.5px !important',
            },
            '&:hover fieldset': {
              borderWidth: '2px !important',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px !important',
            },
          }
        },
      },
    },
  })

export default theme;