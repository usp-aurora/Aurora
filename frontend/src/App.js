import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonCard from './components/Development/PokemonCard';
import NotFoundPage from './components/Development/NotFoundPage';
import TestCompletionBar from './components/Development/TestCompletionBar';
import Header from './components/Header/Header';
import TestButtons from './components/Development/TestButtons'
import AddDisciplinePopUp from './components/PopUps/AddDisciplinePopUp';
import CoursePopUp from './components/PopUps/CoursePopUp'
import DragAndDrop from './components/Development/DragAndDrop';


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
        <Route path="/popup" element={<AddDisciplinePopUp />} />
        <Route path="/popup2" element={<CoursePopUp pokeball={"#C2DCF5"} pokemonURL="/pokemons/ditto.png" />} />
        <Route path="/drag" element={<DragAndDrop />} />
      </Routes>
    </Router>
  );
}

export default App;