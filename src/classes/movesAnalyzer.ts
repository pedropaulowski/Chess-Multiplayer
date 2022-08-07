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
            for(let j = position.column+1; j >= 0; j--) {
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

        } else {

        }
    }

    verticalMoves(position: Position, piece: Piece, game: Game) {
        let pieceName = piece.constructor.name
        let board = game.board

        if(pieceName != "King") {

            // Verificar as 8 linhas tanto acima quanto a abaixo na mesma coluna
            for(let j = position.line+1; j < 8; j++) {    
                if(board[j][position.column].constructor.name == "Void") {
                    let analyzedPosition = new Position(position.line, j)
                    this.possibleMoves.push(analyzedPosition)
                } else if(board[position.line][j].color != piece.color) {
                    let analyzedPosition = new Position(position.line, j)
                    this.possibleMoves.push(analyzedPosition)
                    break;
                } else if(board[position.line][j].color == piece.color) {
                    break;
                }
            }
            for(let j = position.line+1; j >= 0; j--) {
                if(board[j][position.column].constructor.name == "Void") {
                    let analyzedPosition = new Position(position.line, j)
                    this.possibleMoves.push(analyzedPosition)
                } else if(board[position.line][j].color != piece.color) {
                    let analyzedPosition = new Position(position.line, j)
                    this.possibleMoves.push(analyzedPosition)
                    break;
                } else if(board[position.line][j].color == piece.color) {
                    break;
                }
            }

        } else {

        }
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

                if(board[i][j+aux].constructor.name == "Void") {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                } else if(board[position.line][j].color != piece.color) {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                    break;
                } else if(board[position.line][j].color == piece.color) {
                    break;
                }

                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                // console.log(i, j+aux)
                aux ++
            }

            // diagonal ACIMA ESQUERDA
            aux = -1
            for(let i = position.line+1; i < 8 && j >= 0; i++) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;


                if(board[i][j+aux].constructor.name == "Void") {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                } else if(board[position.line][j].color != piece.color) {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                    break;
                } else if(board[position.line][j].color == piece.color) {
                    break;
                }

                // console.log(i, j+aux) 
                aux--
            }

            // diagonal 3 ABAIXO ESQUERDA
            aux = -1
            for(let i = position.line-1; i >= 0 && j >= 0; i+=-1) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux].constructor.name == "Void") {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                } else if(board[position.line][j].color != piece.color) {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                    break;
                } else if(board[position.line][j].color == piece.color) {
                    break;
                }

                // console.log(i, j+aux) 
                aux--
            }

            // diagonal 4 ABAIXO DIREITA
            aux = 1

            for(let i = position.line-1; i >= 0 && j < 8; i--) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux].constructor.name == "Void") {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                } else if(board[position.line][j].color != piece.color) {
                    let analyzedPosition = new Position(i, j+aux)
                    this.possibleMoves.push(analyzedPosition)
                    break;
                } else if(board[position.line][j].color == piece.color) {
                    break;
                }
                // console.log(i, j+aux) 
                aux++
            }



        } else {

        }
    }

    twoOneMoves(position: Position, piece: Piece, game: Game) {

    }

}