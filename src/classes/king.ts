import isEqual from "lodash.isequal";
import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { MovesAnalyzer } from "./movesAnalyzer";
import { Position } from "./position";
import { Rook } from "./rook";
import { Void } from "./void";


export class King implements Piece {
    unicode = `♚`;
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }
    
    setPossibleMoves(position: Position, game: Game): Position[] {
        /**
         * O rei tem movimento pra todos os lados, mas somente uma casa. Então vou fazer os movimentos possiveis à mão
         */
        // acima direita, acima meio, acima esquerda
        let analyzedMoves = []




        let pos1 = (position.line+1 > 7 || position.column+1 > 7)? new Position(9, 9) : new Position(position.line+1, position.column+1)
        let pos2 = (position.line+1 > 7)? new Position(9, 9)  :new Position(position.line+1, position.column)
        let pos3 = (position.line+1 > 7 || position.column-1 < 0)? new Position(9, 9)  : new Position(position.line+1, position.column-1)
        // mesma linha a direita e a esquerda
        let pos4 = (position.column+1 > 7)? new Position(9, 9)  : new Position(position.line, position.column+1)
        let pos5 = (position.column-1 < 0)? new Position(9, 9)  : new Position(position.line, position.column-1)
        // abaixo direita, abaixo meio, abaixo, meio
        let pos6 = (position.line-1 < 0 || position.column+1 > 7)? new Position(9, 9)  : new Position(position.line-1, position.column+1)
        let pos7 = (position.line-1 < 0)? new Position(9, 9)  :new Position(position.line-1, position.column)
        let pos8 = (position.line-1 < 0 || position.column-1 < 0)? new Position(9, 9)  : new Position(position.line-1, position.column-1)

        analyzedMoves.push(pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8)

        let possibleMoves : Position[]
        possibleMoves = []

        for(let i = 0; i < analyzedMoves.length; i++) {
            let line = analyzedMoves[i].line
            let column = analyzedMoves[i].column



            if(line != 9) {
                if(game.board[line][column].color != this.color)
                    possibleMoves.push(new Position(line, column))
            } 
        }
        return possibleMoves
    }


    move(currentPosition: Position, finalPosition: Position, game: Game, castling_K?: boolean, castling_Q?: boolean): Piece[][]{
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
        
        
        let finalPositionObj = new Position(finalPosition.line, finalPosition.column)
        let movesAnalyzer = new MovesAnalyzer()

        movesAnalyzer.isCheck(possibleMoves, game)

        

        if(castling_K == true) {
            let rookFinalPosition = new Position(finalPosition.line, 5)
            let rookInicialPosition = new Position(finalPosition.line, 7)

            let rook = new Rook(rookInicialPosition, this.color)

            rook.move(rookInicialPosition, rookFinalPosition, game, castling_K, castling_Q)

            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new King(finalPositionObj, this.color)

        } else if(castling_Q == true) {
            let rookFinalPosition = new Position(finalPosition.line, 3)
            let rookInicialPosition = new Position(finalPosition.line, 0)

            let rook = new Rook(rookInicialPosition, this.color)
            rook.move(rookInicialPosition, rookFinalPosition, game, castling_K, castling_Q)

            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new King(finalPositionObj, this.color)
        }
        
        
        if(possibleMoves.some(position => isEqual(position, finalPositionObj))) {


            let movesAnalyzer = new MovesAnalyzer() 

            if(game.board[finalPositionObj.line][finalPositionObj.column].constructor.name == `Void`) {
                movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, false, false, false, castling_Q, castling_K)
            } else {
                movesAnalyzer.addMoveToHistory(currentPosition, finalPosition, this, game, true, false, false, castling_Q, castling_K)
            }

            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPositionObj.line][finalPositionObj.column] = new King(finalPositionObj, this.color)

            movesAnalyzer.isValidMove(game)

            
        }


        return game.board
    }   
}