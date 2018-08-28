'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculeRotate = exports.getDecale = exports.getSideBlock = exports.getNewEndLine = exports.isLoose = exports.calculDown = exports.getLowerDist = exports.getLowerCoord = undefined;

var _action = require('./actions/action');

var getLowerCoord = exports.getLowerCoord = function getLowerCoord(piece) {
    var tmpValue = -1;

    piece.map(function (p) {
        if (p.y > tmpValue) {
            tmpValue = p.y;
        }
    });
    return tmpValue;
};

var getLowerDist = exports.getLowerDist = function getLowerDist(piece, coord, difference) {
    var tmp = 20;
    piece.coord.map(function (elemt) {
        // si bug c'est && coord.y > elemt.y a retirer
        if (elemt.x == coord.x && coord.y > elemt.y) {
            if (coord.y - elemt.y - 1 < difference) {

                difference = coord.y - elemt.y - 1;
            }
        }
    });
    return difference;
};

var calculDown = exports.calculDown = function calculDown(piece, endLine) {
    var newEndLine = [];

    var difference = 19 - getLowerCoord(piece.coord);
    var i = void 0;
    endLine.map(function (e) {
        i = getLowerDist(piece, e, difference);
        if (difference > i) {
            difference = i;
        }
    });
    piece.coord.forEach(function (elem) {
        endLine.push({ x: elem.x, y: elem.y + difference });
    });

    return endLine;
};

var isLoose = exports.isLoose = function isLoose(table) {
    var i = 0;

    table.forEach(function (elem) {
        if (elem.y < 0) {
            i++;
        }
    });
    if (i == 0) return false;else {
        return true;
    }
};

var getNewEndLine = exports.getNewEndLine = function getNewEndLine(table, dispatch, gameId, malus) {
    var tmptab = [];

    var _loop = function _loop(i) {
        tmptab = table.filter(function (filtre) {
            if (filtre.y < 20 - malus) return filtre.y == table[i].y;
        });
        if (tmptab.length == 10) {
            dispatch((0, _action.sendMalus)(gameId));
            dispatch((0, _action.upScore)());
            table = table.filter(function (remove) {
                return remove.y != tmptab[0].y;
            });
            table.forEach(function (item) {
                if (item.y < tmptab[0].y) {
                    item.y += 1;
                }
            });
            tmptab = [];
        }
    };

    for (var i = 0; i < table.length; i++) {
        _loop(i);
    }
    return table;
};

var getSideBlock = exports.getSideBlock = function getSideBlock(piece, endLine, type) {
    var i = 0;
    endLine.forEach(function (coord) {
        if (coord.x == piece.x - 1 && coord.y == piece.y) {
            i = coord.x;
        } else if (coord.x == piece.x + 1 && coord.y == piece.y) {
            i = coord.x;
        } else if (coord.x == piece.x + 2 && coord.y == piece.y && type == 7) {
            i = coord.x;
        } else if (coord.x == piece.x - 2 && coord.y == piece.y && type == 7) {
            i = coord.x;
        }
    });
    return i;
};

var getDecale = exports.getDecale = function getDecale(piece, endLine) {
    var decale = 0;
    var sideLock = getSideBlock(piece.coord[1], endLine, piece.type);
    console.log('sideLock == ', sideLock);
    switch (piece.type) {
        case 7:
            // regarder aussi combien de piece a a droite si 2 ou 1 en fonction la decalle change, possible de tt faire en 1
            if (piece.coord[1].x == 0 && piece.coord[2].y > piece.coord[1].y) {
                return 2;
            } else if (piece.coord[1].x == 0 && piece.coord[2].y < piece.coord[1].y || piece.coord[1].x == 1 && piece.coord[2].y > piece.coord[1].y) {
                return 1;
            } else if (piece.coord[1].x == 9 && piece.coord[2].y > piece.coord[1].y || piece.coord[1].x == 8 && piece.coord[2].y < piece.coord[1].y) {
                return -1;
            } else if (piece.coord[1].x == 9 && piece.coord[2].y < piece.coord[1].y) {
                return -2;
            } else if (sideLock + 1 == piece.coord[1].x && piece.coord[2].y > piece.coord[1].y && sideLock > 0) {
                return 2;
            } else if (sideLock + 1 == piece.coord[1].x && piece.coord[2].y < piece.coord[1].y || sideLock + 2 == piece.coord[1].x && piece.coord[2].y > piece.coord[1].y && sideLock > 0) {
                return 1;
            } else if (piece.coord[1].x == sideLock - 1 && piece.coord[2].y > piece.coord[1].y || piece.coord[1].x == sideLock - 2 && piece.coord[2].y < piece.coord[1].y && sideLock > 0) {
                return -1;
            } else if (piece.coord[1].x == sideLock - 1 && piece.coord[2].y < piece.coord[1].y && sideLock > 0) {
                return -2;
            }
        default:
            if (piece.coord[1].x == 0) {
                return 1;
            } else if (piece.coord[1].x == 9) {
                return -1;
            } else if (sideLock + 1 == piece.coord[1].x && sideLock > 0) {
                return 1;
            } else if (sideLock - 1 == piece.coord[1].x && sideLock > 0) {
                return -1;
            }
    }
    return decale;
};

var calculeRotate = exports.calculeRotate = function calculeRotate(piece, endLine) {
    // regarder le type de la piece si carre => rien faire + rajouter un x, y 
    //(peut etre que 1 meme) si il est prsent on remonte la piece de ce quq'il faut pour que la rotation se passe mibe            
    if (piece.type != 1) {
        var newPiece = { type: piece.type, coord: [] };
        var tmp_pos = {};
        var decale = getDecale(piece, endLine);
        for (var i = 0; i < piece.coord.length; i++) {
            if (i != 1) {
                var new_x = piece.coord[i].x - piece.coord[1].x;
                var new_y = piece.coord[i].y - piece.coord[1].y;
                var X = Math.round(new_x * Math.cos(Math.PI / 2) - new_y * Math.sin(Math.PI / 2) + piece.coord[1].x) + decale;
                var Y = Math.round(new_x * Math.sin(Math.PI / 2) + new_y * Math.cos(Math.PI / 2) + piece.coord[1].y);
                tmp_pos = { x: X, y: Y };
            } else {
                tmp_pos = { x: piece.coord[i].x + decale, y: piece.coord[i].y };
            }
            newPiece.coord.push(tmp_pos);
            tmp_pos = {};
        }
        return newPiece;
    } else {
        return piece;
    }
};