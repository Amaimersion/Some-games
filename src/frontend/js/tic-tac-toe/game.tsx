import * as React from "react";
import {Board} from "./board";


export type GameState = {
    rowCount: number;
    colCount: number;
    players: string[];
    nextPlayer: number;
    history: GamePosition[];
    currentMove: number;
};


export interface GamePosition {
    squares: Array<string | undefined>;
    change: string;
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
            currentMove: 0
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

        if (squares[squareIndex]) {
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

        this.setState({
            history: history,
            nextPlayer: nextPlayer,
            currentMove: history.length
        });
    }
}
