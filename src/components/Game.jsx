import React from 'react';
import Board from './Board.jsx';
import Timer from './Timer.jsx';
import SettingsInput from './input/SettingsInput.jsx';
import { initializeBoard, toggleFlagged, uncoveredMine, uncoverTiles, getFlagCount, checkForLoss, checkForWin } from '../GameLogic.jsx'

var GameStates = { "WON": 1, "LOSS": 2, "PLAYING": 3 };

class Game extends React.Component {

    constructor(props) {
        super(props);

        const settings = {
            width: 10,
            height: 10,
            mineCount: 15
        };

        const tiles = initializeBoard(settings);

        const timer = this.startTimer();

        this.state = {
            gameState: GameStates.PLAYING,
            settings: settings,
            tiles: tiles,
            timer: timer
        };
    }

    startTimer() {
        var intervalId = setInterval(() => {
            var newMinute = this.state.timer.minutes;
            var newSecond = this.state.timer.seconds += 1;

            if (newSecond >= 60) {
                newSecond = 0;
                newMinute += 1;
            }

            this.setState({
                timer: {
                    seconds: newSecond,
                    minutes: newMinute,
                    intervalId: this.state.timer.intervalId
                }
            });

        }, 1000);

        return {
            seconds: 0,
            minutes: 0,
            intervalId: intervalId
        };
    }

    showBoard(tiles) {
        tiles.forEach((row, i) => {
            row.forEach((tile, j) => {
                tiles[i][j].sweeped = true;
            });
        });

        this.setState({ tiles: tiles });
    }

    sweepTile(i, j) {
        const tiles = this.state.tiles.slice();

        uncoverTiles(tiles, i, j);

        var lost = uncoveredMine(tiles, i, j);
        
        if (lost) {
            clearInterval(this.state.timer.intervalId);
            this.showBoard(tiles);
            this.setState({gameState: GameStates.LOSS})
        } 

        this.setState({ tiles: tiles });
    }

    flagTile(e, i, j) {
        const tiles = this.state.tiles.slice();

        toggleFlagged(tiles, i, j);

        this.setState({ tiles: tiles });
        e.preventDefault();
    }

    onSettingsChange(event, type) {

        var settings = this.state.settings;

        switch (type) {
            case "WIDTH":
                settings.width = event.target.value;
                break;
            case "HEIGHT":
                settings.height = event.target.value;
                break;
            case "MINECOUNT":
                settings.mineCount = event.target.value;
                break;
            default:
                return;
        }

        this.setState({ settings: settings });
    }

    onRestart() {
        const newTimer = this.startTimer()
        const newTiles = initializeBoard(this.state.settings);

        this.setState({
            tiles: newTiles,
            timer: newTimer,
            gameState: GameStates.PLAYING
        });
    }

    render() {

        const isGameLost = () => {
            return this.state.gameState === GameStates.LOSS;
        };

        const isGameWon = () => {
            return this.state.gameState === GameStates.WON;
        };
        
        if(!isGameWon() && checkForWin(this.state.tiles, this.state.settings.mineCount, this.state.settings.width * this.state.settings.height)) {
            clearInterval(this.state.timer.intervalId);
            this.setState({gameState: GameStates.WON})
        }

        const flagCount = getFlagCount(this.state.tiles);

        return (
            <div>
                <div className="game-settings">
                    <SettingsInput
                        {...this.state.settings}
                        onSettingsChange={(event, type) => this.onSettingsChange(event, type)}
                        onRestart={() => this.onRestart()}
                    />
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            tiles={this.state.tiles}
                            onLeftClick={(i, j) => this.sweepTile(i, j)}
                            onRightClick={(e, i, j) => this.flagTile(e, i, j)}
                        />
                    </div>
                    <div className="game-info">
                        <div>
                            <Timer {...this.state.timer} />
                        </div>
                        <div>
                            <i className="fas fa-flag flag"></i>: {flagCount}
                        </div>
                        <div className={" " + (isGameLost() ? " lost " : " hidden ")}>
                            LOST
                        </div>
                        <div className={" " + (isGameWon() ? " won " : " hidden ")}>
                            WON
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;