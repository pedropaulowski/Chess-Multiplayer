import { Position } from "../classes/position";
import { Game } from "../game";
import { color } from "../types/types";

export interface Piece {
    position : Position;
    color: color;
    setPossibleMoves(position: Position, game: Game):Array<Position>;
    move(currentPosition: Position, finalPosition: Position, game: Game): Piece[][];
}