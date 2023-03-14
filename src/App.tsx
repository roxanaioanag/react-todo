
import React, { FC, ReactElement } from 'react';
import ToDo from './components/toDo';
import Header from './components/header';
import './App.css';

const App : FC = () : ReactElement => {
  return (
    <div className="App">
      <Header />
      <ToDo />
    </div>
  );
}

export default App;
