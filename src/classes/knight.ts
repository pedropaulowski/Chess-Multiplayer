import isEqual from "lodash.isequal";
import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { MovesAnalyzer } from "./movesAnalyzer";
import { Position } from "./position";
import { Void } from "./void";

export class Knight implements Piece {
    unicode = `♞`;
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        let movesAnalyzer = new MovesAnalyzer() 
        let possibleMoves = movesAnalyzer.twoOneMoves(position, this, game)
        
        if(possibleMoves != true && possibleMoves != false) {
            // possibleMoves = movesAnalyzer.removeInvalidMoves(this, possibleMoves, game)
            return possibleMoves
        } else 
            return []
        // return movesAnalyzer.twoOneMoves(position, this, game)
    }

    move(currentPosition: Position, finalPosition: Position, game: Game): Piece[][] {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)        
        // possibleMoves.some(position => console.log(position.line, position.column))
        let finalPositionObj = new Position(finalPosition.line, finalPosition.column)
       
        

        if(possibleMoves.some(position => isEqual(position, finalPositionObj))) {

            let movesAnalyzer = new MovesAnalyzer()    
            let possibleMoves = this.setPossibleMoves(finalPosition, game)
            let checkBoolean = movesAnalyzer.isCheck(possibleMoves, game)

            
            if(game.board[finalPositionObj.line][finalPositionObj.column].constructor.name == `Void` ||
            game.board[finalPositionObj.line][finalPositionObj.column].unicode == ``
            ) {
                movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, false, checkBoolean)
            } else {
                movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, true, checkBoolean)
            }

            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new Knight(finalPositionObj, this.color)

            movesAnalyzer.isValidMove(game)

        }

        return game.board
    }
}