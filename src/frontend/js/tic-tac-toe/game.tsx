import * as React from "react";
import {Board} from "./board";


export type GameState = {
    rowCount: number;
    colCount: number;
    players: string[];
    nextPlayer: number;
    history: GamePosition[];
    currentMove: number;
    winLine: number[];
};


export interface GamePosition {
    squares: Array<string | undefined>;
    change: string;
}


export interface Winner {
    player: string | undefined;
    line: number[];
}

export type SquareClick = (
    squareIndex: number
) => void;


export class Game extends React.Component<{}, GameState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            rowCount: 3,
            colCount: 3,
            players: ["X", "Y"],
            nextPlayer: 0,
            history: [],
            currentMove: 0,
            winLine: []
        };

        this.move = this.move.bind(this);
    }

    public render(): JSX.Element {
        let squares: GamePosition["squares"];

        if (this.state.history.length) {
            squares = this.state.history[this.state.history.length - 1].squares;
        } else {
            squares = [];
        }

        return (
            <div
                className="custom-game-container"
            >
                <Board
                    rowCount={this.state.rowCount}
                    colCount={this.state.colCount}
                    squares={squares}
                    squareClick={this.move}
                    winLine={this.state.winLine}
                />
            </div>
        );
    }

    protected move: SquareClick = (squareIndex) => {
        let history: GamePosition[];

        if (this.state.history.length) {
            history = this.state.history.slice(0, this.state.currentMove + 1);
        } else {
            history = [{
                squares: new Array(this.state.rowCount * this.state.colCount).fill(undefined),
                change: ""
            }];
        }

        const squares = history[history.length - 1].squares.slice();

        if (squares[squareIndex] || this.state.winLine.length) {
            return;
        }

        let nextPlayer = this.state.nextPlayer;

        if (nextPlayer >= this.state.players.length) {
            nextPlayer = 0;
        }

        const player = this.state.players[nextPlayer];
        const change = (
            `${player} to ${squareIndex}`
        );

        squares[squareIndex] = player;
        nextPlayer++;
        history = history.concat([{
            squares: squares,
            change: change
        }]);
        const winner = this.determineWinner(squares);

        this.setState({
            history: history,
            nextPlayer: nextPlayer,
            currentMove: history.length,
            winLine: winner.line
        });
    }

    protected determineWinner(squares: GamePosition["squares"]): Winner {
        const isWin = (i: number, value: number): boolean => {
            return (!!squares[i] && squares[i] === squares[value]);
        };

        if (this.state.rowCount === this.state.colCount) {
            const diagonalLeft = Array.from({length: this.state.rowCount}, (_value, index) => {
                return ((this.state.rowCount + 1) * index);
            });
            let i = diagonalLeft[0];
            const leftIsWin = diagonalLeft.every((value) => {
                return isWin(i, value);
            });

            if (leftIsWin) {
                return {
                    player: squares[i],
                    line: diagonalLeft
                };
            }

            const diagonalRight = Array.from({length: this.state.rowCount}, (_value, index) => {
                return ((this.state.rowCount - 1) * (index + 1));
            });
            i = diagonalRight[0];
            const rightIsWin = diagonalRight.every((value) => {
                return isWin(i, value);
            });

            if (rightIsWin) {
                return {
                    player: squares[i],
                    line: diagonalRight
                };
            }
        }

        for (let i = 0; i !== this.state.rowCount; i++) {
            const row = Array.from({length: this.state.colCount}, (_value, index) => {
                return (index + this.state.colCount * i);
            });
            const j = row[0];
            const rowIsWin = row.every((value: number) => {
                return isWin(j, value);
            });

            if (rowIsWin) {
                return {
                    player: squares[j],
                    line: row
                };
            }
        }

        for (let i = 0; i !== this.state.colCount; i++) {
            const col = Array.from({length: this.state.rowCount}, (_value, index) => {
                return (i + this.state.colCount * index);
            });
            const j = col[0];
            const colIsWin = col.every((value: number) => {
                return isWin(j, value);
            });

            if (colIsWin) {
                return {
                    player: squares[j],
                    line: col
                };
            }
        }

        return {
            player: undefined,
            line: []
        };
    }
}
