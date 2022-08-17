import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { Position } from "./position";
import { Void } from "./void";
import isEqual from 'lodash.isequal';
import { MovesAnalyzer } from "./movesAnalyzer";


export class Pawn implements Piece {
    unicode = `♟`;
    position: Position;
    color: color;

    constructor(position: Position, color: color) {
        this.position = position
        this.color = color

    }

    setPossibleMoves(position: Position, game: Game): Position[] {
        let possibleMoves :any = []
        

        
        let i : number;
        switch(game.board[position.line][position.column].color) {
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
                            let blockAnalyzed : Piece = game.board[position.line-1][position.column+i]
                           
                            if(blockAnalyzed != undefined) {
                                if(blockAnalyzed.color == "black" ) {
                                    possibleMoves.push(blockAnalyzed.position)
                                }
                            }

                        }
                        i++
                    }while(i < 2)

                } else {

                    if(position.line-1 >= 0) {
                        let blockAnalyzed : Piece = game.board[position.line-1][position.column]
                        if(blockAnalyzed.color == "void" ) {
                            possibleMoves.push(blockAnalyzed.position)
                        }

                        i = -1;
                        // verifying Pawn's diagonal move
                        do{
                            if(i != 0) {
                                let blockAnalyzed : Piece = game.board[position.line-1][position.column+i]
                                if(blockAnalyzed != undefined) {
                                    if(blockAnalyzed.color == "black" ) {
                                        possibleMoves.push(blockAnalyzed.position)
                                    }
                                }

                            }
                            i++
                        }while(i < 2)
                    }
                    


                }
            break;
                
            case "black":
                
                // let lastBlock : Piece
                // lastBlock = game.board[position.line][position.column]
                // let auxBlock : Piece
                // auxBlock = new Void()
                if(position.line == 1) {
                    // verifying Pawn's vertical move
                    for(i = 2; i < 4; i++) {
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
                            let blockAnalyzed : Piece = game.board[position.line+1][position.column+i]
                            
                            if(blockAnalyzed != undefined) {
                                if(blockAnalyzed.color == "white") {
                                    possibleMoves.push(blockAnalyzed.position)
                                }
                            }
   
                        }
                        i++
                    }while(i < 2)                     

                } else {
                    if(position.line+1 < 8) {
                        let blockAnalyzed : Piece = game.board[position.line+1][position.column]
                        if(blockAnalyzed.color == "void" ) {
                            possibleMoves.push(blockAnalyzed.position)
                        }

                        i = -1;
                        // verifying Pawn's diagonal move
                        do{
                            if(i != 0) {
                                let blockAnalyzed : Piece = game.board[position.line+1][position.column+i]
                                if(blockAnalyzed != undefined) {
                                    if(blockAnalyzed.color == "white" ) {
                                        possibleMoves.push(blockAnalyzed.position)
                                    }
                                }
                            }
                            i++
                        }while(i < 2)
                    }
                }
            break;
        }

        let movesAnalyzer = new MovesAnalyzer() 
        let enPassantMoves = movesAnalyzer.enPassantMoves(game, game.board[position.line][position.column])




        if(enPassantMoves.length > 0) {
            enPassantMoves.map((pos) => possibleMoves.push(pos))
        }
            


        return possibleMoves
        
    }

    move(currentPosition: Position, finalPosition: Position, game: Game): Piece[][] {
        let possibleMoves = this.setPossibleMoves(currentPosition, game)

        

        let finalPositionObj = {
            line : finalPosition.line,
            column : finalPosition.column
        }

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

            if(game.whosPlaying == game.players[1]) {

                if(game.board[finalPositionObj.line][finalPositionObj.column].unicode == `` &&
                    game.board[finalPositionObj.line-1][finalPositionObj.column].color == `white`) {
                        game.board[finalPositionObj.line-1][finalPositionObj.column] = new Void(currentPosition, "void")
                    }

            } else{  
                
                if(game.board[finalPositionObj.line][finalPositionObj.column].unicode == `` &&
                    game.board[finalPositionObj.line+1][finalPositionObj.column].color == `black`) {
                        game.board[finalPositionObj.line+1][finalPositionObj.column] = new Void(currentPosition, "void")

                    }

            }

            game.board[finalPositionObj.line][finalPositionObj.column] = new Pawn(finalPositionObj, this.color)

            movesAnalyzer.isValidMove(game)


        }

        return game.board
    }

}


