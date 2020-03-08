import React from "react";

export function Square(props) {
  return (
    <button className={props.isWinningSquare ? "square winning-square" : "square"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

