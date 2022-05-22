import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Astronauts from './pages/Astronauts/Astronauts';
import Experimental from './pages/Experimental/Experimental';
import Home from './pages/Home/Home';
import BirthdayPicture from './pages/Nasa/BirthdayPicture';
import News from './pages/News/News';

const AppRouting: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/news" element={<News />} />
    <Route path="/astronauts" element={<Astronauts />} />
    <Route path="/experimental" element={<Experimental />} />
    <Route path="/birthday" element={<BirthdayPicture />} />
  </Routes>
);

export default AppRouting;
