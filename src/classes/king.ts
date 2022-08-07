import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { Pawn } from "./pawn";
import { Position } from "./position";
import { Void } from "./void";


export class King implements Piece {
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
    move(currentPosition: Position, finalPosition: Position, game: Game): void {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        if(possibleMoves.includes(finalPosition)) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPosition.line][finalPosition.column] = new Pawn(finalPosition, this.color)
        }
    }   
}