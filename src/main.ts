import "./style.css"
import { Game } from "./game";
import { DBgame } from "./dao/firestoreCfg";
import { onSnapshot, doc } from "firebase/firestore";
export const storedHash = localStorage.getItem(`hash`) 
import {db} from "./dao/firestoreCfg"
import { joinMatch } from "./components/joinMatch";
import { createMatch } from "./components/createMatch";



let appBoard = document.querySelector<HTMLDivElement>("#app")


// let gameId;

const joinMatchBtn = document.querySelector(`#joinMatch`)
const createMatchBtn = document.querySelector(`#createMatch`)

joinMatchBtn?.addEventListener(`click`, () => {
	localStorage.clear()
	let aside = document.querySelector(`aside`)
	if(aside != null)
		aside.innerHTML = joinMatch()
	
	let btnSearchGame = document.querySelector(`#searchGame`)


	
	if(btnSearchGame != null) {

		btnSearchGame.addEventListener(`click`, async() => {

			let gameId:any = document.querySelector(`#gameId`)
			
			if(gameId != null) {
				
				const gameStored = new DBgame()
				const gameIdValue = gameId.value
				const gameInfo = await gameStored.getGameStored(gameIdValue)
				if(gameInfo != null && gameInfo != false ) {
					
					let players = gameInfo.players
					if(players.length < 2 && storedHash != null) {
						gameStored.addPlayer2(gameIdValue, storedHash)
					}
					let whosPlaying = gameInfo.whosPlaying
					let game = new Game(players, whosPlaying, gameIdValue)
			
					game.board = gameStored.transformBoard(gameInfo.board)
					if(appBoard != null) {
						if(storedHash != null) 
							game.drawBoard(appBoard, storedHash)
							
						game.paintBoard()
					}
				}

				
				const unsub = onSnapshot(doc(db, "games", gameIdValue), (doc) => {
					
					let dataTransformed = gameStored.convertDataStored(gameIdValue, doc.data())

					let game = dataTransformed
					
					if(appBoard != null )
						if(storedHash != null) 
							game.drawBoard(appBoard, storedHash)

				});
					
				
			}
		})

	}
})

createMatchBtn?.addEventListener(`click`, async() => {
	localStorage.clear()
	let aside = document.querySelector(`aside`)
	if(aside != null)
		aside.innerHTML = createMatch()

	let pGameId = document.querySelector(`#gameId`)
	let urlGame = pGameId?.innerHTML
	
	if(urlGame == `` && pGameId != null) {
		const gameStored = new DBgame()
		if(storedHash != null) {
			let players = [storedHash]
			let game = new Game(players, storedHash, ``)
			game.history = []
			let gameId = await gameStored.setGameStored(game)
	
			game.id = gameId
			pGameId.innerHTML = game.id
			urlGame = game.id
	
			if(appBoard != null) {
				game.drawBoard(appBoard, storedHash)
					game.paintBoard()
			}
	
			const unsub = onSnapshot(doc(db, "games", game.id), (doc) => {
				
				let gameUpdated = doc.data()

				game = gameStored.convertDataStored(game.id, gameUpdated)

				if(appBoard != null)
					game.drawBoard(appBoard, storedHash)

				
			});
			
		}
	}

	let btnCopyId = document.querySelector(`#btnCopyId`)

	if(btnCopyId != null)  {
		btnCopyId.addEventListener(`click`, () => {
			console.log(urlGame)
			if(urlGame != null)
				navigator.clipboard.writeText(urlGame)
			
			if(btnCopyId != null)
				btnCopyId.innerHTML = `Copiado`
		})
	}
})


/*
async function  start() {
	const pGameId = document.querySelector(`#gameId`)
	const urlGame = pGameId?.innerHTML
	
	if(urlGame == `` && pGameId != null) {
		const gameStored = new DBgame()
		if(storedHash != null) {
			let players = [storedHash]
			let game = new Game(players, storedHash, ``)
			gameId = await gameStored.setGameStored(game)
	
			game.id = gameId
			pGameId.innerHTML = game.id
	
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
	
			game.board = gameStored.transformBoard(gameInfo.board)
			if(appBoard != null) {
				 if(storedHash != null) 
					game.drawBoard(appBoard, storedHash)
					
				  game.paintBoard()
			}
		}
	}
	
	
	if(gameId != null) {
		const unsub = onSnapshot(doc(db, "games", gameId), (doc) => {
			console.log("Current data: ", doc.data());
		});
		
	}
}

*/


