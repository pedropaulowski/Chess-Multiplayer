import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { color } from "../types/types";
import { King } from "./king";
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

    horizontalMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
        let pieceName = piece.constructor.name
        let board = game.board


        if(verifyingCheck == true) {

            // Verificar as 8 colunas tanto a esquerda quanto a direita na mesma linha
            for(let j = position.column+1; j < 8; j++) {
                
                if(board[position.line][j] != undefined) {
                    if((board[position.line][j].constructor.name == "Rook" ||
                        board[position.line][j].constructor.name == "Queen") &&
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
                    if((board[position.line][j].constructor.name == "Rook" ||
                        board[position.line][j].constructor.name == "Queen") &&
                        board[position.line][j].color != piece.color
                    ) {

                        return true
                    } else if(board[position.line][j].color == piece.color) {
  
                        break;
                    }
                }

            }

            return false

        }




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

        // let possibleMoves = this.virtualMove(this.possibleMoves, game, piece)
        return this.possibleMoves

    }

    verticalMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
        let pieceName = piece.constructor.name
        let board = game.board


        if(verifyingCheck == true) {
            // Verificar as 8 linhas tanto acima quanto a abaixo na mesma coluna
            for(let j = position.line+1; j < 8; j++) {
                                
                if(board[j][position.column] != undefined) {
                    if(board[j][position.column].constructor.name == "Rook" ||
                        board[j][position.column].constructor.name == "Queen" && 
                        board[j][position.column].color != piece.color
                        ) {
                            return true
                    } else if(board[j][position.column].color == piece.color) {
                        break;
                    }
                }
            }

            for(let j = position.line-1; j >= 0; j--) {
            
                if(board[j][position.column] != undefined) {
                    if(board[j][position.column].constructor.name == "Rook" ||
                        board[j][position.column].constructor.name == "Queen" &&
                        board[j][position.column].color != piece.color
                        ) {
                        return true
                    } else if(board[j][position.column].color == piece.color) {
                        break;
                    }
        
                }
            }

            return false

        }


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

    diagonalMoves(position: Position, piece: Piece, game: Game, verifyingCheck?: boolean) {
        let pieceName = piece.constructor.name
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
                    if((board[i][j+aux].constructor.name == "Bishop" ||
                    board[i][j+aux].constructor.name == "Queen") &&
                    board[i][j+aux].color != piece.color
                    ) {
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
                    if((board[i][j+aux].constructor.name == "Bishop" ||
                        board[i][j+aux].constructor.name == "Queen") &&
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
                    if((board[i][j+aux].constructor.name == "Bishop" ||
                        board[i][j+aux].constructor.name == "Queen") &&
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
            
            // diagonal 4 ABAIXO DIREITA
            aux = 1
            
            for(let i = position.line-1; i >= 0 && j < 8; i--) {
                if(i < 0 || j < 0 || i > 7 || j > 7)
                    break;

                if(board[i][j+aux] != undefined) {
                    if((board[i][j+aux].constructor.name == "Bishop" ||
                    board[i][j+aux].constructor.name == "Queen") &&
                    board[i][j+aux].color != piece.color 
                    ) {
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
                        if(board[analyzedLine][analyzedColumn].constructor.name == "Knight" &&
                        board[analyzedLine][analyzedColumn].color != piece.color
                        ){
                            return true
                        } 
                    }
                }

                return false
            }

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
        let firstLetter = piece.constructor.name.charAt(0)

        if(piece.constructor.name == `Knight`)
            firstLetter = `N`
        else if(firstLetter == `P`)
            firstLetter = ``

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
            console.log(check)
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
                    if(game.board[7][1].constructor.name == `Void`
                    && game.board[7][2].constructor.name == `Void`
                    && game.board[7][3].constructor.name == `Void`) {
                        let finalLine = 7
                        let finalColumn = 2
    
                        let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                        console.log(kingCastling_Q_Position)
                        return kingCastling_Q_Position
                    }
                } else if(game.whosPlaying == game.players[1]) {
                    if(game.board[0][1].constructor.name == `Void`
                    && game.board[0][2].constructor.name == `Void`
                    && game.board[0][3].constructor.name == `Void`) {
                        let finalLine = 0
                        let finalColumn = 2
    
                        let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                        console.log(kingCastling_Q_Position)
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
                if(game.board[7][5].constructor.name == `Void`
                && game.board[7][6].constructor.name == `Void`
                ) {
                    let finalLine = 7
                    let finalColumn = 6

                    let kingCastling_Q_Position = new Position(finalLine, finalColumn)
                    
                    return kingCastling_Q_Position
                }
            } else if(game.whosPlaying == game.players[1]) {
                if(game.board[0][5].constructor.name == `Void`
                && game.board[0][6].constructor.name == `Void`
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

    isCheck(possibleMoves: Position[], game: Game, kingMoving?: boolean){
        let aux = 0
        possibleMoves.map( (position) => {
            let piece = game.board[position.line][position.column].constructor.name
            if(piece == `King`){
                aux++
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

            if(game.whosPlaying == game.players[0]) {
                game.isWhiteInCheck = true
                game.isBlackInCheck = false
            } else {
                game.isBlackInCheck = true
                game.isWhiteInCheck = false
            }

            return false

        }

    }

    isValidMove(virtualGame: Game) {
        let colorWhosPlaying : color = (virtualGame.whosPlaying == virtualGame.players[0])? `white` : `black`
        let king : Piece
        king = new King(new Position(1,1), colorWhosPlaying)

         
        virtualGame.board.map( (line) => {
            line.map((piece) => {
                if(piece.constructor.name == `King` && piece.color == colorWhosPlaying)
                    king = piece
            })
        })
    
        
        if( this.diagonalMoves(king.position, king, virtualGame, true) == true||
            this.verticalMoves(king.position, king, virtualGame, true) == true ||
            this.horizontalMoves(king.position, king, virtualGame, true) == true||
            this.twoOneMoves(king.position, king, virtualGame, true) == true
        ) {
            console.log(`Movimento Invalido`)
            return false
        } else {
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