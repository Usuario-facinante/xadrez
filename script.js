    // guarda as casas (linha * 8 + coluna) de onde uma peça saiu ou onde chegou um lance.
// Se a casa do rei ou da torre estiver aqui, ela já se mexeu (ou foi capturada) e o roque com ela não vale mais.
const casas_mexidas = new Set()
    const xadrez = document.querySelector("#tabuleiro")
    let roque_disponivel = false
    let posições_peca = []
    let peca_clicada = null
    let havia_selecao = null
    let posicao_antiga = []
    const pecas_negras = ["♟", "♜", "♝", "♛", "♚", "♞"]
    const pecas_brancas = ["♙", "♖", "♘", "♗", "♕", "♔"]
    let jogada = 1

    // a função movimentos() zera (null) esta variável a cada lance
    let en_passant_alvo = null
    let fim_de_jogo = false

    for (let linha = 0; linha < 8; linha++) {
        posições_peca[linha] = []
        
        for (let coluna = 0; coluna < 8; coluna++) {
        posições_peca[linha][coluna] = null
        }
    }
    //colocando as piecas
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
    //criacao di casas
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
                if (fim_de_jogo) {
                    return
                }
                if (posições_peca[linha][coluna] === "◯" || posições_peca[linha][coluna] === "O" || casa.classList.contains("capturavel")) {
                    movimentos(linha, coluna)
                }
                else {
                    havia_selecao = temMarcacao()
                    bolinha(linha, coluna)
                }
            }
        }
    }
//atualizacao di casas
    function tabuleiro() {
        for (let linha = 0; linha < 8; linha++) {
            for (let coluna = 0; coluna < 8; coluna++) {
                const casa = xadrez.children[linha * 8 + coluna]
                
                casa.classList.remove("peça-preta", "peça-branca", "em-xeque")
                if (pecas_brancas.includes(posições_peca[linha][coluna])) {
                    casa.classList.add("peça-branca")
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna])) {
                    casa.classList.add("peça-preta")
                }
                casa.textContent = posições_peca[linha][coluna]
            }
        }
        for (const cor_do_rei of ["branco", "preto"]) {
            if (xeque(cor_do_rei)) {
                const posicao_do_rei = encontrarRei(cor_do_rei)
                xadrez.children[posicao_do_rei[0] * 8 + posicao_do_rei[1]].classList.add("em-xeque")
            }
        }
    }
    tabuleiro()
        function bolinha(linha, coluna) {
            for (let linhaL = 0; linhaL < 8; linhaL++) {
                for (let colunaL = 0; colunaL < 8; colunaL++) {
                    if (!pecas_brancas.includes(posições_peca[linhaL][colunaL]) && !pecas_negras.includes(posições_peca[linhaL][colunaL])) {
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
                            peca_clicada = "♟"
                            if (linha > 0 && posições_peca[linha-1][coluna] === null) {
                                posições_peca[linha-1][coluna] = "◯"
                                if (linha === 6 && posições_peca[linha-2][coluna] === null) {
                                    posições_peca[linha-2][coluna] = "◯"
                                }
                            }
                            if (linha > 0 && linha < 8 && coluna > 0 && coluna < 8 && pecas_brancas.includes(posições_peca[linha-1][coluna-1])) {
                                xadrez.children[(linha - 1) * 8 + (coluna - 1)].classList.add("capturavel")
                            }
                            if (linha > 0 && linha < 8 && coluna < 7 && pecas_brancas.includes(posições_peca[linha-1][coluna+1])) {
                                xadrez.children[(linha - 1) * 8 + (coluna + 1)].classList.add("capturavel")
                            }
                            enPassant(linha, coluna)
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
                                if (linha + 1 <= 7 && posições_peca[linha+1][coluna] === null) {
                                    posições_peca[linha+1][coluna] = "◯"
                                    if (linha +2 <= 7 && linha === 1 && posições_peca[linha+2][coluna] === null) {
                                        posições_peca[linha+2][coluna] = "◯"
                                    }
                                }
                                if (linha +1<= 7 && coluna +1<= 7 && pecas_negras.includes(posições_peca[linha+1][coluna+1])) {
                                    xadrez.children[(linha + 1) * 8 + coluna + 1].classList.add("capturavel")
                                }
                                if (linha +1<= 7 && coluna -1>= 0 && pecas_negras.includes(posições_peca[linha+1][coluna-1])) {
                                    xadrez.children[(linha+ 1) * 8 + coluna - 1].classList.add("capturavel")
                                }
                                // Se for possível capturar en passant, marca a casa de destino com "◯" (ver função enPassant).
                                enPassant(linha, coluna)
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
            // tira us lanci ilegal
            filtrarMovimentos()
            tabuleiro()
            console.log(jogada)
        }
        else {
            tabuleiro()
        }
    }

    function movimentos(linha, coluna) {
    // ROQUE — registra a casa de origem e a de destino deste lance como "mexidas".
    // Assim, se o rei/torre sair do lugar, ou uma torre for capturada no canto, o roque com ela deixa de valer.
    // Isto fica aqui (e não no rei()/bolinha()) porque bolinha() também roda nas simulações do temLanceLegal().
    casas_mexidas.add(posicao_antiga[0] * 8 + posicao_antiga[1])
    casas_mexidas.add(linha * 8 + coluna)
        const linhaRei = posicao_antiga[0]
        // ... o resto continua igual
        if (posições_peca[linha][coluna] === "O") {
            const linhaRei = posicao_antiga[0]
              en_passant_alvo = null

            const torre = peca_clicada === "♔" ? "♖" : "♜"
            posições_peca[posicao_antiga[0]][coluna] = null
            if (coluna === 6) {
                // Roque pequeno
                posições_peca[linhaRei][5] = torre
                posições_peca[linhaRei][7] = null
            } else {
                // Roque grande
                posições_peca[linhaRei][3] = torre
                posições_peca[linhaRei][0] = null
            }
        }
        else {
            if ((peca_clicada === "♙" || peca_clicada === "♟") && en_passant_alvo !== null && linha === en_passant_alvo[0] && coluna === en_passant_alvo[1] && coluna !== posicao_antiga[1]) {
                posições_peca[posicao_antiga[0]][coluna] = null
            }    // [NOVO] EN PASSANT — registro: se um peão acabou de andar 2 casas, a casa do meio vira o alvo de en passant
            if ((peca_clicada === "♙" || peca_clicada === "♟") && (linha - posicao_antiga[0]) === 2) {
                en_passant_alvo = [(linha + posicao_antiga[0]) / 2, coluna]
            }
            else {
                en_passant_alvo = null
            }
        }
        posições_peca[linha][coluna] = peca_clicada
        posições_peca[posicao_antiga[0]][posicao_antiga[1]] = null
        jogada += 1
        roque_disponivel = false
        limparMarcacoes()
        verificarFimDeJogo()
    }

    //funcionamento das pecas
    function rei(linha, coluna) {
    if (linha +1 <= 7) {
        if (posições_peca[linha+1][coluna] === null) {
            posições_peca[linha+1][coluna] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha+ 1][coluna])) {
            xadrez.children[(linha+ 1) * 8 + coluna].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha+ 1][coluna])) {
            xadrez.children[(linha+ 1) * 8 + coluna].classList.add("capturavel") 
        }
        if (coluna +1 <= 7 && posições_peca[linha+1][coluna+1] === null) {
            posições_peca[linha+1][coluna+1] = "◯"
        }
        if (coluna +1 <= 7 && pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha+ 1][coluna+ 1])) {
            xadrez.children[(linha+ 1) * 8 + coluna+ 1].classList.add("capturavel")
        }
        if (coluna +1 <= 7 && pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha+ 1][coluna+ 1])) {
            xadrez.children[(linha+ 1) * 8 + coluna+ 1].classList.add("capturavel")
        }
        }
        if (coluna +1 <= 7 && posições_peca[linha][coluna+1] ===  null) {
            posições_peca[linha][coluna+1] = "◯"
        }
        if (coluna +1 <= 7 && pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha][coluna+ 1])) {
            xadrez.children[linha * 8 + coluna+ 1].classList.add("capturavel") 
        }
        if (coluna +1 <= 7 && pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha][coluna+ 1])) {
            xadrez.children[linha * 8 + coluna+ 1].classList.add("capturavel") 
        }
        if (coluna-1 >= 0 && linha+1<= 7 && posições_peca[linha+1][coluna-1] === null) {
            posições_peca[linha+1][coluna-1] = "◯"
        }
        if (coluna-1 >= 0 && linha+1 <= 7 && pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha+ 1][coluna- 1])) {
            xadrez.children[(linha+ 1) * 8 + coluna- 1].classList.add("capturavel")
        }
        if (coluna-1 >= 0 && linha+1 <= 7 && pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha+ 1][coluna- 1])) {
            xadrez.children[(linha+ 1) * 8 + coluna- 1].classList.add("capturavel")
        }
    if (coluna - 1 >= 0) {
        if (posições_peca[linha][coluna-1] === null) {
            posições_peca[linha][coluna-1] = "◯"
        }
        if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha][coluna- 1])) {
            xadrez.children[(linha) * 8 + coluna- 1].classList.add("capturavel") 
        }
        if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha][coluna- 1])) {
            xadrez.children[(linha) * 8 + coluna- 1].classList.add("capturavel") 
        }
    }
    if (linha - 1 >= 0) {
        if (posições_peca[linha-1][coluna] === null) {
            posições_peca[linha-1][coluna] = "◯"
        }
        else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha- 1][coluna])) {
            xadrez.children[(linha- 1) * 8 + coluna].classList.add("capturavel") 
        }
        else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha- 1][coluna])) {
            xadrez.children[(linha- 1) * 8 + coluna].classList.add("capturavel") 
        }

        if (coluna+1 <= 7 && posições_peca[linha-1][coluna+1] === null) {
            posições_peca[linha-1][coluna+1] = "◯"
        }
        else if (coluna+1 <= 7 && pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha- 1][coluna+ 1])) {
            xadrez.children[(linha - 1) * 8 + coluna+ 1].classList.add("capturavel") 
        }
        else if (coluna+1 <= 7 && pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha- 1][coluna+ 1])) {
            xadrez.children[(linha - 1) * 8 + coluna+ 1].classList.add("capturavel") 
        }


        if (coluna -1 >= 0 && posições_peca[linha-1][coluna-1] === null) {
            posições_peca[linha-1][coluna-1] = "◯"
        }
        else if (coluna -1 >= 0 && pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha- 1][coluna- 1])) {
            xadrez.children[(linha- 1) * 8 + coluna- 1].classList.add("capturavel") 
        }
        else if (coluna -1 >= 0 && pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha- 1][coluna- 1])) {
            xadrez.children[(linha- 1) * 8 + coluna- 1].classList.add("capturavel") 
        }
    }
    const cor = corDaVez()
    const linhaRoque = cor === "branco" ? 0 : 7
    const reiPeca = cor === "branco" ? "♔" : "♚"
    const torrePeca = cor === "branco" ? "♖" : "♜"

    if (posições_peca[linhaRoque][4] === reiPeca && !jaMexeu(linhaRoque, 4) && !xeque(cor)) {
        // Roque pequeno 
        if (
            posições_peca[linhaRoque][7] === torrePeca &&
            !jaMexeu(linhaRoque, 7) &&
            casaVazia(linhaRoque, 5) &&
            casaVazia(linhaRoque, 6) &&
            !reiFicariaEmXeque(cor, linhaRoque, 4, 5)
        ) {
            posições_peca[linhaRoque][6] = "O"
        }
        // Roque grande 
        if (
            posições_peca[linhaRoque][0] === torrePeca &&
            !jaMexeu(linhaRoque, 0) &&
            casaVazia(linhaRoque, 1) &&
            casaVazia(linhaRoque, 2) &&
            casaVazia(linhaRoque, 3) &&
            !reiFicariaEmXeque(cor, linhaRoque, 4, 3)
        ) {
            posições_peca[linhaRoque][2] = "O"
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
        if (linha < 8) {
            for (let colunax = coluna - 1; colunax >= 0; colunax--) {
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
            if (coluna + 2 <= 7 ) {
                if (posições_peca[linha - 1][coluna + 2] === null) {
                    posições_peca[linha-1][coluna+2] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha- 1][coluna + 2])) {
                    xadrez.children[(linha- 1) * 8 + coluna + 2].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha- 1][coluna + 2])) {
                    xadrez.children[(linha- 1) * 8 + coluna + 2].classList.add("capturavel") 
                }
            }

            if (coluna-2 >= 0) {
                if (posições_peca[linha - 1][coluna - 2] === null) {
                    posições_peca[linha-1][coluna-2] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha- 1][coluna - 2])) {
                    xadrez.children[(linha- 1) * 8 + coluna - 2].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha- 1][coluna - 2])) {
                    xadrez.children[(linha- 1) * 8 + coluna - 2].classList.add("capturavel") 
                }
            }
        }
        if (linha-2 >= 0) {
            if (coluna+1 <= 7) {
                if (posições_peca[linha - 2][coluna + 1] === null){
                    posições_peca[linha-2][coluna+1] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha - 2][coluna+ 1])) {
                    xadrez.children[(linha - 2) * 8 + coluna+ 1].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha - 2][coluna+ 1])) {
                    xadrez.children[(linha - 2) * 8 + coluna+ 1].classList.add("capturavel") 
                }
            }
            if (coluna-1 >= 0) {
                if (posições_peca[linha - 2][coluna - 1] === null) {    
                    posições_peca[linha-2][coluna-1] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha - 2][coluna- 1])) {
                    xadrez.children[(linha - 2) * 8 + coluna- 1].classList.add("capturavel") 
                }   
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha - 2][coluna- 1])) {
                    xadrez.children[(linha - 2) * 8 + coluna- 1].classList.add("capturavel") 
                }
            }
        }
        if (linha + 1 <= 7) {
            if (coluna + 2 <= 7) {
                if (posições_peca[linha + 1][coluna + 2] === null) {
                    posições_peca[linha + 1][coluna + 2] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha+ 1][coluna + 2])) {
                xadrez.children[(linha + 1) * 8 + coluna + 2].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha+ 1][coluna + 2])) {
                xadrez.children[(linha + 1) * 8 + coluna + 2].classList.add("capturavel") 
                }
            }
            if (coluna - 2 >= 0) {
                if (posições_peca[linha + 1][coluna - 2] === null) {    
                posições_peca[linha + 1][coluna - 2] = "◯"
                
            }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha+ 1][coluna- 2])) {
                    xadrez.children[(linha+ 1) * 8 + coluna- 2].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha+ 1][coluna- 2])) {
                    xadrez.children[(linha+ 1) * 8 + coluna- 2].classList.add("capturavel") 
                }
            }
        }
        if (linha + 2 <= 7) {
            if (coluna+1 <= 7) {
                if (posições_peca[linha + 2][coluna + 1] === null) {
                    posições_peca[linha+2][coluna+1] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha + 2][coluna+ 1])) {
                    xadrez.children[(linha + 2) * 8 + coluna+ 1].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha + 2][coluna+ 1])) {
                    xadrez.children[(linha + 2) * 8 + coluna+ 1].classList.add("capturavel") 
                }
        }
            if (coluna-1 >= 0) {
                if (posições_peca[linha + 2][coluna - 1] === null) {
                    posições_peca[linha+2][coluna-1] = "◯"
                }
                else if (pecas_brancas.includes(posições_peca[linha][coluna]) && pecas_negras.includes(posições_peca[linha + 2][coluna- 1])) {
                    xadrez.children[(linha + 2) * 8 + coluna- 1].classList.add("capturavel") 
                }
                else if (pecas_negras.includes(posições_peca[linha][coluna]) && pecas_brancas.includes(posições_peca[linha + 2][coluna- 1])) {
                    xadrez.children[(linha + 2) * 8 + coluna- 1].classList.add("capturavel") 
                }
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
function encontrarRei(cor) {
    let simbolo = cor
    if (simbolo === "branco") {
        simbolo = "♔"
    }
    else {
        simbolo = "♚"
    }

    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            if (posições_peca[linha][coluna] === simbolo) {
                return [linha, coluna]
            }
        }
    }

    return null
}
    function xeque(cor) {
    let peao_, coluna_rei, torre_, bispo_, cavalo_, rei, rainha_, linha_peao, linha_rei
    const posicao = encontrarRei(cor)
    if (!posicao) {
        return false
    }
    if (cor === "preto") {
        [linha_rei, coluna_rei] = posicao
        // opostos
        peao_ = "♙"
        torre_ = "♖" 
        bispo_ = "♗"
        rainha_ = "♕" 
        rei = "♔" 
        cavalo_ = "♘"
        linha_peao = linha_rei - 1
    }
    else {
        [linha_rei, coluna_rei] = posicao
        peao_ = "♟" 
        torre_ = "♜" 
        cavalo_ = "♞" 
        bispo_ = "♝" 
        rainha_ = "♛" 
        rei = "♚"
        linha_peao = linha_rei + 1
    }
    //vacalo
    if (linha_rei-1 >= 0 && coluna_rei + 2 <= 7 && posições_peca[linha_rei - 1][coluna_rei + 2] === cavalo_) {
        return true
    }
    if (linha_rei-1 >= 0 && coluna_rei - 2 >= 0 && posições_peca[linha_rei - 1][coluna_rei - 2] === cavalo_) {
        return true
    }
    if (linha_rei-2 >= 0 && coluna_rei + 1 <= 7 && posições_peca[linha_rei - 2][coluna_rei + 1] === cavalo_) {
        return true
    }
    if (linha_rei-2 >= 0 && coluna_rei - 1 >= 0 && posições_peca[linha_rei - 2][coluna_rei - 1] === cavalo_) {
        return true
    }
    if (linha_rei + 1 <= 7 && coluna_rei + 2 <= 7 && posições_peca[linha_rei + 1][coluna_rei + 2] === cavalo_) {
        return true
    }
    if (linha_rei+1 <= 7 && coluna_rei - 2 >= 0 && posições_peca[linha_rei + 1][coluna_rei - 2] === cavalo_) {
        return true
    }
    if (linha_rei+2 <= 7 && coluna_rei + 1 <= 7 && posições_peca[linha_rei + 2][coluna_rei + 1] === cavalo_) {
        return true
    }
    if (linha_rei + 2 <= 7 && coluna_rei - 1 >= 0 && posições_peca[linha_rei + 2][coluna_rei - 1] === cavalo_) {
        return true
    }
        //vacalo
//torre_ / rainha_
    for (let colunax = coluna_rei + 1; colunax < 8; colunax++) {
        if (posições_peca[linha_rei][colunax] === "O" || posições_peca[linha_rei][colunax] === "◯" || posições_peca[linha_rei][colunax] === null) {
            continue
        }
        else if (posições_peca[linha_rei][colunax] === torre_ || posições_peca[linha_rei][colunax] === rainha_) {
            return true
        }
        else {
            break
        }
    }
    for (let colunax = coluna_rei - 1; colunax >= 0; colunax--) {
        if (posições_peca[linha_rei][colunax] === "O" || posições_peca[linha_rei][colunax] === "◯" || posições_peca[linha_rei][colunax] === null) {
            continue
        }
        else if (posições_peca[linha_rei][colunax] === torre_ || posições_peca[linha_rei][colunax] === rainha_) {
            return true
        }
        else {
            break
        }
}
        for (let linhax = linha_rei - 1; linhax >= 0; linhax--) {
        if (posições_peca[linhax][coluna_rei] === "O" || posições_peca[linhax][coluna_rei] === "◯" || posições_peca[linhax][coluna_rei] === null) {
            continue
        }
        else if (posições_peca[linhax][coluna_rei] === torre_ || posições_peca[linhax][coluna_rei] === rainha_) {
            return true
        }
        else {
            break
        }
    }
        for (let linhax = linha_rei + 1; linhax < 8; linhax++) {
        if (posições_peca[linhax][coluna_rei] === "O" || posições_peca[linhax][coluna_rei] === "◯" || posições_peca[linhax][coluna_rei] === null) {
            continue
        }
        else if (posições_peca[linhax][coluna_rei] === torre_ || posições_peca[linhax][coluna_rei] === rainha_) {
            return true
        }
        else {
            break
        }
        }
    //bispo_ / rainha_
    for (let diagonal = 1; diagonal < 8; diagonal++) {
        if (linha_rei + diagonal < 8 && coluna_rei + diagonal < 8) {
            if (posições_peca[linha_rei + diagonal][coluna_rei + diagonal] === null || posições_peca[linha_rei + diagonal][coluna_rei + diagonal] === "◯" || posições_peca[linha_rei + diagonal][coluna_rei + diagonal] === "O") {
                continue
            }
            else if (posições_peca[linha_rei + diagonal][coluna_rei + diagonal] === bispo_ || posições_peca[linha_rei + diagonal][coluna_rei + diagonal] === rainha_) {
                return true
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
            if (linha_rei + diagonal < 8 && coluna_rei - diagonal >= 0) {
                if (posições_peca[linha_rei + diagonal][coluna_rei - diagonal] === null || posições_peca[linha_rei + diagonal][coluna_rei - diagonal] === "◯" || posições_peca[linha_rei + diagonal][coluna_rei - diagonal] === "O") {
                    continue
            }
                if (posições_peca[linha_rei + diagonal][coluna_rei - diagonal] === bispo_ || posições_peca[linha_rei + diagonal][coluna_rei - diagonal] === rainha_) {
                    return true
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
        if (linha_rei - diagonal >= 0 && coluna_rei - diagonal >= 0) {
            if (posições_peca[linha_rei - diagonal][coluna_rei - diagonal] === null || posições_peca[linha_rei - diagonal][coluna_rei - diagonal] === "◯" || posições_peca[linha_rei - diagonal][coluna_rei - diagonal] === "O") {
                continue
            }
            else if (posições_peca[linha_rei - diagonal][coluna_rei - diagonal] === bispo_ || posições_peca[linha_rei - diagonal][coluna_rei - diagonal] === rainha_) {
                return true
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
        if (linha_rei - diagonal >= 0 && coluna_rei + diagonal < 8) {
            if (posições_peca[linha_rei - diagonal][coluna_rei + diagonal] === null || posições_peca[linha_rei - diagonal][coluna_rei + diagonal] === "◯" || posições_peca[linha_rei - diagonal][coluna_rei + diagonal] === "O") {
                continue
            }
            else if (posições_peca[linha_rei - diagonal][coluna_rei + diagonal] === bispo_ || posições_peca[linha_rei - diagonal][coluna_rei + diagonal] === rainha_) {
                return true
            }
            else {
                break
            }
        }
        else {
            break
        }
    }
    ///peao_
    if (linha_peao >= 0 && linha_peao <= 7) {
        if (coluna_rei - 1 >= 0 && posições_peca[linha_peao][coluna_rei-1] === peao_) {
            return true
        }
        if (coluna_rei + 1 <= 7 && posições_peca[linha_peao][coluna_rei+1] === peao_) {
            return true
        }
    }

    let rei_inimigo

    if (cor === "branco") {
        rei_inimigo = "♚"
    } else {
        rei_inimigo = "♔"
    }

    for (let dlinha = -1; dlinha <= 1; dlinha++) {
        for (let dcoluna = -1; dcoluna <= 1; dcoluna++) {
            if (dlinha === 0 && dcoluna === 0) continue

            const linha = linha_rei + dlinha
            const coluna = coluna_rei + dcoluna

            if (linha >= 0 && linha < 8 && coluna >= 0 && coluna < 8) {
                if (posições_peca[linha][coluna] === rei_inimigo) {
                    return true
                }
            }
        }
    }
    return false
    }
//  diz que começa nessa casa já se mexeu (ou se a casa já foi usada em algum lance).
function jaMexeu(linha, coluna) {
    return casas_mexidas.has(linha * 8 + coluna)
}

// casa vazia = null OU marcada com "◯". Precisa aceitar "◯" porque a própria rei()
// já marcou com "◯" as casas ao lado do rei ANTES de chegar na parte do roque (era isso que impedia o roque).
function casaVazia(linha, coluna) {
    return posições_peca[linha][coluna] === null || posições_peca[linha][coluna] === "◯"
}

// simula o rei andando de coluna_origem até coluna_destino (mesma linha) e diz se ele
// ficaria em xeque lá. Serve para a regra "o rei não pode passar por casa atacada". Desfaz tudo no final.
function reiFicariaEmXeque(cor, linha, coluna_origem, coluna_destino) {
    const rei_peca = posições_peca[linha][coluna_origem]
    const antigo = posições_peca[linha][coluna_destino]
    posições_peca[linha][coluna_origem] = null
    posições_peca[linha][coluna_destino] = rei_peca
    const em_xeque = xeque(cor)
    posições_peca[linha][coluna_destino] = antigo
    posições_peca[linha][coluna_origem] = rei_peca
    return em_xeque
}
function filtrarMovimentos() {
    const [linhaOrigem, colunaOrigem] = posicao_antiga

    const peca = posições_peca[linhaOrigem][colunaOrigem]
    let cor
    if (pecas_brancas.includes(peca)) {
            cor = "branco"
        }
        else {
            cor = "preto"
        }
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {

            const casa = xadrez.children[linha * 8 + coluna]

            const movimento = posições_peca[linha][coluna] === "◯" || posições_peca[linha][coluna] === "O"
            const captura = casa.classList.contains("capturavel")

            if (!movimento && !captura) continue

            const destinoAntigo = posições_peca[linha][coluna]

            // EN PASSANT dentro da simulação: um peão que anda na diagonal para uma casa VAZIA marcada com "◯"
            // só pode estar fazendo en passant. Nesse lance o peão capturado também some do tabuleiro (ele fica ao lado
            // do peão que captura, na linha de origem), e isso pode mudar se o rei fica em xeque (ex.: o peão capturado
            // era a única peça entre o seu rei e uma torre inimiga na mesma linha). Por isso eu removo esse peão na simulação.
            let eh_en_passant =
            movimento &&
            (peca === "♙" || peca === "♟") &&
            coluna !== colunaOrigem &&
            destinoAntigo === "◯" &&
            en_passant_alvo !== null &&
            linha === en_passant_alvo[0] &&
            coluna === en_passant_alvo[1]

    let peao_en_passant = null

if (eh_en_passant) {
    peao_en_passant = posições_peca[linhaOrigem][coluna]
    posições_peca[linhaOrigem][coluna] = null
}
            posições_peca[linhaOrigem][colunaOrigem] = null
            posições_peca[linha][coluna] = peca

            const ilegal = xeque(cor)

            posições_peca[linhaOrigem][colunaOrigem] = peca
            posições_peca[linha][coluna] = destinoAntigo
            if (eh_en_passant) {
                posições_peca[linhaOrigem][coluna] = peao_en_passant
            }
            if (ilegal) {
                if (movimento) {
                    posições_peca[linha][coluna] = null
                }

                casa.classList.remove("capturavel")
            }
        }
    }
}
function corDaVez() {
    if (jogada % 2 === 1) {
        return "preto"
    }
    return "branco"
}
function enPassant(linha, coluna) {
    if (en_passant_alvo === null) {
        return
    }
    const peca = posições_peca[linha][coluna]
    const linha_alvo = en_passant_alvo[0]
    const coluna_alvo = en_passant_alvo[1]
    if (Math.abs(coluna_alvo - coluna) !== 1 || posições_peca[linha_alvo][coluna_alvo] !== null) {
        return
    }
    if (peca === "♙" && linha_alvo === linha + 1 && posições_peca[linha][coluna_alvo] === "♟") {
        posições_peca[linha_alvo][coluna_alvo] = "◯"
    }

    else if (peca === "♟" && linha_alvo === linha - 1 && posições_peca[linha][coluna_alvo] === "♙") {
        posições_peca[linha_alvo][coluna_alvo] = "◯"
    }
}

// Retorna true se existe QUALQUER casa marcada no tabuleiro (bolinha "◯" ou captura "capturavel").
// Serve para saber se a peça clicada tem pelo menos um lance legal (depois do seu filtrarMovimentos).
function temMarcacao() {
    for (let i = 0; i < 64; i++) {
        const linha = Math.floor(i / 8)
        const coluna = i % 8
        if (posições_peca[linha][coluna] === "◯" || posições_peca[linha][coluna] === "O" || xadrez.children[i].classList.contains("capturavel")) {
           return true
        }
    }
    return false
}
function limparMarcacoes() {
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            if (!pecas_brancas.includes(posições_peca[linha][coluna]) && !pecas_negras.includes(posições_peca[linha][coluna])) {
                posições_peca[linha][coluna] = null
            }
        }
    }
    for (let i = 0; i < 64; i++) {
        xadrez.children[i].classList.remove("capturavel")
    }
    peca_clicada = null
    posicao_antiga = []
    tabuleiro()
}

// "clica" (chama bolinha) em cada peça de quem joga. A bolinha gera os lances e o seu
// filtrarMovimentos() já tira os ilegais; se sobrar qualquer casa marcada, existe lance legal.
// Ao terminar, limpo as marcações para o tabuleiro ficar como estava.
function temLanceLegal() {
    let minhas_pecas = null
    if (corDaVez() === "branco") {
        minhas_pecas = pecas_brancas
    }
    else {
        minhas_pecas = pecas_negras
    }
    let achou = false
    for (let linha = 0; linha < 8 && !achou; linha++) {
        for (let coluna = 0; coluna < 8 && !achou; coluna++) {
            if (minhas_pecas.includes(posições_peca[linha][coluna])) {
                bolinha(linha, coluna)
                achou = temMarcacao()
            }
        }
    }
    limparMarcacoes()
    return achou
}
function verificarFimDeJogo() {
    const cor = corDaVez()
    if (!temLanceLegal()) {
        fim_de_jogo = true
        alert("xeque-mate")
        return
    }
}