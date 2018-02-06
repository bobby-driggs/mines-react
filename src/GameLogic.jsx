export function uncoveredMine(tiles, i, j) {
    const t = tiles[i][j];
    return t.sweeped && t.hasMine;
};

export function uncoverTiles(tiles, i, j) {

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

        tiles[left] && tiles[left][up] && uncoverTiles(tiles, left, up);
        tiles[left] && tiles[left][j] && uncoverTiles(tiles, left, j);
        tiles[left] && tiles[left][down] && uncoverTiles(tiles, left, down);
        tiles[i] && tiles[i][up] && uncoverTiles(tiles, i, up);

        tiles[i] && tiles[i][down] && uncoverTiles(tiles, i, down);
        tiles[right] && tiles[right][up] && uncoverTiles(tiles, right, up);
        tiles[right] && tiles[right][j] && uncoverTiles(tiles, right, j);
        tiles[right] && tiles[right][down] && uncoverTiles(tiles, right, down);
    }
};

export function toggleFlagged(tiles, i, j) {

    var tile = tiles[i][j];
    if(tile.sweeped) {
        // if we have been uncovered, lets ignore this event
        return;
    }

    var isFlagged = !tile.flagged;
    tiles[i][j] = { ...tile, ...{ flagged: isFlagged } }

    return isFlagged;
}

export function getFlagCount(tiles) {
    var flagCount = 0;

    if(!tiles || tiles.count <= 0) {
        return flagCount;
    }

    tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            if(tile.flagged == true) {
                flagCount += 1;
            }
        });
    });

    return flagCount;
}

export function initializeBoard(properties) {
    var props = {};

    props.width = parseInt(properties.width);
    props.height = parseInt(properties.height);
    props.mineCount = parseInt(properties.mineCount);

    if(props.width * props.height <= props.mineCount) {
        return [];
    }

    var tiles = Array(props.height).fill(null).map(() => Array(props.width).fill({
        adjacentMines: 0,
        hasMine: false
    }));

    var i = props.mineCount;
    while (i > 0) {
        var x = Math.floor(Math.random() * props.height);
        var y = Math.floor(Math.random() * props.width);

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

    return tiles;
}

export function analyzeMines(tiles, i, j) {
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

    tiles[i][j] = {
        ...t, ...{
            i: i,
            j: j,
            mineCount: mineCount,
            sweeped: false,
            flagged: false
        }
    };
}

export function checkForWin(tiles, totalMineCount, boardSize) {

    var runningMineCount = 0;
    var runningSweptCount = 0;

    tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            
            var t = tiles[i][j];
            if (t.hasMine && !t.sweeped) {
                runningMineCount += 1;
            } else if (t.sweeped) {
                runningSweptCount += 1;
            }

        });
    });

    return totalMineCount === runningMineCount && runningSweptCount === (boardSize - totalMineCount);
}

export function checkForLoss(tiles) {
    tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            
            var t = tiles[i][j];
            if (t.hasMine && t.sweeped) {
                return true;
            }

        });
    });

    return false;
}