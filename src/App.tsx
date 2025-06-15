import { useState } from 'react'
import Form from './components/Form';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { SatelliteProvider } from './components/SatelliteContext';
import Home from './components/Home';
function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
          <SatelliteProvider>
      <Router>
        <Routes>
        <Route path={'/'} element={<Home/>}/>
        
        </Routes>

      </Router>
    </SatelliteProvider>
    </MantineProvider>

  )
}

export default App
