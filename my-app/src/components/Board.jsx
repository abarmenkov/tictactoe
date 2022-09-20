import React from 'react';
import Square from './Square';

const Board = () => {
    const renderSquare = (i) => {
      return (
      <Square
      key={i}
      value={i}
      index={i}
      />
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
      const row = <div key={i} className="board-row">{cols}</div>;
      rows.push(row);
    }
  
    return (
      <div>
      {rows}
      </div>
    );
  }

export default Board;
