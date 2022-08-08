import isEqual from "lodash.isequal";
import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { MovesAnalyzer } from "./movesAnalyzer";
import { Position } from "./position";
import { Void } from "./void";

export class Bishop implements Piece {
    unicode = `♝`;
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        let movesAnalyzer = new MovesAnalyzer() 
        return movesAnalyzer.diagonalMoves(position, this, game)
    }

    move(currentPosition: Position, finalPosition: Position, game: Game) : Piece[][]{
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        if(possibleMoves.some(position => isEqual(position,finalPosition))) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPosition.line][finalPosition.column] = new Bishop(finalPosition, this.color)
            console.log(`aqui`)
        }
        return game.board
    }
}