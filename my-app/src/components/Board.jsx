import React from 'react';
import Square from './Square';
import {
  Row, Container
} from 'react-bootstrap';
import '../index.css';

const Board = () => {
    const renderSquare = (i) => {
      return (
      <Square key={i} value={i} index={i} />
      );
    };
  
    const rows = [];
    let count = 0;
    for (let i = 0; i < 3; i++) {
      const cols = [];
      for (let j = 0; j < 3; j++) {
        const col = renderSquare(count);
        cols.push(col);
        count += 1;
      }
      const row = <Row key={i}>{cols}</Row>;
      rows.push(row);
    }
  
    return (
      <Container>
      {rows}
      </Container>
    );
  }

export default Board;
