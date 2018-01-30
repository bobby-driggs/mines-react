import React from 'react';
import Board from './board.jsx';
import Settings from './settings.jsx';
import './index.css';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 10,
            height: 10,
            mineCount: 15
        };
    }


    render() {
        return (
            <div>
                <div className="game-settings">
                    <Settings />
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board width={this.state.width} height={this.state.height} mineCount={this.state.mineCount} />
                    </div>
                    <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;