import { createContext, useState } from 'react'
import Canvas from './components/Canvas'
import Options from './components/Options'
import { Box, Container, ThemeProvider, createTheme } from '@mui/material'

export const RendererContext = createContext(null) 

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#cf6bdd',
        dark: '#101820',
      },
      secondary: {
        main: '#eedaea',
      },
      background: {
        default: '#292136',
      },
    },
  })

  const [renderer, setRenderer] = useState(null)

  return (
    <RendererContext.Provider value={{renderer, setRenderer}}>
      <ThemeProvider
        theme={theme}
      >
        <Box 
        width={"100vw"} 
        height={"100vh"} 
        position={"relative"}
        sx={{
          display:"flex",
          justifyContent:"center",
        }}
        >
              <Options/>
              <Canvas/>
        </Box>
      </ThemeProvider>
    </RendererContext.Provider>
  )
}

export default App
