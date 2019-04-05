import * as React from "react";


type SquareProps = {
    className: string;
    onClick: Function;
    squareIndex: number;
    value: string | undefined;
};


export class Square extends React.Component<SquareProps> {
    render() {
        return (
            <div
                className={this.props.className}
                onClick={() => this.props.onClick(this.props.squareIndex)}
            >
                {this.props.value}
            </div>
        );
    }
}
