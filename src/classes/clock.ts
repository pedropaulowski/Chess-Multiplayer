import { DBgame } from "../dao/firestoreCfg"
let counter:any
let cron:any




export class Clock {
    minutes : number
    seconds : number
    interval : number
    status : boolean
    timerString : string 
    gameId: string

    constructor(minutes: number, seconds: number, gameId: string) {
        this.minutes = minutes
        this.seconds = seconds
        this.interval = 1000
        this.status = false
        let minutesString = (this.minutes < 10)? `0${this.minutes}`: `${this.minutes}`
        let secondsString = (this.seconds < 10)? `0${this.seconds}`: `${this.seconds}`
        this.timerString = `${minutesString}:${secondsString}`
        this.gameId = gameId

    }

    start(divID:string):void {
        // console.log(divID)
        if(this.status != true) {

            if(divID == `player1`) {
                this.status = true
                counter = setInterval(() => {this.timer(divID)}, this.interval);
                // console.log(`chamado`, counter)
            } else {
                this.status = true
                cron = setInterval(() => {this.timer(divID)}, this.interval);
            
                // console.log(`chamado`, cron)
            }

            
        }
          

    }

    timer = async (divID: string) => {
        if(this.seconds == 0) {
            this.seconds = 59
            this.minutes--
        } else {
            this.seconds--
        }

        let minutesString = (this.minutes < 10)? `0${this.minutes}`: `${this.minutes}`
        let secondsString = (this.seconds < 10)? `0${this.seconds}`: `${this.seconds}`

        this.timerString = `${minutesString}:${secondsString}`

        let timerDIV = document.querySelector(`#${divID}`)

        if(timerDIV != null) {
            timerDIV.innerHTML = this.timerString
        }


            // console.log(`TEMPO ${divID} : ${this.timerString}`) 

        if(this.minutes == 0 && this.seconds == 0)  {

            const dbGame = new DBgame()
            const gameIdValue = this.gameId
            const gameStored = await dbGame.getGameStored(gameIdValue)

            if(gameStored != null && gameStored != false) {
                // console.log(gameStored)
                gameStored.winner = (divID == `player1`)? gameStored.players[1] : gameStored.players[0]

                dbGame.updateGame(this.gameId, dbGame.convertDataStored(this.gameId, gameStored))
                clearInterval(cron)
                clearInterval(counter)

            }
            clearInterval(cron)
            clearInterval(counter)
            // alert(`Acabou o tempo`)
        }

    }

    pause(divID:any): void {

        if(divID == `player1`)
            clearInterval(counter)
        else 
            clearInterval(cron)


        this.status = false
    }
}

