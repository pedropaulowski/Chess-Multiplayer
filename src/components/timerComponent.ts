export const createTimer = (id:boolean) => {
    let divID = (id == true)? `player1` : `player2`

    let bgc = (id == false)? `timer--black` : `timer--white`
    let aside = document.querySelector(`.aside`)
    let timerDiv = document.querySelector(`#${divID}`)
    if(aside != null && timerDiv == null) {
        aside.innerHTML += `
            <p class='${bgc}' id="${divID}" =>TEMPO</p>  
            `
    }

    return divID
 
}