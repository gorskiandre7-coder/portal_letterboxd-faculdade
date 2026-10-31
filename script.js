// 1. FUNÇÃO DE VALIDAÇÃO DO FORMULÁRIO (6 Campos)
function validarFormulario() {
    let nome = document.getElementById('nome_usuario').value;
    let titulo = document.getElementById('titulo_filme').value;
    let ano = document.getElementById('ano_filme').value;
    let genero = document.getElementById('genero_filme').value;
    let critica = document.getElementById('texto_critica').value;
    let localAssistido = document.querySelector('input[name="onde_assistiu"]:checked');

    if (nome.trim() === '') {
        alert('Por favor, preencha o seu Nome.');
        return false;
    } else if (titulo.trim() === '') {
        alert('Por favor, preencha o Título do Filme.');
        return false;
    } else if (ano.trim() === '' || ano < 1888 || ano > 2026) {
        alert('Por favor, insira um Ano de Lançamento válido.');
        return false;
    } else if (genero === '') { 
        alert('Por favor, selecione o Gênero Principal.');
        return false;
    } else if (!localAssistido) {
        alert('Por favor, indique onde assistiu ao filme (Cinema ou Streaming).');
        return false;
    } else if (critica.trim() === '') {
        alert('Por favor, escreva a sua Crítica / Análise.');
        return false;
    } else {
        alert('Crítica de "' + titulo + '" publicada com sucesso! Obrigado pela contribuição, ' + nome + '.');
        document.getElementById('andre_form_critica').reset();
        return false; 
    }
}

// 2. FUNÇÃO DE TROCA DE TEMAS (Letterboxd)
function mudarTema(nomeDoTema) {
    // Remove qualquer cor de assinatura que esteja ativa no <body>
    document.body.classList.remove('tema-pro', 'tema-patron', 'tema-oled');
    
    // Se o botão clicado não for o Classic (que envia um texto vazio ''), aplica a nova classe
    if (nomeDoTema !== '') {
        document.body.classList.add(nomeDoTema);
    }
}


// 3. FUNÇÕES DA JANELA MODAL
function abrirModal(titulo, descricao) {
    // Altera dinamicamente os textos da caixa usando o DOM
    document.getElementById('modal_titulo').innerText = titulo;
    document.getElementById('modal_descricao').innerText = descricao;
    
    // Altera a classe CSS para tornar o pop-up visível
    document.getElementById('janela_modal').className = 'modal_ativo';
}

function fecharModal() {
    // Altera a classe CSS para ocultar novamente o pop-up
    document.getElementById('janela_modal').className = 'modal_oculto';
}






// 4. CARROSSEL 

// Variável de estado global que armazena a posição atual do índice de deslocamento
let indiceCarrossel = 0;

function moverCarrossel(direcao) {
    // Captura os elementos manipuláveis do DOM
    let track = document.getElementById('track_imagens');
    let container = document.querySelector('.carrossel_container');
    let totalImagens = track.querySelectorAll('img').length;
    
    // 1. Cálculo da Visibilidade da Tela:
    // Divide a largura atual do ecrã do utilizador por 380px (350 da imagem + 30 do gap).
    // O Math.floor força um arredondamento para baixo, garantindo o número de cartazes inteiros visíveis.
    let cartazesVisiveis = Math.floor(container.clientWidth / 380);
    
    // 2. Trava Lógica de Limite:
    // Evita o avanço para além do conteúdo, definindo o último índice possível sem criar espaços em branco.
    let limiteMaximo = totalImagens - cartazesVisiveis;

    // Condição de segurança caso o viewport do utilizador comporte todos os itens simultaneamente.
    if (limiteMaximo < 0) {
        limiteMaximo = 0;
    }

    // Incrementa ou decrementa a posição atual consoante o argumento da função (-1 ou 1)
    indiceCarrossel += direcao;

    // 3. Estruturas Condicionais de Loop:
    // Retorna a posição a zero ao ultrapassar o limite calculado
    if (indiceCarrossel > limiteMaximo) {
        indiceCarrossel = 0; 
    } 
    // Avança para a posição máxima caso haja recuo no índice inicial
    else if (indiceCarrossel < 0) {
        indiceCarrossel = limiteMaximo; 
    }

    // 4. Execução da Mutação no DOM:
    // Estipula o multiplicador espacial exato entre itens (largura + espaçamento)
    let tamanhoSalto = 380; 
    // Calcula o deslocamento horizontal em pixels exatos
    let deslocamento = -indiceCarrossel * tamanhoSalto;
    
    // Aplica o comportamento via inline CSS transform nativo para ativação de GPU e transição otimizada
    track.style.transform = 'translateX(' + deslocamento + 'px)';
}