import React from "react";
import {Board} from "./board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      isMovesListReversed: false
    }
  }
  
  displayMoveButton(moveIndex) {
    const history = this.state.history;
    const clickIndex = history[moveIndex].clickIndex;
    const descreption = moveIndex ?
      `Shape: ${moveIndex % 2 === 0 ? 'O' : 'X'},
         Line: ${clickIndex % 3 + 1},
         Row: ${Math.floor(clickIndex / 3) + 1}` :
      `Game start`;
    return (
      <li key={moveIndex}>
        <button
          onClick={() => this.jumpTo(moveIndex)}
          className={history.length - 1 === moveIndex ? 'current-move' : 'not-current-move'}>
          {descreption}
        </button>
      </li>
    )
  }
  
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winningRow = this.calculateWinner();
    const moves = history.map((_, moveIndex) => this.displayMoveButton(moveIndex));
    const status = (
      winningRow ?
        `Winner ${current.squares[winningRow[0]]}` :
        current.squares.filter(Boolean).length === 9 ?
          `Deuce` :
          `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    );
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningRow={winningRow ? winningRow : []}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="toggle-btn" onClick={() => this.toggleMovesList()}>Toggle moves list</button>
          <ol
            reversed={this.state.isMovesListReversed}>
            {this.state.isMovesListReversed ? moves.reverse() : moves}
          </ol>
        </div>
      </div>
    );
  }
  
  toggleMovesList() {
    this.setState(
      {
        isMovesListReversed: !this.state.isMovesListReversed
      }
    )
  }
  
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (!(this.calculateWinner() || squares[i])) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState(
        {
          history: [...history, {squares: squares, clickIndex: i}],
          xIsNext: !this.state.xIsNext,
          stepNumber: this.state.stepNumber + 1
        }
      );
    }
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      history: this.state.history.slice(0, step + 1)
    });
  }
  
  calculateWinner() {
    const squares = this.state.history[this.state.history.length - 1].squares;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }
}