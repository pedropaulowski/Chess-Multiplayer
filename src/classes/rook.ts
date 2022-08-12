import isEqual from "lodash.isequal";
import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { MovesAnalyzer } from "./movesAnalyzer";
import { Position } from "./position";
import { Void } from "./void";


export class Rook implements Piece {
    unicode = `♜`;
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        let movesAnalyzer = new MovesAnalyzer() 
        return (
            movesAnalyzer.horizontalMoves(position, this, game), 
            movesAnalyzer.verticalMoves(position, this, game)
        )
    }

    move(currentPosition: Position, finalPosition: Position, game: Game, castling_K?:boolean, castling_Q?:boolean): Piece[][] {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        let finalPositionObj = new Position(finalPosition.line, finalPosition.column)
        
        if(castling_K == true) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new Rook(finalPositionObj, this.color)

            let movesAnalyzer = new MovesAnalyzer() 
            movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, false, false, false, false, true)


            return game.board

        } else if (castling_Q == true) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new Rook(finalPositionObj, this.color)

            let movesAnalyzer = new MovesAnalyzer() 
            movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, false, false, false, true, false)

            return game.board
        }


        if(possibleMoves.some(position => isEqual(position, finalPositionObj))) {

            let movesAnalyzer = new MovesAnalyzer()    
            let possibleMoves = this.setPossibleMoves(finalPosition, game)
            movesAnalyzer = new MovesAnalyzer()
            let checkBoolean = movesAnalyzer.isCheck(possibleMoves, game)


            if(game.board[finalPositionObj.line][finalPositionObj.column].constructor.name == `Void`) {
                movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, false, checkBoolean)
            } else {
                movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, true, checkBoolean)
            }


            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new Rook(finalPositionObj, this.color)
        }


        return game.board
    }
}