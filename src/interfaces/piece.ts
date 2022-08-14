import { Position } from "../classes/position";
import { Game } from "../game";
import { color } from "../types/types";

export interface Piece {
    unicode : string
    position : Position;
    color: color;
    setPossibleMoves(position: Position, game: Game):Array<Position>;
    move(currentPosition: Position, 
        finalPosition: Position, 
        game: Game, 
        castling_K?:boolean, 
        castling_Q?:boolean): Piece[][];
}