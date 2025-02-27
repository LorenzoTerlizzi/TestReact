import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import Persona from './components/Persona';
import Assenza from './components/Assenza';
import Attivita from './components/Attivita';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/assenza" element={<Assenza />} />
        <Route path="/attivita" element={<Attivita />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;