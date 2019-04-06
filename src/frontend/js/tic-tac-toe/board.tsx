import * as React from "react";
import {GameState, GamePosition, SquareClick} from "./game";
import {Square} from "./square";


type BoardProps = {
    rowCount: GameState["rowCount"];
    colCount: GameState["colCount"];
    squares: GamePosition["squares"];
    squareClick: SquareClick;
    winLine: GameState["winLine"]
};


export class Board extends React.Component<BoardProps, {}> {
    constructor(props: Readonly<BoardProps>) {
        super(props);
    }

    public render(): JSX.Element {
        let squareIndex = 0;

        const rows = new Array(this.props.rowCount).fill(null).map((_value, rowIndex) => {
            const cols = new Array(this.props.colCount).fill(null).map((_value, colIndex) => {
                const element = (
                    <Square
                        key={`col-${rowIndex}-${colIndex}`}
                        value={this.props.squares[squareIndex]}
                        onClick={this.props.squareClick}
                        squareIndex={squareIndex}
                        isWin={this.props.winLine.includes(squareIndex)}
                    />
                );

                squareIndex++;

                return element;
            });

            return (
                <div
                    key={`row-${rowIndex}`}
                    className="custom-game-row"
                >
                    {cols}
                </div>
            );
        });

        return (
            <div
                className="custom-game-board"
            >
                {rows}
            </div>
        );
    }
}
