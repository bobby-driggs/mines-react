import React from 'react';
import Tile from './Tile.jsx';

class Board extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTile(i, j) {
        return (
            <Tile key={j} 
                {...this.props.tiles[i][j]} 
                onClick={() => this.props.onLeftClick(i, j)} 
                onContextMenu={(e) => this.props.onRightClick(e, i, j)} 
            />
        );
    }

    render() {

        return (
            <div>
                {this.props.tiles.map((row, i) =>
                    <div className="board-row" key={i}>
                        {row.map((col, j) =>
                            this.renderTile(i, j)
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Board;