import * as React from "react";
import {GameState} from "./game";


type MoveListProps = {
    history: GameState["history"];
    onClick: Function;
    currentMove: GameState["currentMove"];
};


type MoveListState = {
    isReverse: boolean;
};


export class MoveList extends React.Component<MoveListProps, MoveListState> {
    constructor(props: Readonly<MoveListProps>) {
        super(props);

        this.state = {
            isReverse: false
        };
    }

    render(): JSX.Element {
        let history: MoveListProps["history"];

        if (this.state.isReverse) {
            history = this.props.history.slice().reverse();
        } else {
            history = this.props.history;
        }

        const moves = history.map((value, index) => {
            let description = "";
            let className = "";

            if (this.state.isReverse) {
                index = history.length - 1 - index;
            }

            if (value.change) {
                if (index === this.props.currentMove) {
                    description = `Move #${index}: ${value.change}`;
                } else {
                    description = `Go to move #${index}: ${value.change}`;
                }
            } else {
                description = "Game start";
            }

            if (index === this.props.currentMove) {
                className = "custom-active-move";
            }

            return (
                <li
                    key={`move-${index}`}
                    className={className}
                >
                    <button
                        onClick={() => this.props.onClick(index)}
                    >
                        {description}
                    </button>
                </li>
            );
        });

        let firstMove = 0;
        let lastMove = history.length - 1;
        let beforeMove = this.props.currentMove - 1;
        let afterMove = this.props.currentMove + 1;

        if (beforeMove < 0) {
            beforeMove = 0;
        }

        if (afterMove >= history.length) {
            afterMove = lastMove;
        }

        if (this.state.isReverse) {
            [firstMove, lastMove, beforeMove, afterMove] = [lastMove, firstMove, afterMove, beforeMove];
        }

        return (
            <div
                className="custom-move-list"
            >
                <div>
                    <button
                        onClick={() => {
                            this.setState({
                                isReverse: !this.state.isReverse
                            });
                        }}
                    >
                        {this.state.isReverse ? "🡑" : "🡓"}
                    </button>
                </div>

                <div>
                    <button onClick={() => this.props.onClick(firstMove)}>⇐</button>
                    <button onClick={() => this.props.onClick(beforeMove)}>🡐</button>
                    <button onClick={() => this.props.onClick(afterMove)}>🡒</button>
                    <button onClick={() => this.props.onClick(lastMove)}>⇒</button>
                </div>

                <ol
                    start={this.state.isReverse ? history.length - 1 : 0}
                    reversed={this.state.isReverse}
                >
                    {moves}
                </ol>
            </div>
        );
    }
}
