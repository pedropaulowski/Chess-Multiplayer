import "./style.css"
import { Game } from "./game";
import { DBgame } from "./dao/firestoreCfg";
import { onSnapshot, doc } from "firebase/firestore";
export const storedHash = localStorage.getItem(`hash`) 
import {db} from "./dao/firestoreCfg"
let appBoard = document.querySelector<HTMLDivElement>("#app")

const queryString = window.location.search;
const urlGame = new URLSearchParams(queryString).get(`game`)
let gameId;
if(urlGame == null) {
	const gameStored = new DBgame()
	if(storedHash != null) {
		let players = [storedHash]
		let game = new Game(players, storedHash, ``)
		gameId = await gameStored.setGameStored(game)

		game.id = gameId

		if(appBoard != null) {
			game.drawBoard(appBoard, storedHash)
		  	game.paintBoard()
		}

		console.log(game.board)
		
	}

} else {
	gameId = urlGame
	const gameStored = new DBgame()
	const gameInfo = await gameStored.getGameStored(urlGame)
	if(gameInfo != null && gameInfo != false ) {
		
		let players = gameInfo.players
		if(players.length < 2 && storedHash != null) {
			gameStored.addPlayer2(urlGame, storedHash)
		}
		let whosPlaying = gameInfo.whosPlaying
		let game = new Game(players, whosPlaying, urlGame)

		// console.log(typeof(gameInfo.board))
		game.board = gameStored.transformBoard(gameInfo.board)
		// console.log(game.board)
		if(appBoard != null) {
			 if(storedHash != null) 
				game.drawBoard(appBoard, storedHash)

		  	game.paintBoard()
		}
	}
}

/**
 * Retornando os dados do banco de dados, falta manipular
 */
if(gameId != null) {
	const unsub = onSnapshot(doc(db, "games", gameId), (doc) => {
		console.log("Current data: ", doc.data());
	});
	
}

