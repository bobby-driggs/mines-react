import React from 'react';
import Board from './Board.jsx';
import SettingsInput from './input/SettingsInput.jsx';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: {
                width: 10,
                height: 10,
                mineCount: 15
            }
        };
    }

    onSettingsChange(event, type) {
    
        const settings = this.state.settings;

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

        this.setState({
            settings: settings
        });
    }

    render() {

        const settings = this.state.settings;


        console.log(settings.width, settings.height, settings.mineCount)

        return (
            <div>
                <div className="game-settings">
                    <SettingsInput width={settings.width} height={settings.height} mineCount={settings.mineCount} onSettingsChange={(event, type) => this.onSettingsChange(event, type) } />
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board width={settings.width} height={settings.height} mineCount={settings.mineCount} />
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