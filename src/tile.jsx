import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        var displayText = "";

        if (this.props.sweeped) {
            if (this.props.hasMine) {
                displayText = "*";
            } else if (this.props.mineCount == 0) {
                displayText = "0";
            } else {
                displayText = this.props.mineCount;
            }
        }

        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {displayText}
            </button>
        );
    }
}

export default Tile;