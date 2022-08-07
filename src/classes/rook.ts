import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { Pawn } from "./pawn";
import { Position } from "./position";
import { Void } from "./void";


export class Rook implements Piece {
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        throw new Error("Method not implemented.");
    }

    move(currentPosition: Position, finalPosition: Position, game: Game): void {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        if(possibleMoves.includes(finalPosition)) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPosition.line][finalPosition.column] = new Pawn(finalPosition, this.color)
        }
    }
}