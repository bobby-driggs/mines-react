import React from 'react';

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        var displayText = "";
        
        if (this.props.flagged) {
            displayText = '<i class="fas fa-flag flag"></i>';
        } else if (this.props.sweeped) {
            if (this.props.hasMine) {
                displayText = '<i class="fas fa-bomb"></i>';
            } else if (this.props.mineCount == 0) {
                displayText = '<div style="width: 100%; height: 100%; background-color: #ccc;">&nbsp;</div>';
            } else {
                displayText = '<span class="num-' + this.props.mineCount + '">' + this.props.mineCount + '</span>';
            }
        }

        return (
            <button className="square" onClick={() => this.props.onClick()} onContextMenu={(event) => this.props.onContextMenu(event)} dangerouslySetInnerHTML={{__html: displayText}}>
                
            </button>
        );
    }
}

export default Tile;