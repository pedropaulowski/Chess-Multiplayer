import "./style.css"
import { Game } from "./game";


let players : Array<string> = ["Pedro", "Paulo"]
let game = new Game(players, players[0])
console.log(game)

let appBoard = document.querySelector<HTMLDivElement>("#app")

if(appBoard != null)
  game.drawBoard(appBoard, players[0])
