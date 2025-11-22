import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ProcessingProvider } from './context/ProcessingContext'
import NavBar from './components/NavBar'
import Home from './components/Home'
import HowItWorks from './components/HowItWorks'
import UploadFile from './components/UploadFile'
import Process from './components/Process'
import Results from './components/Results'

function App() {
  return (
    <ProcessingProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howto" element={<HowItWorks />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/process" element={<Process />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </ProcessingProvider>
  )
}

export default App
