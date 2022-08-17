export const gameOver = (winner: boolean, mate: boolean) => {
    let text = (winner == true)? `Você ganhou` : `Você perdeu`
    let condition = (mate == true)? `Xeque-mate` : `tempo`
    return (
        `      
        <div id='gameOver'>
            <h2>${text}!</h2>
            <p>${text} por ${condition}!</p>
        </div>`
    ) 
   
}
