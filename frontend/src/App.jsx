import React from 'react'
import { Routes, Route } from "react-router-dom";
import ResumeForm from './Components/ResumeForm'

import Home from './Components/Home'

const App = () => {
  return (
   <>
    <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/resumeform" element={<ResumeForm />} />

    </Routes>
   </>
  )
}

export default App