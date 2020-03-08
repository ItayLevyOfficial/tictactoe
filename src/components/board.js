import React from "react";
import {Row} from "./row"

export class Board extends React.Component {
  render() {
    return Array.from(
      Array(3),
      (_, rowIndex) => {
        const rowStartIndex = rowIndex * 3;
        return (
          <Row
            onClick={(columnIndex) => this.props.onClick(rowStartIndex + columnIndex)}
            rowSquares={this.props.squares.slice(rowStartIndex, rowStartIndex + 3)}
            key={rowIndex}
            winningSquares={
              this.props.winningRow.map(squareIndex => squareIndex - rowStartIndex)
            }
          />
        )
      }
    );
  }
}