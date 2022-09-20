import { useState } from "react";
import GameContext from "./GameContext";

const GameProvider = ({ children }) => {
    const initialState = {
        history: [{
          squares: Array(9).fill(null),
          cellIndex: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    const [gameState, setGameState] = useState(initialState);
    return (
        <GameContext.Provider value={[gameState, setGameState]}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;
