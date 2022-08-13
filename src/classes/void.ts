import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { Pawn } from "./pawn";
import { Position } from "./position";

export class Void implements Piece {
    unicode = ``;
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        position
        game
        return []
        // return (
            // movesAnalyzer.horizontalMoves(position, this, game), 
            // movesAnalyzer.verticalMoves(position, this, game)
        // )
    }

    move(currentPosition: Position, finalPosition: Position, game: Game): Piece[][] {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        if(possibleMoves.includes(finalPosition)) {

            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPosition.line][finalPosition.column] = new Pawn(finalPosition, this.color)
        }
        return game.board
    }
}