import * as React from 'react'
import { Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function MyApp() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 1,
      }}
    >
      <h4>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Contact Manager
        </Link>
      </h4>
      <div>
        {theme.palette.mode}
        <IconButton
          sx={{ ml: 1, marginRight: '20px' }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <Button variant="contained" endIcon={<LogoutIcon />}>
          <Link
            to="/signin"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Logout
          </Link>
        </Button>
      </div>
    </Box>
  )
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light')

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
