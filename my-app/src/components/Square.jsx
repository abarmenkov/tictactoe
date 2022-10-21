import React, { useContext }from 'react';
import '../index.css';
import GameContext from '../context/GameContext';
import calculateWinner from '../utils/calculateWinner';
import {
  Col
} from 'react-bootstrap';


const Square = (props) => {
    const [gameState, setGameState] = useContext(GameContext);
    const history = gameState.history;
    const current = history[gameState.stepNumber];
    const calculation = calculateWinner(current.squares);
    let winline;
    if (calculation) {
      [ , winline ]  = calculation;
    } else {
      winline = null;
    }
    const squares = current.squares.slice();

    const handleClick = (i) => {
        const history = gameState.history.slice(0, gameState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = gameState.xIsNext ? 'X' : '0';
        setGameState({
            history: history.concat([{
            squares: squares,
            cellIndex: i,
            }]),
            stepNumber: history.length,
            xIsNext: !gameState.xIsNext,
        })
    }


    const style = winline &&  winline.includes(props.index) ? {color: 'red', backgroundColor: 'pink'} : props.index === current.cellIndex ? {color: 'blue', backgroundColor: 'yellow'} : {color: 'black', backgroundColor: 'yellow'};

      return (
        <Col as='button' className='square' key={props.index}
        onClick={() => handleClick(props.value)}
        style={style}>
          {squares[props.value]}
        </Col>
      );
    }

export default Square;
