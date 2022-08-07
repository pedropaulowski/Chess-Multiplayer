import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { MovesAnalyzer } from "./movesAnalyzer";
import { Pawn } from "./pawn";
import { Position } from "./position";
import { Void } from "./void";

export class Queen implements Piece {
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        let movesAnalyzer = new MovesAnalyzer() 
        return (
            movesAnalyzer.diagonalMoves(position, this, game), 
            movesAnalyzer.diagonalMoves(position, this, game), 
            movesAnalyzer.horizontalMoves(position, this, game)
        )
    }

     move(currentPosition: Position, finalPosition: Position, game: Game): void {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        if(possibleMoves.includes(finalPosition)) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPosition.line][finalPosition.column] = new Pawn(finalPosition, this.color)
        }
    }
}