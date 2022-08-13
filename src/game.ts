import { Bishop } from "./classes/bishop"
import { King } from "./classes/king"
import { Knight } from "./classes/knight"
import { Pawn } from "./classes/pawn"
import { Position } from "./classes/position"
import { Queen } from "./classes/queen"
import { Rook } from "./classes/rook"
import { Void } from "./classes/void"
import { DBgame } from "./dao/firestoreCfg"
import { Piece } from "./interfaces/piece"
import { storedHash } from "./main"
// import { players } from "./main"
import { color } from "./types/types"
import { MovesAnalyzer } from "../src/classes/movesAnalyzer";


const dbGame = new DBgame()

/**
 * Nessa classe que é feita toda lógica da interação do usuário com o tabuleiro
 *  Essa classe busca nas Classes das peças quais são os movimentos que uma determinada peça pode fazer e mostra isso pro usuario
 *  quando o usuario escolhe qual movimento fazer, então ela detecta o movimento e envia para a classe da peça terminar o movimento
 *  
 *  Os unicos movimentos que são feitos nessa classe são 
 *      - Promoção do Peão
 *      - Roque (movimento de defesa do rei)
 *  
 * 
 */


export class Game {
    id: string;
    board : Piece[][];
    players : Array<string>;
    whosPlaying : string;
    history : Array<string> | undefined;
   

    constructor( players: Array<string>, whosPlaying: string, id : string) {
        this.board = this.createBoard()
        this.players = players
        this.whosPlaying = whosPlaying
        this.id = id
  

    }

    drawBoard(divBoard: HTMLDivElement, clientPlayer : string) {

        if(divBoard != null) {
            divBoard.innerHTML = ``
            if(this.players[0] == clientPlayer) {
                for (let i = 0; i < 8; i++) {
                    for(let j = 0; j< 8; j++){
                        let block = document.createElement('div')
                        // block.innerHTML = `i${i}j${j}`
                        block.setAttribute("id", `i${i}j${j}`)
                        block.setAttribute("class", "block")
                        block.setAttribute("i", `${i}`)
                        block.setAttribute("j", `${j}`)
                        //block.setAttribute("onclick", `escolher(${i},${j})`)

                        // console.log(block)
                        divBoard.appendChild(block)
                        // this.setOnClickFunctions(i, j, block)

                        // console.log(this.board)

                        if(this.board[i][j].color != "void") {
                            block.classList.add(`clickable`)
                            block.innerHTML = `${this.board[i][j].unicode}`
                            block.style.color = this.board[i][j].color 

                            if(block.style.color == `white`) {
                                block.classList.add(`fontBorderBlack`)
                            } else {
                                block.classList.add(`fontBorderWhite`)
                            }
                            // block.firstChild.setAttribute(`draggable`, `true`)

                            if(storedHash == this.players[0] && this.board[i][j].color == `white` && this.whosPlaying == storedHash)
                                this.setOnClickFunctions(i, j, block)
                            else if (storedHash == this.players[1] && this.board[i][j].color == `black` && this.whosPlaying == storedHash)
                                this.setOnClickFunctions(i, j, block)

                        }
                       
                       
                    }
                }
            } else {
                for (let i = 7; i >= 0; i--) {
                    for(let j = 7; j >= 0; j--){
                        let block = document.createElement('div')
                        block.setAttribute("id", `i${i}j${j}`)
                        block.setAttribute("class", "block")
                        block.setAttribute("i", `${i}`)
                        block.setAttribute("j", `${j}`)
                        //block.setAttribute("onclick", `escolher(${i},${j})`)

         
                        // this.setOnClickFunctions(i, j, block)

                        divBoard.appendChild(block)

                        if(this.board[i][j].color != "void") {
                            block.innerHTML = `${this.board[i][j].unicode}`
                            block.style.color = this.board[i][j].color
                            block.classList.add(`clickable`)

                            if(block.style.color == `white`) {
                                block.classList.add(`fontBorderBlack`)
                            } else {
                                block.classList.add(`fontBorderWhite`)
                            }

                            if(storedHash == this.players[0] && this.board[i][j].color == `white` && this.whosPlaying == storedHash)
                                this.setOnClickFunctions(i, j, block)
                            else if (storedHash == this.players[1] && this.board[i][j].color == `black` && this.whosPlaying == storedHash)
                                this.setOnClickFunctions(i, j, block)

                        }

                    }
                }
            }
        }
        this.paintBoard()
    }

    createBoard() {
        let board : Piece[][]
        board = []
        for(let i : number = 0 ; i < 8; i++) {
            board.push([])
            for(let j : number = 0 ; j < 8; j++) {

                let position = new Position(i, j)
                let color : color
                if(i != 1 && i != 6 && i != 0 && i != 7) {
                    color = "void"
                    board[i].push(new Void(position, color))
                } else if(i == 1 || i == 6){
                    color = (i == 1)? "black" : "white"
                    board[i].push(new Pawn(position, color))
                    

                } else if(i == 0 || i == 7) {
                    color = (i == 0)? "black" : "white"
                    switch(j) {
                        case (0):
                        case (7):
                            board[i][j] = new Rook(position, color)
                            
                        break;

                        case (1):
                        case (6):
                            board[i][j] = new Knight(position, color)
                            
                        break;

                        case (2):
                        case (5):
                            board[i][j] = new Bishop(position, color)
                            
                        break;

                        case (3):
                            board[i][j] = new Queen(position, color)
                        break;
                        case (4):
                        
                            board[i][j] = new King(position, color)
                        break;
                    }
                }

            }


        }

        return board;
    }

    setOnClickFunctions(i: number, j: number, block: HTMLDivElement) {
        if(this.board[i][j] == undefined) {
            return
        }
        let pieceType = this.board[i][j].constructor.name
        let pieceObj : Piece;
        let position = new Position(i, j)
        let color = this.board[i][j].color
        pieceObj = new Void(position, color)


        
        switch(pieceType) {
            case "Pawn":
                pieceObj = new Pawn(position, color)

                break;
            case "Bishop":
                pieceObj = new Bishop(position, color)

                break;
            case "Knight":
                pieceObj = new Knight(position, color)
                break;
            case "Rook":
                pieceObj = new Rook(position, color)

                break;
            case "King":
                pieceObj = new King(position, color)

                break;
            case "Queen":
                pieceObj = new Queen(position, color)

                break;
            case "Void":
                pieceObj = new Void(position, color)
                break;
        }


        let possibleMoves = pieceObj.setPossibleMoves(pieceObj.position, this)
        // console.log(possibleMoves)
        
        if(pieceType != `Void`) {
            block.addEventListener("click", (e)=> {
                e.preventDefault()
                this.setMoves(possibleMoves, pieceObj, pieceType)
                
            })
        }


    }

    paintBoard() {
        // console.log(`atualizou`)
        for (let i = 0; i < 8; i++) {
            for(let j = 0; j< 8; j++){
                let block = document.getElementById(`i${i}j${j}`)
                if(i%2!=0 && j%2==0 && block != undefined){                    
                    block.classList.add(`black`);
                    continue;
                } else if(i%2==0 && j%2!=0 && block != undefined) {
                    block.classList.add(`black`);
                    continue;
                } else if(block != undefined){
                    block.classList.add(`white`);
                }
            }
        }
    }
    /*
    move(possibleMoves: Position[], pieceObj : Piece, clientToken: string) {
        
        if(this.whosPlaying != clientToken) {
            return
        }


        let currentPosition = pieceObj.position
        let target : any = e.target

        if(target != null) {

            let finalLine = parseInt(target.getAttribute(`i`))
            let finalColumn = parseInt(target.getAttribute(`j`))
            let finalPosition = {line: finalLine, column: finalColumn}

            let finalBlock = document.querySelector(`#i${finalLine}j${finalColumn}`)

            if(finalBlock != undefined) {

                if(finalBlock.classList.contains(`possibleBlock`)) {
                    console.log(pieceObj.constructor.name)


                    pieceObj.move(currentPosition, finalPosition, this)
                    this.changeWhosPlaying()
                    // console.log(this)
                    dbGame.updateGame(this.id, this)
                
                    let appBoard = document.querySelector<HTMLDivElement>("#app")
                    
                    if(appBoard != null) {

                        let clientToken = storedHash
                        if(clientToken != null){

                            this.drawBoard(appBoard, clientToken)

                        }
            
                    }
                }

            }

               
        }
        

    }
    */
    changeWhosPlaying() {
        let clientToken = storedHash
        if(clientToken != null) {
            if(clientToken == this.players[0])
                this.whosPlaying = this.players[1]
            else 
                this.whosPlaying = this.players[0]

        }
    }

    paintPossibleBlock(possibleBlock:Element) {
        possibleBlock.classList.remove(`white`)  
        possibleBlock.classList.remove(`black`)  
        possibleBlock.classList.add(`possibleBlock`) 
    }


 
    pawnPromotion(finalPosition: Position) {
        let divPromotion = document.querySelector(`#promotion`)
        
        if(divPromotion != null) {
            divPromotion.classList.add(`promotion`)
            divPromotion.removeAttribute(`style`)

            for(let i = 0; i < 4; i++) {
                let optionPromotion: any = divPromotion.children[i]
                optionPromotion.onclick = () => {
                    let id = optionPromotion.getAttribute(`id`)
                    let piece : Piece
                    let color : color = (this.whosPlaying != this.players[0])? `white` : `black`
                    piece = new Void(finalPosition, `void`)

                    if(id == `Knight`) {
                        piece = new Knight(finalPosition, color)
                    } else if (id == `Queen`) {
                        piece = new Queen(finalPosition, color)

                    } else if (id == `Rook`) {
                        piece = new Rook(finalPosition, color)
                        
                    } else if (id == `Bishop`) {
                        piece = new Bishop(finalPosition, color)

                    }

                    let possibleMoves = piece.setPossibleMoves(finalPosition, this)
                    let movesAnalyzer = new MovesAnalyzer()
                    movesAnalyzer.isCheck(possibleMoves, this)

                    this.board[finalPosition.line][finalPosition.column] = piece 
                    divPromotion?.classList.remove(`promotion`)
                    divPromotion?.setAttribute(`style`, `display: none`)
                    dbGame.updateGame(this.id, this)

                }
            }

    
        }

    }

    setMoves(possibleMoves: Position[], pieceObj: Piece, pieceType: string) {
                // document.querySelectorAll(`.possibleBlock`).forEach((e) =>{
                    // e.classList.remove(`possibleBlock`)
                // })
                let clientToken = storedHash
                if(clientToken != null) {

                    let appBoard = document.querySelector<HTMLDivElement>("#app")
                    
                    if(appBoard != null) {

                        let clientToken = storedHash
                        if(clientToken != null){

                            this.drawBoard(appBoard, clientToken)

                        }
            
                    }

                    let movesAnalyzer = new MovesAnalyzer()
                    let castling_Q:any = movesAnalyzer.castling_Q(this)
                    let castlingMoves = []

                    if(castling_Q != null) 
                        castlingMoves.push(castling_Q)
      
                    let castling_K:any = movesAnalyzer.castling_K(this)
                        
                    if(castling_K != null)  
                        castlingMoves.push(castling_K)
                    
                    if(pieceType == `King` && (castling_K != null || castling_Q != null)) {

                        for(let i = 0; i < castlingMoves.length; i++) {
                            let line = castlingMoves[i].line
                            let column = castlingMoves[i].column
                            let possibleBlock:any = document.querySelector(`#i${line}j${column}`)
                            
                            if(possibleBlock != undefined) {
                                /*if(pieceType == "Queen") {
                                    console.log(possibleBlock)
                                    possibleBlock.setAttribute(`class`, `possibleBlock`)
                
                                }*/
                            
                                this.paintPossibleBlock(possibleBlock)
                                
                                possibleBlock.onclick = () => {
                                    if(column == 6) {
                                        castling_K = true
                                        castling_Q = false
                                    } else {
                                        castling_K = false
                                        castling_Q = true
                                    }
                                    // console.log(`A
                                    this.callMove(line, column, pieceObj, pieceType, castling_K, castling_Q)
                                }
                                    
                                
                            }
                        }
                    }

                    for(let i = 0; i < possibleMoves.length; i++) {

                        let line = possibleMoves[i].line
                        let column = possibleMoves[i].column
                        let possibleBlock:any = document.querySelector(`#i${line}j${column}`)
                        
                        if(possibleBlock != undefined) {
                            /*if(pieceType == "Queen") {
                                console.log(possibleBlock)
                                possibleBlock.setAttribute(`class`, `possibleBlock`)
            
                            }*/
    
                            this.paintPossibleBlock(possibleBlock)
                            
                            possibleBlock.onclick = () => {
                                this.callMove(line, column, pieceObj, pieceType)
                            }

                                
                            
                            
                        }
            
                    }
                }
    }

    async callMove(line:number, column:number, pieceObj: Piece, pieceType: string, castling_K?:boolean, castling_Q?:boolean) {
        let finalPosition = new Position(line, column)
        
        if(pieceType == `King`) {
            localStorage.setItem(`King`, `moved`)
            // console.log(localStorage)
        } else if(pieceType == `Rook`) {
            if( (pieceObj.position.line == 0 || pieceObj.position.line == 7 )&& pieceObj.position.column == 7)
                localStorage.setItem(`Rook_K`, `moved`)
            else if((pieceObj.position.line == 0 || pieceObj.position.line == 7 )&& pieceObj.position.column == 0)
                localStorage.setItem(`Rook_Q`, `moved`)
        }

        if(pieceType == `King` && 
        (castling_K == true || castling_Q == true)) {
            pieceObj.move(pieceObj.position, finalPosition, this, castling_K, castling_Q)
        } else {
            pieceObj.move(pieceObj.position, finalPosition, this)
        }
        
        let movesAnalyzer = new MovesAnalyzer()

        if(movesAnalyzer.isValidMove(this) == false) {
            if(pieceType == `King` && (castling_K == true || castling_Q == true)) {
                localStorage.removeItem(`King`)
            }
            let gameStored = new DBgame()
            const gameInfo = await gameStored.getGameStored(this.id)
            if(gameInfo != null && gameInfo != false ) {
                
                let players = gameInfo.players
                if(players.length < 2 && storedHash != null) {
                    gameStored.addPlayer2(this.id, storedHash)
                }
                let whosPlaying = gameInfo.whosPlaying
                let game = new Game(players, whosPlaying, this.id)
        
                game.board = gameStored.transformBoard(gameInfo.board)
                let appBoard = document.querySelector<HTMLDivElement>("#app")

                if(appBoard != null) {
                    if(storedHash != null) 
                        game.drawBoard(appBoard, storedHash)
                        
                    game.paintBoard()
                    
                }
            }

            return
        } 

        this.changeWhosPlaying()

        // console.log(movesAnalyzer.verifyAllMovesFromOponent(this))


    

        if(pieceType == `Pawn` && (finalPosition.line == 0 || finalPosition.line == 7)) {
            this.pawnPromotion(finalPosition)
            return;
        }
        let appBoard = document.querySelector<HTMLDivElement>("#app")
        if(appBoard != null) {

            let clientToken = storedHash
            if(clientToken != null){
                dbGame.updateGame(this.id, this)
            }
        }


    }

    addToHistory() {
        let historyDOM = document.querySelector(`.history`)

        if(historyDOM != null && this.history != null) {
            if(this.history.slice(-1)[0] != undefined) {
                let movementDOM = `<p class="historyText">${this.history.slice(-1)[0]}</p>`
                historyDOM.innerHTML += movementDOM

            }

        }
    }
    
}
