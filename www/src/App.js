import './App.css'
import { ThemeProvider, theme } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppWrapper from './components/AppWrapper'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      700: '#5897ca'
    }
  }
}

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={customTheme}>
        <AppWrapper />
      </ThemeProvider>
    </Router>
  )
}

export default App
