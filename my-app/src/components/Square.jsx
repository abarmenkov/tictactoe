import React from 'react';
import '../index.css';

const Square = (props) => {
    const style = props.winline &&  props.winline.includes(props.index) ? {color: 'red', backgroundColor: 'pink'} : props.index === props.cellIndex ? {color: 'blue', backgroundColor: 'yellow'} : {color: 'black', backgroundColor: 'yellow'};
      return (
        <button 
        className="square" 
        onClick={props.onClick}
        style={style}>
          {props.value}
        </button>
      );
    }

export default Square;
