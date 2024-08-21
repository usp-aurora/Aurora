import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonCard from './components/Development/PokemonCard';
import NotFoundPage from './components/Development/NotFoundPage';
import TestCompletionBar from './components/Development/TestCompletionBar';
import Header from './components/Header/Header';
import TestButtons from './components/Development/TestButtons'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pokemon-card" element={<PokemonCard />} />
        <Route path="/completion-bar" element={<TestCompletionBar />} />
        <Route path="/header" element={<Header />} />
        <Route path="/*" element={< NotFoundPage />} />
        <Route path="/botao" element={<TestButtons />} />
      </Routes>
    </Router>
  );
}

export default App;