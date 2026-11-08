const xadrez = document.querySelector("#tabuleiro");
let posições_peca = []
let peca_clicada = null
const pecas_negras = ["♟", "♜", "♝", "♛", "♚", "♞"];
const pecas_brancas = ["♙", "♖", "♘", "♗", "♕", "♔"];
for (let linha = 0; linha < 8; linha++) {
    posições_peca[linha] = []
    
    for (let coluna = 0; coluna < 8; coluna++) {
    posições_peca[linha][coluna] = null
    }
}
//brancas
posições_peca[0][4] = "♔"
posições_peca[0][0] = "♖"
posições_peca[0][7] = "♖"
posições_peca[0][2] = "♗"
posições_peca[0][5] = "♗"
posições_peca[0][1] = "♘"
posições_peca[0][6] = "♘"
posições_peca[0][3] = "♕"
//pretas
posições_peca[7][0] = "♜"
posições_peca[7][1] = "♞"
posições_peca[7][2] = "♝"
posições_peca[7][3] = "♛"
posições_peca[7][4] = "♚"
posições_peca[7][5] = "♝"
posições_peca[7][6] = "♞"
posições_peca[7][7] = "♜"
for (let coluna = 0; coluna < 8; coluna++) {
    posições_peca[1][coluna] = "♙"
    posições_peca[6][coluna] = "♟"
}
function tabuleiro() {
    xadrez.innerHTML = ""
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++){
            const casa = document.createElement("div")
            casa.classList.add("casa")
            if ((linha + coluna) % 2 == 0) {
                casa.classList.add("branco")
            }
            else {
                casa.classList.add("preto")
            }
            //peças
            let peca = posições_peca[linha][coluna]
            if (peca === "♟" || peca === "♜" || peca ===  "♝" || peca === "♚" || peca === "♛" || peca === "♞") {
                casa.classList.add("peça-preta")
            }
        else if (peca === "♙" || peca === "♔" || peca === "♖" || peca === "♘" || peca === "♗" || peca === "♕") {
                casa.classList.add("peça-branca")
            }
            
            casa.textContent = posições_peca[linha][coluna]
            xadrez.appendChild(casa);
            casa.onclick = function() {
                if (posições_peca[linha][coluna] === "◯") {
                    movimentos(linha, coluna, )
                }
                else {
                    bolinha(linha, coluna)
                }
            }
        }
    }
}
tabuleiro()
    function bolinha(linha, coluna) {
        for (let linhaL = 0; linhaL < 8; linhaL++) {
            for (let colunaL = 0; colunaL < 8; colunaL++) {
                if (posições_peca[linhaL][colunaL] != "♙" && posições_peca[linhaL][colunaL] != "♔" && posições_peca[linhaL][colunaL] != "♖" && posições_peca[linhaL][colunaL] != "♘" && posições_peca[linhaL][colunaL] != "♗" && posições_peca[linhaL][colunaL] != "♕" && posições_peca[linhaL][colunaL] != "♟" && posições_peca[linhaL][colunaL] != "♜" && posições_peca[linhaL][colunaL] !=  "♝" && posições_peca[linhaL][colunaL] != "♚" && posições_peca[linhaL][colunaL] != "♛" && posições_peca[linhaL][colunaL] != "♞") {
                    posições_peca[linhaL][colunaL] = null
                }
            }
        }
        if (posições_peca[linha][coluna] != null) {
            switch (posições_peca[linha][coluna]) {
                case "♟":
                    if (linha > 0 && posições_peca[linha-1][coluna] === null) {
                        posições_peca[linha-1][coluna] = "◯"
                        peca_clicada = "♟"
                        posicao_antiga = [linha, coluna]
                        if (linha -2 > 0 && posições_peca[linha-2][coluna] === null && linha == 6) {
                            posições_peca[linha-2][coluna] = "◯"
                        }
                    }
                    if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && posições_peca[linha-1][coluna-1] === "♙") {
                        posições_peca[linha-1][coluna-1] = "◯"
                    }
                    else if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && posições_peca[linha-1][coluna+1] === "♙") {
                        posições_peca[linha-1][coluna+1] = "◯"
                    }
                    break;
                case "♜":
                    break
                case "♞":
                    break
                case "♝":
                    break
                case "♛":
                    break
                case "♚":
                    break
//branco
                case "♙":
                    if (linha > 0 && posições_peca[linha+1][coluna] === null) {
                        posições_peca[linha+1][coluna] = "◯"
                        peca_clicada = "♙"
                        posicao_antiga = [linha, coluna]
                        if (linha > 0 && posições_peca[linha+2][coluna] === null && linha == 1) {
                            posições_peca[linha+2][coluna] = "◯"
                        }
                   if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && posições_peca[linha-1][coluna-1] === "♟") {
                        posições_peca[linha-1][coluna-1] = "◯"
                    }
                    else if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && posições_peca[linha-1][coluna+1]) {
                        posições_peca[linha-1][coluna+1] = "◯"
                    }
                    }
                    break
                case "♔":
                    break
                case "♖":
                    break
                case "♗":
                    break
                case "♘":
                    break
                case "♕":
                    break
            }
        }
        tabuleiro()
    }
function movimentos(linha, coluna) {
    posições_peca[linha][coluna] = peca_clicada
    posições_peca[posicao_antiga[0]][posicao_antiga[1]] = null
    bolinha(linha, coluna)
    tabuleiro()
    posicao_antiga = [linha, coluna]
}