import { FC, useState } from 'react';
import { BrowserRouter as  Router, Navigate ,Route, Routes } from "react-router-dom";
//components
import { Index } from './pages';
import { Addmin } from './pages/addmin';


const App: FC = () => {
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/th/" element={ <Index />}/>
          <Route path="/th/admin" element={ <Addmin />}/>
          <Route path="*" element={<Navigate to="/th" />} />
        </Routes>
      </Router>
    </div>
  )
} 

export default App ;