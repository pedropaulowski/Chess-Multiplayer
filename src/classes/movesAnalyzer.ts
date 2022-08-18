import { DBgame } from "../dao/firestoreCfg";
import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { Bishop } from "./bishop";
import { King } from "./king";
import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { Position } from "./position";
import { Queen } from "./queen";
import { Rook } from "./rook";

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

    horizontalMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
        let pieceName = piece.unicode
        let board = game.board


        if(verifyingCheck == true) {

            // Verificar as 8 colunas tanto a esquerda quanto a direita na mesma linha
            for(let j = position.column+1; j < 8; j++) {
                
                if(board[position.line][j] != undefined) {

                    if(!(board[position.line][j].unicode == `♜` ||
                        board[position.line][j].unicode == `♛`) && 
                        (board[position.line][j].color == `black` ||
                        board[position.line][j].color == `white`)
                    ) {
                        break;
                    }



                    if((board[position.line][j].unicode == `♜` ||
                        board[position.line][j].unicode == `♛`) &&
                        board[position.line][j].color != piece.color
                    ) {
                        return true
                    } else if(board[position.line][j].color == piece.color) {

                        break;
                    }
                }

            }

            for(let j = position.column-1; j >= 0; j--) {
                
                if(board[position.line][j] != undefined) {

                    if(!(board[position.line][j].unicode == `♜` ||
                        board[position.line][j].unicode == `♛`) && 
                        (board[position.line][j].color == `black` ||
                        board[position.line][j].color == `white`)
                    ) {
                        break;
                    }

                    if((board[position.line][j].unicode == `♜` ||
                        board[position.line][j].unicode == `♛`) &&
                        board[position.line][j].color != piece.color) {

                        return true
                    } else if(board[position.line][j].color == piece.color) {
                        break;
                    }
                }

            }

            return false

        }




        if(pieceName != "King" && pieceName != `♚`) {

            // Verificar as 8 colunas tanto a esquerda quanto a direita na mesma linha
            for(let j = position.column+1; j < 8; j++) {
                
                if(board[position.line][j] != undefined) {
                    if(board[position.line][j].constructor.name == "Void" || 
                    board[position.line][j].unicode == ``
                    ) {
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
                    if(board[position.line][j].constructor.name == "Void" ||
                    board[position.line][j].unicode == ``) {
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

        // let possibleMoves = this.virtualMove(this.possibleMoves, game, piece)
        return this.possibleMoves

    }

    verticalMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
        let pieceName = piece.unicode
        let board = game.board

        if(verifyingCheck == true) {
            // Verificar as 8 linhas tanto acima quanto a abaixo na mesma coluna
            for(let j = position.line+1; j < 8; j++) {
                                
                if(board[j][position.column] != undefined) {


                    if(!(board[j][position.column].unicode == `♜` ||
                        board[j][position.column].unicode == `♛`) && 
                        (board[j][position.column].color == `black` ||
                        board[j][position.column].color == `white`)
                    ) {
                        break;
                    }


                    if((board[j][position.column].unicode == `♜` ||
                        board[j][position.column].unicode == `♛`) && 
                        board[j][position.column].color != piece.color) {
                            // console.log(board[j][position.column])
                            return true
                    } else if(board[j][position.column].color == piece.color) {
                        break;
                    }

                    
                }
            }

            for(let j = position.line-1; j >= 0; j--) {
            
                if(board[j][position.column] != undefined) {

                    if(!(board[j][position.column].unicode == `♜` ||
                    board[j][position.column].unicode == `♛`) && 
                    (board[j][position.column].color == `black` ||
                    board[j][position.column].color == `white`)
                    ) {
                    // console.log(board[j][position.column].unicode, board[j][position.column].color)
                        break;
                    }


                    if((board[j][position.column].unicode == `♜` ||
                        board[j][position.column].unicode == `♛`) &&
                        board[j][position.column].color != piece.color) {
                            // console.log(board[j][position.column])

                        return true
                    } else if(board[j][position.column].color == piece.color)  {
                            // console.log(`Parou em:`, board[j][position.column])
                        break;
                    }
        
                }
            }

            return false

        }


        if(pieceName != "Pawn" && pieceName != `♟`) {
            // Verificar as 8 linhas tanto acima quanto a abaixo na mesma coluna
            for(let j = position.line+1; j < 8; j++) {
                                
                if(board[j][position.column] != undefined) {
                    if(
                    board[j][position.column].unicode == ``
                    ) {
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
                    if(board[j][position.column].unicode == ``) {
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

    diagonalMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
        let pieceName = piece.unicode
        let board = game.board


        if(verifyingCheck == true) {
            
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

                    if(!(board[i][j+aux].unicode == `♝` ||
                        board[i][j+aux].unicode == `♛`) && 
                        (board[i][j+aux].color == `black` ||
                        board[i][j+aux].color == `white`)
                    ) {
                        break;
                    }



                    if((board[i][j+aux].unicode == `♝` ||
                    board[i][j+aux].unicode == `♛`) &&
                    board[i][j+aux].color != piece.color) {
                        return true
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

                    if(!(board[i][j+aux].unicode == `♝` ||
                        board[i][j+aux].unicode == `♛`) && 
                        (board[i][j+aux].color == `black` ||
                        board[i][j+aux].color == `white`)
                    ) {
                        break;
                    }

                    if((board[i][j+aux].unicode == `♝` ||
                        board[i][j+aux].unicode == `♛`) &&
                        board[i][j+aux].color != piece.color
                        ) {
                        return true
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


                    
                    if(!(board[i][j+aux].unicode == `♝` ||
                        board[i][j+aux].unicode == `♛`) && 
                        (board[i][j+aux].color == `black` ||
                        board[i][j+aux].color == `white`)
                    ) {
                        break;
                    }

                    if((board[i][j+aux].unicode == `♝` ||
                        board[i][j+aux].unicode == `♛`) &&
                        board[i][j+aux].color != piece.color) {
                        return true
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


                    if(!(board[i][j+aux].unicode == `♝` ||
                        board[i][j+aux].unicode == `♛`) && 
                        (board[i][j+aux].color == `black` ||
                        board[i][j+aux].color == `white`)
                    ) {
                        break;
                    }


                    if((board[i][j+aux].unicode == `♝` ||
                    board[i][j+aux].unicode == `♛`) &&
                    board[i][j+aux].color != piece.color) {
                        return true
                    } else if(board[i][j+aux].color == piece.color) {
                        break;
                    }
                }

                // console.log(i, j+aux) 
                aux++
            }
            

            return false
        }




        if(pieceName != "King" && pieceName != `♚`) {

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
                    if(board[i][j+aux].unicode == ``) {

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
                aux ++
            }
            
            // diagonal ACIMA ESQUERDA
            aux = -1
            for(let i = position.line+1; i < 8 && j >= 0; i++) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux] != undefined) {
                    if(
                    board[i][j+aux].unicode == ``
                    ) {
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
                    if(
                    board[i][j+aux].unicode == ``) {
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
                    if(
                    board[i][j+aux].unicode == ``) {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                    } else if(board[i][j+aux].color != piece.color) {
                        let analyzedPosition = new Position(i, j+aux)
                        this.possibleMoves.push(analyzedPosition)
                        // console.log(analyzedPosition)
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

    twoOneMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
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
            


            if(verifyingCheck == true) {
                if(analyzedLine >= 0 && analyzedLine < 8 && analyzedColumn >= 0 && analyzedColumn < 8) {
                    if(board[analyzedLine][analyzedColumn] != undefined) {
                        if(board[analyzedLine][analyzedColumn].unicode == `♞` && board[analyzedLine][analyzedColumn].color != piece.color
                        ){
                            return true
                        } 
                    }
                }

                return false
            }

            if(analyzedLine >= 0 && analyzedLine < 8 && analyzedColumn >= 0 && analyzedColumn < 8) {
                if(board[analyzedLine][analyzedColumn] != undefined) {
                    if(board[analyzedLine][analyzedColumn].unicode == ``) {
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

    addMoveToHistory(inicialPosition: Position, 
        finalPosition: Position, 
        piece: Piece, 
        game: Game, 
        isCapturing: boolean,
        check?: boolean,
        checkMate?:boolean,
        castling_Q?:boolean,
        castling_K?:boolean
        ) {

        enum pos {a, b, c, d, e, f, g, h}
        let firstLetter = piece.unicode

        let moveNotation : string 
        moveNotation = ``
        let inicialColumn = pos[inicialPosition.column]
        // let inicialLine = inicialPosition.line

        let finalColumn = pos[finalPosition.column]
        let finalLine = finalPosition.line


        if(isCapturing == false) {
            moveNotation = `${firstLetter}${finalColumn}${finalLine}`
        // console.log(1)

        } else if(isCapturing == true && firstLetter != ``) {
            moveNotation = `${firstLetter}x${finalColumn}${finalLine}`
        // console.log(2)

        } else if(isCapturing == true && firstLetter == ``) {
            // console.log(3)

            moveNotation = `${inicialColumn.toString().toUpperCase()}x${finalColumn}${finalLine}`
        }


        if(check == true && checkMate != false) {
            moveNotation += `+`
            // console.log(`Check: ${check}`)
        }else if(checkMate == true)
            moveNotation += `#`



        if(castling_K == true) {
            moveNotation = `0-0`
        } else if (castling_Q == true)
            moveNotation = `0-0-0`

        if(game.history != undefined)
            game.history.push(moveNotation)
        else {
            game.history = []
            game.history.push(moveNotation)
        }

    }

    castling_Q(game: Game) {

            let movesRook_Q = localStorage.getItem(`Rook_Q`)
            let movesKing = localStorage.getItem(`King`)
        
            if(movesRook_Q == null && movesKing == null) {
                if(game.whosPlaying == game.players[0]) {
                    if(
                    (game.board[7][1].unicode == ``
                    && game.board[7][2].unicode == ``
                    && game.board[7][3].unicode == ``)
                    ) {
                        let finalLine = 7
                        let finalColumn = 2
    
                        let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                        // console.log(kingCastling_Q_Position)
                        return kingCastling_Q_Position
                    }
                } else if(game.whosPlaying == game.players[1]) {
                    if(
                    game.board[0][1].unicode == ``
                    && game.board[0][2].unicode == ``
                    && game.board[0][3].unicode == ``) {
                        let finalLine = 0
                        let finalColumn = 2
    
                        let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                        // console.log(kingCastling_Q_Position)
                        return kingCastling_Q_Position
                    }
                }
    
                
            } else {
                return null
            }

        return null

    }

    castling_K(game: Game) {

        let movesRook_Q = localStorage.getItem(`Rook_K`)
        let movesKing = localStorage.getItem(`King`)
    
        if(movesRook_Q == null && movesKing == null) {
            if(game.whosPlaying == game.players[0]) {
                if(
                (game.board[7][5].unicode == ``
                && game.board[7][6].unicode == ``) 
                ) {
                    let finalLine = 7
                    let finalColumn = 6

                    let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                    
                    return kingCastling_Q_Position
                }
            } else if(game.whosPlaying == game.players[1]) {
                if(
                (game.board[0][5].unicode == ``
                && game.board[0][6].unicode == ``)
                ) {
                    let finalLine = 0
                    let finalColumn = 6

                    let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                    
                    return kingCastling_Q_Position
                }
            }

            
        } else {
            return null
        }

    return null

    }

    isCheck(possibleMoves: Position[], game: Game){
        let aux = 0
        possibleMoves.map( (position) => {
            if(position.line <= 7 && position.line >= 0 &&
                position.column <= 7 && position.column >= 0
                ) {
                    let piece = game.board[position.line][position.column].unicode
                    if(piece == `King` || piece == `♚`){
                        aux++
                    }
                }   
        })

        if(aux > 0) {

            if(game.whosPlaying == game.players[0]) {
                game.isBlackInCheck = true
                game.isWhiteInCheck = false
            } else {
                game.isWhiteInCheck = true
                game.isBlackInCheck = false

            }
          
            return true
        }else {

            game.isWhiteInCheck = false
            game.isBlackInCheck = false

            return false

        }

    }

    isValidMove(virtualGame: Game) {
        let colorWhosPlaying : color = (virtualGame.whosPlaying == virtualGame.players[0])? `white` : `black`
        let king : Piece
        king = new King(new Position(9,9), colorWhosPlaying)


        virtualGame.board.map( (line) => {
            line.map((piece) => {
                if(piece.unicode == `♚` && piece.color == colorWhosPlaying) {
                    king = piece
                }
            })
        })
            

        if( this.diagonalMoves(king.position, king, virtualGame, true) == true||
            this.verticalMoves(king.position, king, virtualGame, true) == true ||
            this.horizontalMoves(king.position, king, virtualGame, true) == true||
            this.twoOneMoves(king.position, king, virtualGame, true) == true ||
            this.hasAdjacentPawn(virtualGame, king) == true ||
            this.hasAdjacentKing(virtualGame, king) == true) {
            console.log(`Movimento Invalido`)
            return false
        } else {

            // console.log(virtualGame)
            return true
        }
    }

    removeInvalidMoves(piece: Piece, possibleMoves: Position[], game: Game) {

        possibleMoves.map((finalPosition) => {
            let virtualGame = game
            piece.move(piece.position, finalPosition, virtualGame)
            
            if(this.isValidMove(virtualGame) == false) {
                let index = possibleMoves.indexOf(finalPosition)
                possibleMoves.splice(index, 1)
            }
        })

        return possibleMoves
    }
    
    hasAdjacentPawn(virtualGame: Game, king: King) {
        let colorWhosPlaying : color = (virtualGame.whosPlaying == virtualGame.players[0])? `white` : `black`


        if(colorWhosPlaying == `white`) {
            //verificar se nas duas colunas adjacentes tem um peão na linha anterior a do rei
            
            let adjacentBlocks : any = []

            if(king.position.line != 7 && king.position.column != 7) {
                adjacentBlocks.push(virtualGame.board[king.position.line+1][king.position.column+1])
            }

            if(king.position.line != 7 && king.position.column != 0) {
                adjacentBlocks.push(virtualGame.board[king.position.line+1][king.position.column-1])
            }


            if(adjacentBlocks[0] != undefined) {
                

                if(adjacentBlocks[0].unicode == `♟` && adjacentBlocks[0].color == `black`)
                    return true
            }

            if(adjacentBlocks[1] != undefined) {
                

                if(adjacentBlocks[1].unicode == `♟` && adjacentBlocks[1].color == `black`)
                    return true

            }

            
            return false
        } else if(colorWhosPlaying == `black`) {
            //verificar se nas duas colunas adjacentes tem um peão na linha anterior a do rei
            
            let adjacentBlocks : any = []

            if(king.position.line != 7 && king.position.column != 7) {
                adjacentBlocks.push(virtualGame.board[king.position.line+1][king.position.column+1])
            }

            if(king.position.line != 7 && king.position.column != 0) {
                adjacentBlocks.push(virtualGame.board[king.position.line+1][king.position.column-1])
            }

        
            if(adjacentBlocks[0] != undefined) {
                // console.log(adjacentBlocks[0])

                if(adjacentBlocks[0].unicode == `♟` && adjacentBlocks[0].color == `white`)
                    return true
            }
            
            if(adjacentBlocks[1] != undefined) {
                

                if(adjacentBlocks[1].unicode == `♟` && adjacentBlocks[1].color == `white`)
                    return true

            }

            
            return false
        }

        return false

        
    }

    hasAdjacentKing(virtualGame: Game, king: King) {
       let colorWhosPlaying : color = (virtualGame.whosPlaying == virtualGame.players[0])? `white` : `black`

        
        // acima direita, acima meio, acima esquerda
        let adjacentBlocks = []

        if(king.position.line != 7) {
            if(king.position.column != 7) {
                let pos1 = (virtualGame.board[king.position.line+1][king.position.column+1] != undefined)? virtualGame.board[king.position.line+1][king.position.column+1] : undefined
                adjacentBlocks.push(pos1)
            }

            let pos2 = (virtualGame.board[king.position.line+1][king.position.column] != undefined)? virtualGame.board[king.position.line+1][king.position.column] : undefined
            adjacentBlocks.push(pos2)
    
            if(king.position.column != 0) {
                let pos3 = (virtualGame.board[king.position.line+1][king.position.column-1] != undefined)? virtualGame.board[king.position.line+1][king.position.column-1] : undefined
                adjacentBlocks.push(pos3)

            }
            
            
        }
        // mesma linha a direita e a esquerda

        if(king.position.column != 7) {
            let pos4 = (virtualGame.board[king.position.line][king.position.column+1] != undefined)? virtualGame.board[king.position.line][king.position.column+1] : undefined
            adjacentBlocks.push(pos4)
        }

        if(king.position.column != 0) {
            let pos5 = (virtualGame.board[king.position.line][king.position.column-1] != undefined)? virtualGame.board[king.position.line][king.position.column-1] : undefined
            adjacentBlocks.push(pos5)

        }
        // abaixo direita, abaixo meio, abaixo esquerda

        if(king.position.line != 0) {
    
            if(king.position.column != 7) {
                let pos6 = (virtualGame.board[king.position.line-1][king.position.column+1] != undefined)? virtualGame.board[king.position.line-1][king.position.column+1] : undefined
                adjacentBlocks.push(pos6)

            }

            let pos7 = (virtualGame.board[king.position.line-1][king.position.column] != undefined)? virtualGame.board[king.position.line-1][king.position.column] : undefined
            adjacentBlocks.push(pos7)

            if(king.position.column != 0) {
                let pos8 = (virtualGame.board[king.position.line-1][king.position.column-1] != undefined)? virtualGame.board[king.position.line-1][king.position.column-1] : undefined
                adjacentBlocks.push(pos8)
            }

        }


        let aux = 0
        adjacentBlocks.map((piece) => {
            if(piece != undefined) {
                if( piece.unicode == `♚` 
                &&  piece.color != colorWhosPlaying)
                aux ++
            }

        })

        if(aux > 0) {
            return true
        } else {
            return false
        }

    }

    isMate(game: Game) {
       

        let pieces : Piece[]
        pieces = []
        let colorWhosPlaying = (game.whosPlaying == game.players[0])? `white`: `black`
        game.board.map((line)=> {
            line.map((piece) => {
                if(piece.unicode != `` && piece.color == colorWhosPlaying) {
                    if(piece instanceof Bishop ||
                        piece instanceof King ||
                        piece instanceof Knight ||
                        piece instanceof Pawn ||
                        piece instanceof Queen ||
                        piece instanceof Rook
                    ) {
                        pieces.push(piece)

                    }   
                }
                
            })
        })


        localStorage.setItem(`game`, JSON.stringify(game))



        let aux = 0

        pieces.map((piece) => {        
            let possibleMoves = piece.setPossibleMoves(piece.position, game)
            possibleMoves.map((finalPosition) => {
                let storedGame = localStorage.getItem(`game`)
        
                if(storedGame != null)  {
                    storedGame = JSON.parse(storedGame)
                }
                    
                if(storedGame != undefined && typeof storedGame != `string`) {
                    piece.move(piece.position, finalPosition, storedGame)
                    storedGame = storedGame
                    
                    if(this.isValidMove(storedGame) == true) {
                        // console.log(piece, finalPosition, this.isValidMove(storedGame))
                        aux++
                        
                    }
                    


                }
            })
        })
        
        localStorage.removeItem(`game`)        
        if(aux > 0) {
            return false
        } else {
            game.winner = (game.whosPlaying == game.players[0])? game.players[1] : game.players[0]

            let dbGame = new DBgame()

            dbGame.updateGame(game.id, game)

            return true
        }

    }

    enPassantMoves(game: Game, pawn: Pawn) {
        let colorWhosPlaying = (game.whosPlaying == game.players[0])? `white`: `black` 

        enum pos {a, b, c, d, e, f, g, h}
        let possibleMoves : Position[]
        possibleMoves = []

        if(colorWhosPlaying == `white` && 
            pawn.position.line == 3 &&
            pawn.color == `white` &&
            game.history != null ) {

                
            
            if(pawn.position.column > 0) {
                if(game.history[game.history.length-1] == `♟${pos[pawn.position.column-1]}${pawn.position.line}`
                ) {
                    // console.log(`En passant`)
                     
                    let finalPosition = {
                        line: pawn.position.line-1,
                        column: pawn.position.column-1
                    }

                    possibleMoves.push(finalPosition)

                    // console.log(possibleMoves)

                } 
            }

            if(pawn.position.column < 7) {
                if(game.history[game.history.length-1] == `♟${pos[pawn.position.column+1]}${pawn.position.line}`
                ) {
                    console.log(`En passant`)
                     
                    let finalPosition = {
                        line: pawn.position.line-1,
                        column: pawn.position.column+1
                    }

                    possibleMoves.push(finalPosition)

                    // console.log(possibleMoves)

                } 
            }


        } else if (colorWhosPlaying != `white` && 
            pawn.position.line == 4 &&
            pawn.color == `black` &&
            game.history != null) {

                if(pawn.position.column > 0) {
                    if(game.history[game.history.length-1] == `♟${pos[pawn.position.column-1]}${pawn.position.line}`
                    ) {
                        console.log(`En passant`)
                         
                        let finalPosition = {
                            line: pawn.position.line+1,
                            column: pawn.position.column-1
                        }
    
                        possibleMoves.push(finalPosition)
    
                        // console.log(possibleMoves)
    
                    } 
                }
    
                if(pawn.position.column < 7) {
                    if(game.history[game.history.length-1] == `♟${pos[pawn.position.column+1]}${pawn.position.line}`
                    ) {
                        console.log(`En passant`)
                         
                        let finalPosition = {
                            line: pawn.position.line+1,
                            column: pawn.position.column+1
                        }
    
                        possibleMoves.push(finalPosition)
    
                        // console.log(possibleMoves)
    
                    } 
                }
        }

      

        return possibleMoves
    }
    /*

    
    verifyAllMovesFromOponent(game: Game) {
        let possibleMoves : Position[][]
        possibleMoves = []
        if(game.whosPlaying == game.players[0]) {
            game.board.map( line => {
                line.map( (piece) => {
                    if(piece.color == `black`) {
                        possibleMoves.push(piece.setPossibleMoves(piece.position, game))
                    }
                })
            })
        } else {
            game.board.map( line => {
                line.map( (piece) => {
                    if(piece.color == `white`) {
                        possibleMoves.push(piece.setPossibleMoves(piece.position, game))
                    }
                })
            })
        }

     
        possibleMoves.map((line) => {
                let isCheck = this.isCheck(line, game)

                if(isCheck == true)
                    return true

        })

        return false
        

    }

    virtualMove(possibleMoves: Position[], game: Game, piece: Piece) {

        possibleMoves.map( (finalPosition) => {
            let virtualGame = game
            piece.move(piece.position, finalPosition, virtualGame)
            if(this.verifyAllMovesFromOponent(virtualGame) == true) {
                possibleMoves.splice(possibleMoves.indexOf(finalPosition), 1)
                return
            }
        })

        return possibleMoves

    }
    */
}