import React from 'react';
import Board from './Board.jsx';
import SettingsInput from './input/SettingsInput.jsx';

class Game extends React.Component {

    constructor(props) {
        super(props);

        const settings = {
            width: 10,
            height: 10,
            mineCount: 15
        };

        this.state = {
            settings: JSON.parse(JSON.stringify(settings)),
            gamesettings: JSON.parse(JSON.stringify(settings))
        };
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
        
        this.setState({ 
            ...this.state, 
            ...{ settings: this.state.settings } 
        });
    }

    onRestart() {
        this.setState({ 
            ...this.state, 
            ...{ gamesettings: this.state.settings } 
        });
    }

    render() {

        const settings = this.state.settings;

        return (
            <div>
                <div className="game-settings">
                    <SettingsInput {...this.state.settings} onSettingsChange={(event, type) => this.onSettingsChange(event, type) } onRestart={() => this.onRestart()} />
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board { ...this.state.gamesettings } />
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