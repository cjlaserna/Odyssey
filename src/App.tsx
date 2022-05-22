import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';
import { BrowserRouter, Router, Routes } from 'react-router-dom';
import AppRouting from './components/AppRouting';
import { ColorModeScript, CSSReset, ThemeProvider, ChakraProvider } from '@chakra-ui/react';
import customTheme from './components/customTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <BrowserRouter>
        <Navbar />
        <AppRouting />
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default hot(module)(App);
