import {addDoc, arrayUnion, collection, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Game } from "../game";
import { Piece } from "../interfaces/piece";
import { Bishop } from "../classes/bishop";
import { King } from "../classes/king";
import { Knight } from "../classes/knight";
import { Pawn } from "../classes/pawn";
import { Queen } from "../classes/queen";
import { Rook } from "../classes/rook";
import { Void } from "../classes/void";
import { color } from "../types/types";
import { firebaseConfig } from "../firebaseCONF"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics;
export const db = getFirestore(app)

export class DBgame {

    setGameStored = async (game : Game): Promise<string> => {
        let gameBoard : any = []
        let idStored : string
        idStored = ``
        game.board.map( v => {
            v.map( e => {
                let pieceName = e.unicode
                gameBoard.push({
                    unicode : e.unicode,
                    position : e.position,
                    color : e.color,
                    pieceName : pieceName
                })
                // console.log(pieceName)
            })
        })
        await addDoc( collection (db, `games`) , {
            board: JSON.stringify(gameBoard),
            players: game.players,
            whosPlaying: game.whosPlaying,
            history: game.history,
            isBlackInCheck: game.isBlackInCheck,
            isWhiteInCheck: game.isWhiteInCheck,
        }).then( (v : any) => {
            idStored = v._key.path.segments[1]
            return idStored;

        })
        .catch( (v: any) => {
            console.log(v)

        })
        .finally(function() { });

        return idStored;


    }

    getGameStored = async (gameId: string) => {

        const docRef = doc(db, `games`, gameId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
            return false
        }

    }

    transformBoard(boardString: string) {
        let aux = 0
        let board : Piece[][]
        let boardStored = JSON.parse(boardString)
        board = []

        for(let i : number = 0 ; i < 8; i++) {
            board.push([])
            for(let j : number = 0 ; j < 8; j++) {
                let storedPos = boardStored[aux].position
                let position = storedPos
                let color : color
                color = boardStored[aux].color
                switch(boardStored[aux].pieceName) {
                    case(`Rook`):
                    case(`♜`):
                        board[i][j] = new Rook(position, color)
                    break;

                    case(`Knight`):
                    case(`♞`):
                        board[i][j] = new Knight(position, color)
                    break;

                    case(`Bishop`):
                    case(`♝`):
                        board[i][j] = new Bishop(position, color)
                    break;

                    case(`Queen`):
                    case(`♛`):
                        board[i][j] = new Queen(position, color)
                        break;

                    case(`King`):
                    case(`♚`):
                        board[i][j] = new King(position, color)
                    break;

                    case (`Void`):
                    case (``):
                        board[i][j] = new Void(position, color)
                    break;

                    case (`Pawn`):
                    case (`♟`):
                        board[i][j] = new Pawn(position, color)
                    break;
                }
                aux++

            }


        }

        return board
    }

    updateGame = async (gameId: string , game : Game) => {
        let gameBoard : any = []
        game.board.map( v => {
            v.map( e => {
                let pieceName = e.unicode
                gameBoard.push({
                    unicode : e.unicode,
                    position : e.position,
                    color : e.color,
                    pieceName : pieceName,

                })
                // console.log(pieceName)
            })
        })
        const gameRef = doc(db, `games`, gameId)
        await updateDoc( gameRef, {
            board: JSON.stringify(gameBoard),
            players: game.players,
            whosPlaying: game.whosPlaying,
            history: game.history,
            isBlackInCheck : game.isBlackInCheck,
            isWhiteInCheck : game.isWhiteInCheck
        });
    }

    addPlayer2 = async (gameId: string, player2Hash: string) => {
        const gameRef = doc(db, `games`, gameId)
        await updateDoc( gameRef, {
            players: arrayUnion(player2Hash),
        });
    }

    convertDataStored = (id: string, gameStored : any) => {
        
        let gameId = id
        let board = this.transformBoard(gameStored.board)
        
        let players = gameStored.players
        let whosPlaying = gameStored.whosPlaying
        let history = gameStored.history
        let isBlackInCheck = gameStored.isBlackInCheck
        let isWhiteInCheck = gameStored.isWhiteInCheck

        let game = new Game(players, whosPlaying, gameId)
        game.board = board
        game.history = history
        game.isBlackInCheck = isBlackInCheck
        game.isWhiteInCheck = isWhiteInCheck
        return game
    }   
    

    
}