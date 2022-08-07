import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { Position } from "./position";
import { Void } from "./void";

export class Pawn implements Piece {
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }

    setPossibleMoves(position: Position, game: Game): Position[] {
        let possibleMoves : Array<Position>
        possibleMoves = []
        let i : number;

        switch(this.color) {
            case "white": 

                // let lastBlock : Piece
                // lastBlock = game.board[position.line][position.column]
                // let auxBlock : Piece
                // auxBlock = new Void()
                if(position.line == 6) {
                    
                    // verifying Pawn's vertical move
                    for(i = 5; i > 3; i--) {
                        let blockAnalyzed : Piece = game.board[i][position.column]
                        if(blockAnalyzed.color == "void" ) {
                            possibleMoves.push(blockAnalyzed.position)
                        } else {
                            break;
                        }
                    }

                    i = -1;
                    // verifying Pawn's diagonal move
                    
                    do{
                        if(i != 0) {
                            let blockAnalyzed : Piece = game.board[5][position.column+i]
                            
                            if(blockAnalyzed != undefined)
                                if(blockAnalyzed.color == "black" ) {
                                    possibleMoves.push(blockAnalyzed.position)
                                }
                        }
                        i++
                    }while(i < 2)

                    

                } else {

                }
            break;

            case "black":
            break;
        }

        return possibleMoves;
    }

    move(currentPosition: Position, finalPosition: Position, game: Game): void {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)
      
        if(possibleMoves.includes(finalPosition)) {
            game.board[currentPosition.line][currentPosition.column] = new Void(currentPosition, "void")
            game.board[finalPosition.line][finalPosition.column] = new Pawn(finalPosition, this.color)
        }
    }

}