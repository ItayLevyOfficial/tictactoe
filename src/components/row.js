import React from "react";
import {Square} from "./square"
export function Row(props) {
  const rowSquares = Array.from(
    Array(3),
    (_, columnIndex) => (
      <Square
        key={columnIndex}
        onClick={() => props.onClick(columnIndex)}
        value={props.rowSquares[columnIndex]}
        isWinningSquare={props.winningSquares.includes(columnIndex)}
      />));
  
  return (
    <div className="board-row">
      {rowSquares}
    </div>
  )
}

