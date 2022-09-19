import React, { Component }from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import { withTranslation } from 'react-i18next';
import {
  Button, Card, Container
} from 'react-bootstrap';


class Gamecomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        cellIndex: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

handleClick(i) {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : '0';
  this.setState({
    history: history.concat([{
      squares: squares,
      cellIndex: i,
    }]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  restart() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        cellIndex: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    })
  };

  render() {
    const { t } = this.props;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const calculation = calculateWinner(current.squares);
    let winner;
    let winline;
    if (calculation) {
      [ winner, winline ]  = calculation;
    } else {
      winner = calculation;
      winline = null;
    }

    const moves = history.filter((step, move) => move !== 0)
    .map((step, move) => {
      const stepNum = move + 1;
      const desc = `${t('buttons.toMove')}${stepNum}`;
      const style = stepNum === this.state.stepNumber ? {backgroundColor: 'yellow', color: 'black'} : {backgroundColor: ''};
      return (
        <li key={stepNum}>
          <Button className="mb-1" onClick={() => this.jumpTo(stepNum)} style={style}>{desc}</Button>
        </li>
      )
    });


    const status = winner ? `${t('header.infoWinner')}${winner}` : !winner && history.length === 10 ? `${t('header.infoDraw')}` : `${t('header.infoNextPlayer')}${this.state.xIsNext ? 'X' : '0'}`;

    const Restart = () => <Button className="mb-4" onClick={() => this.restart()} disabled={history.length > 1 ? false : true}>{t('buttons.restart')}</Button>;

    return ( 
      <>
        <Container className="d-flex justify-content-around mt-5">
              <Card className="shadow-sm" style={{ width: '16rem', height: '28rem', backgroundColor: 'lightgray'}}>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }} className="mb-2">
                    <Restart />
                  </Card.Title>
                  <Card.Text>
                    <Board 
                      squares={current.squares}
                      onClick={(i) => this.handleClick(i)}
                      winline={winline}
                      cellIndex={current.cellIndex}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="shadow-sm" style={{ width: '16rem', height: '28rem', backgroundColor: 'lightgray' }}>
                <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                <strong>{status}</strong>
                </Card.Title>
                <Card.Text>
                  <ol>{moves}</ol>
                </Card.Text> 
                </Card.Body>
              </Card>
        </Container>
    </>
    );
  }
}

const Game = withTranslation()(Gamecomponent);

export default Game;
