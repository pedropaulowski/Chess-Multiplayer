export const gameOver = (winner: boolean) => {
    let text = (winner == true)? `Você ganhou` : `Você perdeu`
    return (
        `      
        <div id='gameOver'>
            <h2>${text}!</h2>
            <p>${text} por xeque-mate</p>
        </div>`
    ) 
   
}
