import * as React from "react";


type SquareProps = {
    onClick: Function;
    squareIndex: number;
    value: string | undefined;
    isWin: boolean;
};


export class Square extends React.Component<SquareProps> {
    render() {
        let className = "custom-game-col";

        if (this.props.isWin) {
            className += " custom-game-col-win";
        }

        return (
            <div
                className={className}
                onClick={() => this.props.onClick(this.props.squareIndex)}
            >
                {this.props.value}
            </div>
        );
    }
}
