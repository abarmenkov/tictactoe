import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import GameProvider from './context/GameProvider';

const App = () => {
    return (
        <div className="h-100 d-flex flex-column">
        <GameProvider>
          <Header />
          <Game />
        </GameProvider>
        </div>
    )
}

export default App;
