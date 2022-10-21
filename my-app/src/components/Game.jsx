import React, { useContext }from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import {
  Button, Card, Container
} from 'react-bootstrap';
import GameContext from '../context/GameContext';
import { useTranslation } from 'react-i18next';


const Game = () => {
const [gameState, setGameState] = useContext(GameContext);
const { t } = useTranslation();

const history = gameState.history;
const current = history[gameState.stepNumber];
const calculation = calculateWinner(current.squares);
let winner;
if (calculation) {
  [ winner, ]  = calculation;
} else {
  winner = calculation;
}

  const jumpTo = (step) => {
    setGameState({
    ...gameState,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  const restart = () => {
    setGameState({
      history: [{
        squares: Array(9).fill(null),
        cellIndex: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    })
  };

    const moves = history.filter((step, move) => move !== 0)
    .map((step, move) => {
      const stepNum = move + 1;
      const desc = `${t('buttons.toMove')}${stepNum}`;
      const style = stepNum === gameState.stepNumber ? {backgroundColor: 'yellow', color: 'black'} : {backgroundColor: ''};
      return (
        <li key={stepNum}>
          <Button className="mb-1" onClick={() => jumpTo(stepNum)} style={style}>{desc}</Button>
        </li>
      )
    });


    const status = winner ? `${t('header.infoWinner')}${winner}` : !winner && history.length === 10 ? `${t('header.infoDraw')}` : `${t('header.infoNextPlayer')}${gameState.xIsNext ? 'X' : '0'}`;

    const Restart = () => <Button className="mb-4" onClick={() => restart()} disabled={history.length > 1 ? false : true}>{t('buttons.restart')}</Button>;

    return ( 
      <>
        <Container className="d-flex justify-content-around mt-5">
              <Card className="shadow-sm" style={{ width: '16rem', height: '28rem', backgroundColor: 'lightgray'}}>
                <Card.Body className="d-flex-row" style={{ textAlign: 'center' }}>
                  <Card.Title className="mb-2">
                    <Restart />
                  </Card.Title>
                  <Card.Text as='div'>
                    <Board 
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="shadow-sm" style={{ width: '16rem', height: '28rem', backgroundColor: 'lightgray' }}>
                <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                <strong>{status}</strong>
                </Card.Title>
                <Card.Text as='div'>
                  <ol>{moves}</ol>
                </Card.Text> 
                </Card.Body>
              </Card>
        </Container>
    </>
    );

}

export default Game;
