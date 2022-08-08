import "./style.css"
import { Game } from "./game";


export const players : Array<string> = ["Pedro", "Paulo"]
let game = new Game(players, players[0])

let appBoard = document.querySelector<HTMLDivElement>("#app")

if(appBoard != null) {
  game.drawBoard(appBoard, players[0])
  // game.paintBoard()
}
