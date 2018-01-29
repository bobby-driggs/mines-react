import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './tile.jsx';
import './index.css';

const Constants = {
    width: 10,
    height: 10,
    mineCount: 50,
    tileCount: this.width * this.height
}

function analyzeMines(tiles, i, j) {
    var t = tiles[i][j];

    var left = i - 1;
    var right = i + 1;
    var up = j - 1;
    var down = j + 1;

    var mineCount = 0;

    mineCount += tiles[left] && tiles[left][up] && tiles[left][up].hasMine ? 1 : 0;
    mineCount += tiles[left] && tiles[left][j] && tiles[left][j].hasMine ? 1 : 0;
    mineCount += tiles[left] && tiles[left][down] && tiles[left][down].hasMine ? 1 : 0;
    mineCount += tiles[i] && tiles[i][up] && tiles[i][up].hasMine ? 1 : 0;

    mineCount += tiles[i] && tiles[i][down] && tiles[i][down].hasMine ? 1 : 0;
    mineCount += tiles[right] && tiles[right][up] && tiles[right][up].hasMine ? 1 : 0;
    mineCount += tiles[right] && tiles[right][j] && tiles[right][j].hasMine ? 1 : 0;
    mineCount += tiles[right] && tiles[right][down] && tiles[right][down].hasMine ? 1 : 0;

    tiles[i][j] = { ...t, ...{ 
        i: i, 
        j: j, 
        mineCount: mineCount, 
        sweeped: false, 
        flagged: false } 
    };
}

class Board extends React.Component {

    constructor(props) {
        super(props);

        var tiles = Array(Constants.height).fill(null).map(() => Array(Constants.width).fill({
            adjacentMines: 0,
            hasMine: false
        }));

        var i = Constants.mineCount;
        while (i > 0) {
            var x = Math.floor(Math.random() * Constants.height);
            var y = Math.floor(Math.random() * Constants.width);

            var t = tiles[x][y];
            
            if (!t.hasMine) {
                tiles[x][y] = {
                    adjacentMines: 0,
                    hasMine: true
                };
                --i;
            }
        }

        tiles.forEach((row, i) => {
            row.forEach((tile, j) => {
                analyzeMines(tiles, i, j)
            });
        });

        this.state = {
            tiles: tiles,
        };
    }

    handleClick(i, j) {
        const tiles = this.state.tiles.slice();

        uncoverMines(tiles, i, j);

        var lost = uncoveredMine(tiles);
        if (lost) {
            return;
        }

        this.setState({ tiles: tiles });
    }

    onContextMenu(e, i, j) {
        const tiles = this.state.tiles.slice();

        toggleFlagged(tiles, i, j);

        this.setState({ tiles: tiles });
        e.preventDefault();
      }

    renderTile(i, j) {
        return (
            <Tile key={j} {...this.state.tiles[i][j]} onClick={() => this.handleClick(i, j)} onContextMenu={(e) => this.onContextMenu(e, i, j)} />
        );
    }

    render() {

        return (
            <div>
                {this.state.tiles.map((row, i) =>
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

function uncoveredMine(tiles) {
    tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            if (tiles[i][j].sweeped && tiles[i][j].hasMine) {
                return true;
            }
        });
    });

    return false;
};

function uncoverMines(tiles, i, j) {

    var tile = tiles[i][j];
    if(tile.sweeped || tile.flagged) {
        // if we have been uncovered, or flagged, lets skip ourselves.
        return;
    }

    // uncover the first mine
    tiles[i][j] = { ...tile, ...{ sweeped: true } }

    // uncover its cardinal neighbors, if it was a zero mine instance
    if (tile.mineCount == 0) {
        var left = i - 1;
        var right = i + 1;
        var up = j - 1;
        var down = j + 1;

        tiles[left] && tiles[left][up] && uncoverMines(tiles, left, up);
        tiles[left] && tiles[left][j] && uncoverMines(tiles, left, j);
        tiles[left] && tiles[left][down] && uncoverMines(tiles, left, down);
        tiles[i] && tiles[i][up] && uncoverMines(tiles, i, up);

        tiles[i] && tiles[i][down] && uncoverMines(tiles, i, down);
        tiles[right] && tiles[right][up] && uncoverMines(tiles, right, up);
        tiles[right] && tiles[right][j] && uncoverMines(tiles, right, j);
        tiles[right] && tiles[right][down] && uncoverMines(tiles, right, down);
    }
};

function toggleFlagged(tiles, i, j) {
    var tile = tiles[i][j];
    if(tile.sweeped) {
        // if we have been uncovered, lets ignore this event
        return;
    }

    tiles[i][j] = { ...tile, ...{ flagged: !tile.flagged } }
}

export default Board;