import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PanelChart from './Pages/PanelChart'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel-chart/:cardId" element={<PanelChart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
