import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { Position } from "./position";

export class MovesAnalyzer {
    possibleMoves : Array<Position>

    constructor () {
        this.possibleMoves = []
    }

    /****
     * Algumas peças compartilham do mesmo tipo de movimento
     * Horizontal
     *      A direita
     *      A esquerda
     * 
     * Vertical
     *      Acima
     *      Abaixo
     * 
     * Diagonal
     *      Acima esquerda
     *      Acima direita
     *      Abaixo direita
     *      Abaixo esquerda
     * 
     * O movimento de L é o mais diferente e por isso terá 
     * uma funçao especifica para verificar as possiveis 8 posições 
     * que um cavalo pode se mover
     */

    horizontalMoves(position: Position, piece: Piece, game: Game) {
        let pieceName = piece.constructor.name
        let board = game.board

        if(pieceName != "King") {

            // Verificar as 8 colunas tanto a esquerda quanto a direita na mesma linha
            for(let j = position.column+1; j < 8; j++) {
                
                if(board[position.line][j] != undefined) {
                    if(board[position.line][j].constructor.name == "Void") {
                        let analyzedPosition = new Position(position.line, j)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[position.line][j].color != piece.color){
                        let analyzedPosition = new Position(position.line, j)
                        this.possibleMoves.push(analyzedPosition)
                        break;
                    } else if(board[position.line][j].color == piece.color) {
                        break;
                    }
                }

            }

            for(let j = position.column-1; j >= 0; j--) {
                
                if(board[position.line][j] != undefined) {
                    if(board[position.line][j].constructor.name == "Void") {
                        let analyzedPosition = new Position(position.line, j)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[position.line][j].color != piece.color){
                        let analyzedPosition = new Position(position.line, j)
                        this.possibleMoves.push(analyzedPosition)
                        break;
                    } else if(board[position.line][j].color == piece.color) {
                        break;
                    }
                }

            }

        }
        return this.possibleMoves
    }

    verticalMoves(position: Position, piece: Piece, game: Game) {
        let pieceName = piece.constructor.name
        let board = game.board

        if(pieceName != "Pawn") {
            // Verificar as 8 linhas tanto acima quanto a abaixo na mesma coluna
            for(let j = position.line+1; j < 8; j++) {
                                
                if(board[j][position.column] != undefined) {
                    if(board[j][position.column].constructor.name == "Void") {
                        let analyzedPosition = new Position(j, position.column)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[j][position.column].color != piece.color){
                        let analyzedPosition = new Position(j, position.column)
                        this.possibleMoves.push(analyzedPosition)
                        break;
                    } else if(board[j][position.column].color == piece.color) {
                        break;
                    }
                }
            }

            for(let j = position.line-1; j >= 0; j--) {
            
                if(board[j][position.column] != undefined) {
                    if(board[j][position.column].constructor.name == "Void") {
                        let analyzedPosition = new Position(j, position.column)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[j][position.column].color != piece.color){
                        let analyzedPosition = new Position(j, position.column)
                        this.possibleMoves.push(analyzedPosition)
                        break;
                    } else if(board[j][position.column].color == piece.color) {
                        break;
                    }
                }
            }

        } 

        return this.possibleMoves

    }

    diagonalMoves(position: Position, piece: Piece, game: Game) {
        let pieceName = piece.constructor.name
        let board = game.board

        if(pieceName != "King") {

            /***
            ** Diagonal
            *      Acima direita
            *      Acima esquerda
            *      Abaixo direita
            *      Abaixo esquerda
            */

            // diagonal 1 ACIMA DIREITA
            let j = position.column
            let aux = 1
            
            for(let i = position.line+1 ; i < 8 && j < 8; i++) {
                
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux] != undefined) {
                    if(board[i][j+aux].constructor.name == "Void") {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[i][j+aux].color != piece.color) {
                        let analyzedPosition = new Position(i, j+aux)
                        console.log(
                        this.possibleMoves.push(analyzedPosition)
                        )
                        break;
                    } else if(board[i][j+aux].color == piece.color) {
                        break;
                    }
                }

                // console.log(i, j+aux)
                aux ++
            }
            
            // diagonal ACIMA ESQUERDA
            aux = -1
            for(let i = position.line+1; i < 8 && j >= 0; i++) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux] != undefined) {
                    if(board[i][j+aux].constructor.name == "Void") {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[i][j+aux].color != piece.color) {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                        break;
                    } else if(board[i][j+aux].color == piece.color) {
                        break;
                    }
                }

                // console.log(i, j+aux) 
                aux--
            }

            // diagonal 3 ABAIXO ESQUERDA
            aux = -1
            
            for(let i = position.line-1; i >= 0 && j >= 0; i+=-1) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux] != undefined) {
                    if(board[i][j+aux].constructor.name == "Void") {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[i][j+aux].color != piece.color) {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                        break;
                    } else if(board[i][j+aux].color == piece.color) {
                        break;
                    }
                }
                // console.log(i, j+aux) 
                aux--
            }
            
            // diagonal 4 ABAIXO DIREITA
            aux = 1
            
            for(let i = position.line-1; i >= 0 && j < 8; i--) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux] != undefined) {
                    if(board[i][j+aux].constructor.name == "Void") {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[i][j+aux].color != piece.color) {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                        console.log(analyzedPosition)
                        break;
                    } else if(board[i][j+aux].color == piece.color) {
                        break;
                    }
                }

                // console.log(i, j+aux) 
                aux++
            }
            


        } 

        return this.possibleMoves

    }

    twoOneMoves(position: Position, piece: Piece, game: Game) {
        /**
         * O Cavalo ele os seguintes movimentos
         *      soma ou subtrai 2 a sua coluna atual e soma ou subtrai 1 a sua linha atual = 4 movimentos
         *      soma ou subtrai 2 a sua linha atual e soma ou subtrai 1 a sua coluna atual  = 4 movimentos
         * 
         *  
         */
        let board = game.board

        let aux = -1
        for(let i = 0; i < 8; i++) {
            let analyzedLine = position.line+(-2*aux)
            let analyzedColumn = position.column+aux

            if (i <= 1) {
                // let analyzedPosition = new Position(position.line+(-2*aux), position.column+aux)
                analyzedLine = position.line+(-2*aux)
                analyzedColumn = position.column+aux

            }else if(i > 1 && i < 4) {
                analyzedLine = position.line+(2*aux)
                analyzedColumn = position.column+aux                

            } else if (i > 3 && i <= 5) {
                // analyzedPosition = new Position(position.line+aux, position.column+(-2*aux))
                analyzedLine = position.line+aux
                analyzedColumn = position.column+(-2*aux)


            } else  {
                // analyzedPosition = new Position(position.line+aux, position.column+(2*aux))
                analyzedLine = position.line+aux
                analyzedColumn = position.column+(2*aux)
            }

            aux *=-1
            


            if(analyzedLine >= 0 && analyzedLine < 8 && analyzedColumn >= 0 && analyzedColumn < 8) {
                if(board[analyzedLine][analyzedColumn] != undefined) {
                    if(board[analyzedLine][analyzedColumn].constructor.name == "Void") {
                        let analyzedPosition = new Position(analyzedLine, analyzedColumn)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[analyzedLine][analyzedColumn].color != piece.color){
                        let analyzedPosition = new Position(analyzedLine, analyzedColumn)
                        this.possibleMoves.push(analyzedPosition)
                        continue;
                    } else if(board[analyzedLine][analyzedColumn].color == piece.color) {
                        continue;
                    }
                }
            }


            // this.possibleMoves.push(new Position(analyzedLine, analyzedColumn))
        }

        return this.possibleMoves

    }


}