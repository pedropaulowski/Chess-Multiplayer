import { Bishop } from "./classes/bishop"
import { King } from "./classes/king"
import { Knight } from "./classes/knight"
import { Pawn } from "./classes/pawn"
import { Position } from "./classes/position"
import { Queen } from "./classes/queen"
import { Rook } from "./classes/rook"
import { Void } from "./classes/void"
import { Piece } from "./interfaces/piece"
import { color } from "./types/types"

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
            divBoard.innerHTML = ``
            if(this.players[0] == clientPlayer) {
                for (let i = 0; i < 8; i++) {
                    for(let j = 0; j< 8; j++){
                        let block = document.createElement('div')
                        block. innerHTML = `i${i}j${j}`
                        block.setAttribute("id", `i${i}j${j}`)
                        block.setAttribute("class", "block")
                        block.setAttribute("i", `${i}`)
                        block.setAttribute("j", `${j}`)
                        //block.setAttribute("onclick", `escolher(${i},${j})`)
 
                        this.setOnClickFunctions(i, j, block)
                        // console.log(block)
                        divBoard.appendChild(block)
                        if(i%2 == 0) {
                            if(j%2 == 0) {
                                // block.style.backgroundColor = 'white'
                                
                            } else {
                                // block.style.backgroundColor = '#22abc3'
                                
                            } 
                            
                        } else {
                            if(j%2 == 0) {
                                // block.style.backgroundColor = '#22abc3'
                                      
                            } else {
                                // block.style.backgroundColor = 'white'
                                            
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
                                // block.style.backgroundColor = 'white'
                                
                            } else {
                                // block.style.backgroundColor = '#22abc3'
                                
                            } 
                            
                        } else {
                            if(j%2 == 0) {
                                // block.style.backgroundColor = '#22abc3'
                            
                            } else {
                                // block.style.backgroundColor = 'white'
                                
            
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
        
        if(pieceType != `Void`) {


            block.addEventListener("click", ()=> {
                document.querySelectorAll(`.possibleBlock`).forEach((e) =>{
                    e.classList.remove(`possibleBlock`)
                })


                for(let i = 0; i < possibleMoves.length; i++) {
                    let line = possibleMoves[i].line
                    let column = possibleMoves[i].column
                    let possibleBlock = document.querySelector(`#i${line}j${column}`)
                    
                    if(possibleBlock != undefined) {
                        /*if(pieceType == "Queen") {
                            console.log(possibleBlock)
                            possibleBlock.setAttribute(`class`, `possibleBlock`)

                        }*/
                        possibleBlock.setAttribute(`class`, `block possibleBlock`)
                        possibleBlock.addEventListener(`click`, (e) => {

                            let currentPosition = pieceObj.position
                            let target = e.target

                            if(target != null) {

                                let finalLine = parseInt(target.getAttribute(`i`))
                                let finalColumn = parseInt(target.getAttribute(`j`))
                                let finalPosition = new Position(finalLine, finalColumn)

                                pieceObj.move(currentPosition, finalPosition, this)
                                let appBoard = document.querySelector<HTMLDivElement>("#app")
                                
                                if(appBoard != null)
                                    this.drawBoard(appBoard, this.players[0])
                            }
                            
                        })
                    }

                }
            })
        }


    }
 
}
