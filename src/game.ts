import { Bishop } from "./classes/bishop"
import { King } from "./classes/king"
import { Knight } from "./classes/knight"
import { Pawn } from "./classes/pawn"
import { Position } from "./classes/position"
import { Queen } from "./classes/queen"
import { Rook } from "./classes/rook"
import { Void } from "./classes/void"
import { Piece } from "./interfaces/piece"

export class Game {
    board : Piece[][]
    players : Array<string>
    whosPlaying : string

    constructor( players: Array<string>, whosPlaying: string) {
        this.board = this.createBoard()
        this.players = players
        this.whosPlaying = whosPlaying
        
    }

    drawBoard(divBoard: HTMLDivElement, clientPlayer : string) {
        if(divBoard != null) {

            if(this.players[0] == clientPlayer) {
                for (let i = 0; i < 8; i++) {
                    for(let j = 0; j< 8; j++){
                        let block = document.createElement('div')
                        block.setAttribute("id", `i${i}j${j}`)
                        block.setAttribute("class", "block")
                        block.setAttribute("i", `${i}`)
                        block.setAttribute("j", `${j}`)
                        //block.setAttribute("onclick", `escolher(${i},${j})`)
 
                        this.setOnClickFunctions(i, j, block)

                        divBoard.appendChild(block)
                        if(i%2 == 0) {
                            if(j%2 == 0) {
                                block.style.backgroundColor = 'white'
                                // block.style.color = '#22abc3'
                            } else {
                                block.style.backgroundColor = '#22abc3'
                                // block.style.color = 'white'
                            } 
                            
                        } else {
                            if(j%2 == 0) {
                                block.style.backgroundColor = '#22abc3'
                                // block.style.color = 'white'
            
            
                            } else {
                                block.style.backgroundColor = 'white'
                                // block.style.color = '#22abc3'
            
                            }
                        }

                        if(this.board[i][j].color != "void")
                            block.innerHTML = `${this.board[i][j].constructor.name} <br/> ${this.board[i][j].color}`
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

                        this.setOnClickFunctions(i, j, block)
                        divBoard.appendChild(block)
                        if(i%2 == 0) {
                            if(j%2 == 0) {
                                block.style.backgroundColor = 'white'
                                // block.style.color = '#22abc3'
                            } else {
                                block.style.backgroundColor = '#22abc3'
                                // block.style.color = 'white'
                            } 
                            
                        } else {
                            if(j%2 == 0) {
                                block.style.backgroundColor = '#22abc3'
                                // block.style.color = 'white'
            
            
                            } else {
                                block.style.backgroundColor = 'white'
                                // block.style.color = '#22abc3'
            
                            }
                        }

                        if(this.board[i][j].color != "void")
                            block.innerHTML = `${this.board[i][j].constructor.name} <br/> ${this.board[i][j].color}`
                    }
                }
            }
        }
        
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
        let pieceType = this.board[i][j].constructor.name
        let piceObj : Piece;
        let position = new Position(i, j)
        let color = this.board[i][j].color
        piceObj = new Void(position, color)
        
        switch(pieceType) {
            case "Pawn":
                piceObj = new Pawn(position, color)

                break;
            case "Bishop":
                piceObj = new Bishop(position, color)

                break;
            case "Knight":
                piceObj = new Knight(position, color)

                break;
            case "Rook":
                piceObj = new Rook(position, color)

                break;
            case "King":
                piceObj = new King(position, color)

                break;
            case "Queen":
                piceObj = new Queen(position, color)

                break;
            case "Void":
                piceObj = new Void(position, color)

                break;
        }

        let possibleMoves = piceObj.setPossibleMoves(piceObj.position, this)

        block.addEventListener("click", ()=> {
            console.log(possibleMoves)
        })

    }
 
}
