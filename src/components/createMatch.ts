export const createMatch = () => {
    return (
        `
        <p class='label' id="gameIdText">Codigo da partida para enviar a seu oponente:</p>
        <p class='input' type="text" name="gameId" id="gameId"></p>
        <button class="button" id="btnCopyId">Copiar codigo</button>    
        `
    ) 
 
}