import './App.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './pages/Home';
import { useEffect } from 'react';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Preview from './pages/Preview';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/:user' element={<Preview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
