import * as React from "react";


type BoardState = {
    rowCount: number;
    colCount: number;
};


export default class Board extends React.Component<{}, BoardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            rowCount: 3,
            colCount: 3
        };
    }

    public render(): JSX.Element {
        const rows = new Array(this.state.rowCount).fill(null).map((_value, rowIndex) => {
            const cols = new Array(this.state.colCount).fill(null).map((_value, colIndex) => {
                return (
                    <div
                        key={`col-${rowIndex}-${colIndex}`}
                        className="custom-game-col"
                    >
                    </div>
                );
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
