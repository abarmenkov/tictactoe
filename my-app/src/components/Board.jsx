import React from 'react';
import Square from './Square';

const Board = (props) => {
    const renderSquare = (i) => {
      return (
      <Square 
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
      winline={props.winline}
      index={i}
      cellIndex={props.cellIndex}
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
      const row = <div className="board-row">{cols}</div>;
      rows.push(row);
    }
  
    return (
      <div>
      {rows}
      </div>
    );
  }

export default Board;
