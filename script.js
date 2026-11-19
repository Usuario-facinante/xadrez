const xadrez = document.querySelector("#tabuleiro")
let posições_peca = []
let peca_clicada = null
const pecas_negras = ["♟", "♜", "♝", "♛", "♚", "♞"]
const pecas_brancas = ["♙", "♖", "♘", "♗", "♕", "♔"]
let jogada = 1
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
        if (pecas_negras.includes(peca)) {
            casa.classList.add("peça-preta")
        }
    else if (pecas_brancas.includes(peca)) {
            casa.classList.add("peça-branca")
        }
        casa.textContent = posições_peca[linha][coluna]
        xadrez.appendChild(casa);
        casa.onclick = function() {
            if (posições_peca[linha][coluna] === "◯" || casa.classList.contains("capturavel")) {
                movimentos(linha, coluna)
            }
            else {
                bolinha(linha, coluna)
            }
        }
    }
}

function tabuleiro() {
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            const casa = xadrez.children[linha * 8 + coluna]
            casa.classList.remove("peça-preta", "peça-branca")
            if (pecas_brancas.includes(posições_peca[linha][coluna])) {
                casa.classList.add("peça-branca")
            }
            else if (pecas_negras.includes(posições_peca[linha][coluna])) {
                casa.classList.add("peça-preta")
            }
            casa.textContent = posições_peca[linha][coluna]
        }
    }}
tabuleiro()
    function bolinha(linha, coluna) {
        for (let linhaL = 0; linhaL < 8; linhaL++) {
            for (let colunaL = 0; colunaL < 8; colunaL++) {
                if (posições_peca[linhaL][colunaL] != "♙" && posições_peca[linhaL][colunaL] != "♔" && posições_peca[linhaL][colunaL] != "♖" && posições_peca[linhaL][colunaL] != "♘" && posições_peca[linhaL][colunaL] != "♗" && posições_peca[linhaL][colunaL] != "♕" && posições_peca[linhaL][colunaL] != "♟" && posições_peca[linhaL][colunaL] != "♜" && posições_peca[linhaL][colunaL] !=  "♝" && posições_peca[linhaL][colunaL] != "♚" && posições_peca[linhaL][colunaL] != "♛" && posições_peca[linhaL][colunaL] != "♞") {
                    posições_peca[linhaL][colunaL] = null
                }
            }
        }
        for (let i = 0; i < 64; i++) {
            xadrez.children[i].classList.remove("capturavel")
        }
        if (posições_peca[linha][coluna] != null) {
            if (jogada % 2 === 1) {
                switch (posições_peca[linha][coluna]) {
//preto 
                    case "♟":
                        if (linha > 0 && posições_peca[linha-1][coluna] === null) {
                            posições_peca[linha-1][coluna] = "◯"
                            peca_clicada = "♟"
                            if (linha -2 > 0 && posições_peca[linha-2][coluna] === null && linha == 6) {
                                posições_peca[linha-2][coluna] = "◯"
                            }
                        }
                        if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && pecas_brancas.includes(posições_peca[linha-1][coluna-1])) {
                            xadrez.children[(linha - 1) * 8 + (coluna - 1)].classList.add("capturavel")
                        }
                        if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && pecas_brancas.includes(posições_peca[linha-1][coluna+1])) {
                            xadrez.children[(linha - 1) * 8 + (coluna + 1)].classList.add("capturavel")
                        }
                        break;
                    case "♜":
                        peca_clicada = "♜"
                        torre(linha, coluna)
                    break
                    case "♞":
                        peca_clicada = "♞"
                        cavalo(linha, coluna)
                        break
                    case "♝":
                        peca_clicada = "♝"
                        bispo(linha, coluna)
                        break
                    case "♛":
                        peca_clicada = "♛"
                        torre(linha, coluna)
                        bispo(linha, coluna)
                        break   
                    case "♚":
                        peca_clicada = "♚"
                        rei(linha, coluna)
                        break
                }
            }
            else {     
                    switch (posições_peca[linha][coluna]) {
                        case "♙": 
                            peca_clicada = "♙"
                            if (linha > 0 && posições_peca[linha+1][coluna] === null) {
                                posições_peca[linha+1][coluna] = "◯"
                                posicao_antiga = [linha, coluna]
                                if (linha > 0 && posições_peca[linha+2][coluna] === null) {
                                    posições_peca[linha+2][coluna] = "◯"
                                }
                            }
                            if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && pecas_negras.includes(posições_peca[linha+1][coluna+1])) {
                                xadrez.children[(linha + 1) * 8 + coluna + 1].classList.add("capturavel")
                            }
                            if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && pecas_negras.includes(posições_peca[linha+1][coluna-1])) {
                                xadrez.children[(linha+ 1) * 8 + coluna - 1].classList.add("capturavel")
                            }
                            break
                        case "♔":
                            peca_clicada =  "♔"
                            rei(linha, coluna)
                            break
                        case "♖":
                            peca_clicada = "♖"
                            torre(linha, coluna)
                            break
                        case "♗":
                            peca_clicada = "♗"
                            bispo(linha, coluna)
                            break
                        case "♘":
                            peca_clicada = "♘"
                            cavalo(linha, coluna)
                        break
                        case "♕":
                            peca_clicada = "♕"
                            torre(linha, coluna)
                            bispo(linha, coluna)
                            console.log("rainha")
                            break
                        }
            }
        posicao_antiga = [linha, coluna]
        tabuleiro()
        console.log(jogada)
    }}

function movimentos(linha, coluna) {
    posições_peca[linha][coluna] = peca_clicada
    posições_peca[posicao_antiga[0]][posicao_antiga[1]] = null
    bolinha(linha, coluna)
    jogada++
    for (let linhaL = 0; linhaL < 8; linhaL++) {
        for (let colunaL = 0; colunaL < 8; colunaL++) {
            if (posições_peca[linhaL][colunaL] != "♙" && posições_peca[linhaL][colunaL] != "♔" && posições_peca[linhaL][colunaL] != "♖" && posições_peca[linhaL][colunaL] != "♘" && posições_peca[linhaL][colunaL] != "♗" && posições_peca[linhaL][colunaL] != "♕" && posições_peca[linhaL][colunaL] != "♟" && posições_peca[linhaL][colunaL] != "♜" && posições_peca[linhaL][colunaL] !=  "♝" && posições_peca[linhaL][colunaL] != "♚" && posições_peca[linhaL][colunaL] != "♛" && posições_peca[linhaL][colunaL] != "♞") {
                posições_peca[linhaL][colunaL] = null
            }
        }
    }
for (let i = 0; i < 64; i++) {
    xadrez.children[i].classList.remove("capturavel")
    }

    tabuleiro()
}

//funcionamento das pecas
function rei(linha, coluna) {
if (linha < 7) {
    if (posições_peca[linha+1][coluna] === null) {
        posições_peca[linha+1][coluna] = "◯"
    }
    else if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha++][coluna])) {
        xadrez.children[(linha++) * 8 + coluna].classList.add("capturavel") 
    }
    else if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha++][coluna])) {
        xadrez.children[(linha++) * 8 + coluna].classList.add("capturavel") 
    }
    if (coluna < 8 && posições_peca[linha+1][coluna+1] === null) {
        posições_peca[linha+1][coluna+1] = "◯"
    }
    if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha++][coluna++])) {
        xadrez.children[(linha++) * 8 + coluna++].classList.add("capturavel")
    }
    if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha++][coluna++])) {
        xadrez.children[(linha++) * 8 + coluna++].classList.add("capturavel")
    }
    if (coluna > 0 && posições_peca[linha+1][coluna-1] === null) {
        posições_peca[linha+1][coluna-1] = "◯"
    }
    if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha++][coluna--])) {
        xadrez.children[(linha++) * 8 + coluna--].classList.add("capturavel")
    }
    if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha++][coluna--])) {
        xadrez.children[(linha++) * 8 + coluna--].classList.add("capturavel")
    }
}
if (coluna > 0) {
    if (posições_peca[linha][coluna-1] === null) {
        posições_peca[linha][coluna-1] = "◯"
    }
    if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha][coluna--])) {
        xadrez.children[(linha) * 8 + coluna--].classList.add("capturavel") 
    }
    if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha][coluna--])) {
        xadrez.children[(linha) * 8 + coluna--].classList.add("capturavel") 
    }
    if (posições_peca[linha][coluna+1] ===  null) {
        posições_peca[linha][coluna+1] = "◯"
    }
    if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha][coluna++])) {
        xadrez.children[linha * 8 + coluna++].classList.add("capturavel") 
    }
    if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha][coluna++])) {
        xadrez.children[linha * 8 + coluna++].classList.add("capturavel") 
    }

}
if (linha > 0) {
    if (posições_peca[linha-1][coluna] === null) {
        posições_peca[linha-1][coluna] = "◯"
    }
    else if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha--][coluna])) {
        xadrez.children[(linha--) * 8 + coluna].classList.add("capturavel") 
    }
    else if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha][coluna])) {
        xadrez.children[(linha--) * 8 + coluna].classList.add("capturavel") 
    }

    if (posições_peca[linha-1][coluna+1] === null) {
        posições_peca[linha-1][coluna+1] = "◯"
    }
    else if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha--][coluna++])) {
        xadrez.children[(linha--) * 8 + coluna++].classList.add("capturavel") 
    }
    else if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha--][coluna++])) {
        xadrez.children[(linha--) * 8 + coluna++].classList.add("capturavel") 
    }


    if (posições_peca[linha-1][coluna-1] === null) {
        posições_peca[linha-1][coluna-1] = "◯"
    }
    else if (pecas_brancas.includes([linha][coluna]) && pecas_negras.includes(posições_peca[linha--][coluna--])) {
        xadrez.children[(linha--) * 8 + coluna--].classList.add("capturavel") 
    }
    else if (pecas_negras.includes([linha][coluna]) && pecas_brancas.includes(posições_peca[linha--][coluna--])) {
        xadrez.children[(linha--) * 8 + coluna--].classList.add("capturavel") 
    }

}
}
function torre(linha, coluna) {
    if (linha < 8) {
        for (let colunax = coluna + 1; colunax < 8; colunax++) {
            if (posições_peca[linha][colunax] === null){
                posições_peca[linha][colunax] = "◯"
            }
            else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha][colunax])) {
                xadrez.children[linha * 8 + coluna].classList.add("capturavel")
                break
            }
            else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha][colunax])) {
                xadrez.children[linha * 8 + coluna].classList.add("capturavel")
                break
            }
            else {
                break
            }
        }

    }
    if (linha < 8) {
        for (let colunax = coluna - 1; colunax < 8; colunax--) {
            if (posições_peca[linha][colunax] === null){
                posições_peca[linha][colunax] = "◯"
            }
            else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha][colunax])) {
                xadrez.children[linha * 8 + colunax].classList.add("capturavel")
                break
            }
            else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha][colunax])) {
                xadrez.children[linha * 8 + colunax].classList.add("capturavel")
                break
            }
            else {
                break
            }
        }
    }
        if (coluna < 8) {
            for (let linhax = linha - 1; linhax >= 0; linhax--) {
                if (posições_peca[linhax][coluna] === null) {
                    posições_peca[linhax][coluna] = "◯"
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linhax][coluna])) {
                    xadrez.children[linhax * 8 + coluna].classList.add("capturavel")
                    break
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linhax][coluna])) {
                    xadrez.children[linhax * 8 + coluna].classList.add("capturavel")
                    break
                }
            else {
                break
            }
        }
    }
        if (coluna < 8) {
            for (let linhax = linha + 1; linhax < 8; linhax++) {
                if (posições_peca[linhax][coluna] === null) {
                    posições_peca[linhax][coluna] = "◯"
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linhax][coluna])) {
                    xadrez.children[linhax * 8 + coluna].classList.add("capturavel")
                    break
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linhax][coluna])) {
                    xadrez.children[linhax * 8 + coluna].classList.add("capturavel")
                    break
                }
            else {
                break
            }
        }
    }
}
function cavalo(linha, coluna) {
    if (linha-1 >= 0) {
        if (coluna+2 <= 7 && posições_peca[linha - 1][coluna + 2] === null) {
            posições_peca[linha-1][coluna+2] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha--][coluna + 2])) {
            xadrez.children[(linha--) * 8 + coluna + 2].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha--][coluna + 2])) {
            xadrez.children[(linha--) * 8 + coluna + 2].classList.add("capturavel") 
        }

        if (coluna-2 >= 0 && posições_peca[linha - 1][coluna - 2] === null) {
            posições_peca[linha-1][coluna-2] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha--][coluna - 2])) {
            xadrez.children[(linha--) * 8 + coluna - 2].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha--][coluna - 2])) {
            xadrez.children[(linha--) * 8 + coluna - 2].classList.add("capturavel") 
        }
}
    if (linha-2 >= 0) {
        if (coluna+1 <= 7 && posições_peca[linha - 2][coluna + 1] === null) {
            posições_peca[linha-2][coluna+1] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha - 2][coluna++])) {
            xadrez.children[(linha - 2) * 8 + coluna++].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha - 2][coluna++])) {
            xadrez.children[(linha - 2) * 8 + coluna++].classList.add("capturavel") 
        }
        if (coluna-1 >= 0 && posições_peca[linha - 2][coluna - 1] === null) {
            posições_peca[linha-2][coluna-1] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha - 2][coluna--])) {
            xadrez.children[linha * 8 + coluna--].classList.add("capturavel") 
    }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha - 2][coluna--])) {
            xadrez.children[linha * 8 + coluna--].classList.add("capturavel") 
    }

    }
    if (linha + 1 <= 7 && posições_peca[linha + 1][coluna + 2] === null) {
        if (coluna + 2 <= 7) {
            posições_peca[linha + 1][coluna + 2] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha++][coluna + 2])) {
        xadrez.children[(linha++) * 8 + coluna + 2].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha++][coluna + 2])) {
        xadrez.children[(linha++) * 8 + coluna + 2].classList.add("capturavel") 
        }
        if (coluna - 2 >= 0 && posições_peca[linha + 1][coluna - 2] === null) {
            posições_peca[linha + 1][coluna - 2] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha++][coluna- 2])) {
            xadrez.children[(linha++) * 8 + coluna- 2].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha++][coluna- 2])) {
            xadrez.children[(linha++) * 8 + coluna- 2].classList.add("capturavel") 
        }

    }
    if (linha + 2 <= 7) {
        if (coluna+1 <= 7 && posições_peca[linha + 2][coluna + 1] === null) {
            posições_peca[linha+2][coluna+1] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha + 2][coluna++])) {
            xadrez.children[(linha + 2) * 8 + coluna++].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha + 2][coluna++])) {
            xadrez.children[(linha + 2) * 8 + coluna++].classList.add("capturavel") 
        }

        if (coluna-1 >= 0 && posições_peca[linha + 2][coluna - 1] === null) {
            posições_peca[linha+2][coluna-1] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha + 2][coluna--])) {
            xadrez.children[(linha + 2) * 8 + coluna--].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha + 2][coluna--])) {
            xadrez.children[(linha + 2) * 8 + coluna--].classList.add("capturavel") 
        }

    }
   
}
function bispo(linha, coluna) {
    for (let diagonal = 1; diagonal < 8; diagonal++) {
        if (linha + diagonal < 8 && coluna + diagonal < 8) {
            if (posições_peca[linha + diagonal][coluna + diagonal] === null) {
                posições_peca[linha + diagonal][coluna + diagonal] = "◯"
            }
            else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha + diagonal][coluna + diagonal])) {
                xadrez.children[(linha + diagonal) * 8 + coluna + diagonal].classList.add("capturavel")
                break
            }
            else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha + diagonal][coluna + diagonal])) {
                xadrez.children[(linha + diagonal) * 8 + coluna + diagonal].classList.add("capturavel") 
                break
            }
            else {
                break
            }
    } 
        else {
            break
        }
    }
        for (let diagonal = 1; diagonal < 8; diagonal++) {
            if (linha + diagonal < 8 && coluna - diagonal >= 0) {
                if (posições_peca[linha + diagonal][coluna - diagonal] === null) {
                    posições_peca[linha + diagonal][coluna - diagonal] = "◯"
            }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha + diagonal][coluna - diagonal])) {
                    xadrez.children[(linha + diagonal) * 8 + coluna - diagonal].classList.add("capturavel") 
                    break
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha + diagonal][coluna - diagonal])) {
                    xadrez.children[(linha + diagonal) * 8 + coluna - diagonal].classList.add("capturavel") 
                    break
                }
                else {
                    break
                }
            }
            else {
                break
            }
        }
    for (let diagonal = 1; diagonal < 8; diagonal++) {
        if (linha - diagonal >= 0 && coluna - diagonal >= 0) {
            if (posições_peca[linha - diagonal][coluna - diagonal] === null) {
                posições_peca[linha - diagonal][coluna - diagonal] = "◯"
            }
            else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha - diagonal][coluna - diagonal])) {
                xadrez.children[(linha - diagonal) * 8 + coluna - diagonal].classList.add("capturavel") 
                break
            }
            else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha - diagonal][coluna - diagonal])) {
                xadrez.children[(linha - diagonal) * 8 + coluna - diagonal].classList.add("capturavel") 
                break
            }
            else {
                break
            }
        }
        else {
            break
        }
    }
    for (let diagonal = 1; diagonal < 8; diagonal++) {    
        if (linha - diagonal >= 0 && coluna + diagonal < 8) {
            if (posições_peca[linha - diagonal][coluna + diagonal] === null) {
                posições_peca[linha - diagonal][coluna + diagonal] = "◯" 
            }
            else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha - diagonal][coluna + diagonal])) {
                xadrez.children[(linha - diagonal) * 8 + coluna + diagonal].classList.add("capturavel") 
                break
            }
            else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha - diagonal][coluna + diagonal])) {
                xadrez.children[(linha - diagonal) * 8 + coluna + diagonal].classList.add("capturavel") 
                break
            }
            else {
                break
            }
        }
        else {
            break
        }
        }   
}