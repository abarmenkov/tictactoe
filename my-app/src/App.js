import React from 'react';
import Game from './components/Game';
import Header from './components/Header';

const App = () => {
    return (
        <div className="h-100 d-flex flex-column">
            <Header />
            <Game />
        </div>
    )
}

export default App;
