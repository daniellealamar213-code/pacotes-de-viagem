
// =============================================
// CINEBOT - CÉREBRO DO ASSISTENTE
// JavaScript
// =============================================

const formFilme = document.getElementById("formFilme");

const campoNome = document.getElementById("nomeFilme");
const campoAno = document.getElementById("anoFilme");
const campoNota = document.getElementById("notaFilme");
const campoGenero = document.getElementById("generoFilme");

const resultado = document.getElementById("resultado");

const anoAtual = new Date().getFullYear();

campoAno.max = anoAtual;

// =============================================
// BANCO DE DADOS LOCAL
// =============================================

let filmes = [];

try {
    filmes = JSON.parse(localStorage.getItem("cinebotFilmes")) || [];
} catch (erro) {
    filmes = [];
}
console.log("Filmes salvos:", filmes);
console.log("Ano atual:", anoAtual);
console.log("Ano máximo:", anoAtual);
console.log("Ano mínimo:", 1888);
console.log("Filmes salvos:", filmes);
console.log("Ano atual:", anoAtual);
console.log("Ano mínimo:", 1888);

// =============================================
// COMENTÁRIOS DO CINEBOT POR GÊNERO
// =============================================

const comentariosGenero = {

    "Ação": [
        "Filmes de ação costumam apresentar muita adrenalina, desafios e momentos intensos.",
        "Esse gênero é conhecido por cenas movimentadas e situações cheias de emoção."
    ],

    "Aventura": [
        "Aventura é um gênero que combina exploração, descobertas e desafios.",
        "Esse tipo de filme costuma levar o espectador a experiências imaginativas."
    ],

    "Comédia": [
        "Comédias buscam divertir o público e proporcionar momentos descontraídos.",
        "Esse gênero é uma ótima escolha para quem gosta de boas risadas."
    ],

    "Drama": [
        "Dramas geralmente exploram emoções, conflitos e experiências humanas.",
        "Esse gênero costuma valorizar histórias profundas e reflexivas."
    ],

    "Ficção científica": [
        "A ficção científica trabalha com tecnologia, possibilidades futuras e imaginação.",
        "Esse gênero permite explorar ideias sobre o universo e o desenvolvimento da humanidade."
    ],

    "Terror": [
        "O terror trabalha com suspense, medo e situações inesperadas.",
        "Esse gênero busca provocar tensão e fortes emoções no espectador."
    ],

    "Romance": [
        "Romances exploram relacionamentos, sentimentos e conexões entre personagens.",
        "Esse gênero costuma valorizar histórias emocionantes e envolventes."
    ],

    "Animação": [
        "Animações utilizam criatividade e recursos visuais para contar histórias.",
        "Esse gênero permite explorar universos e personagens bastante diversificados."
    ],

    "Suspense": [
        "O suspense procura manter a curiosidade do espectador e criar expectativa.",
        "Esse gênero costuma trabalhar com mistérios e acontecimentos inesperados."
    ],

    "Fantasia": [
        "A fantasia apresenta mundos imaginários, criaturas e acontecimentos extraordinários.",
        "Esse gênero permite explorar histórias que vão além da realidade."
    ],

    "Documentário": [
        "Documentários apresentam assuntos reais e podem ampliar o conhecimento sobre diferentes temas.",
        "Esse gênero é uma oportunidade de conhecer novas perspectivas sobre o mundo."
    ],

    "Outro": [
        "Esse filme pertence a uma categoria diversificada do universo cinematográfico.",
        "Cada filme possui características próprias que podem despertar diferentes interesses."
    ]
};
console.log(comentariosGenero);
console.log("Ano atual:", anoAtual);
console.log("Ano mínimo:", 1888);

// =============================================
// FUNÇÃO PARA ESCOLHER UM COMENTÁRIO
// =============================================

function comentarioAleatorio(lista) {

    const indice = Math.floor(Math.random() * lista.length);

    return lista[indice];
}

// =============================================
// FUNÇÃO DE ANÁLISE DO CINEBOT
// =============================================

function analisarFilme(filme) {

    const idade = anoAtual - filme.ano;

    let avaliacao = "";
    let comentario = "";
    let recomendacao = "";

    // Analisar a nota

    if (filme.nota >= 9) {

        avaliacao = "Excelente";

        comentario = "Uau! Você deu uma nota altíssima! " +
            "Parece que esse filme conquistou você.";

        recomendacao = "Esse filme merece um lugar especial " +
            "na sua coleção de favoritos!";

    } else if (filme.nota >= 8) {

        avaliacao = "Muito bom";

        comentario = "Ótima avaliação! Você demonstrou " +
            "ter gostado bastante desse filme.";

        recomendacao = "Vale a pena recomendar esse filme " +
            "para seus amigos e familiares!";

    } else if (filme.nota >= 5) {

        avaliacao = "Regular";

        comentario = "Sua avaliação foi intermediária. " +
            "O filme teve pontos positivos, mas talvez " +
            "não tenha superado suas expectativas.";

        recomendacao = "Você pode explorar outros filmes " +
            "do mesmo gênero para comparar suas experiências.";

    } else {

        avaliacao = "Baixa avaliação";

        comentario = "Parece que esse filme não agradou " +
            "muito você. Nem todas as produções conseguem " +
            "conquistar o público.";

        recomendacao = "Experimente conhecer outros títulos " +
            "desse gênero. Talvez encontre uma história " +
            "mais interessante para seu gosto!";
    }

    // Analisar o gênero

    const comentarioGenero = comentarioAleatorio(
        comentariosGenero[filme.genero] || comentariosGenero["Outro"]
    );

    // Analisar a idade do filme

    let comentarioIdade = "";

    if (idade >= 30) {

        comentarioIdade = "É um filme clássico, com pelo menos " +
            "30 anos desde seu lançamento.";

    } else if (idade >= 10) {

        comentarioIdade = "Esse filme já tem uma década ou mais " +
            "desde sua estreia.";

    } else if (idade >= 1) {

        comentarioIdade = "É um filme relativamente recente.";

    } else {

        comentarioIdade = "Esse filme foi lançado neste ano.";
    }

    // Resultado final do robô

    return {
        idade,
        avaliacao,
        comentario,
        comentarioGenero,
        comentarioIdade,
        recomendacao
    };
}

// =============================================
// FUNÇÃO PRINCIPAL DO CADASTRO
// =============================================

formFilme.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = campoNome.value.trim();
    const ano = Number(campoAno.value);
    const nota = Number(campoNota.value);
    const genero = campoGenero.value;

    // Validar nome

    if (nome.length < 2) {

        alert("Digite um nome de filme válido!");
        campoNome.focus();
        return;
    }

    // Validar ano

    if (
        campoAno.value === "" ||
        !Number.isInteger(ano) ||
        ano < 1888 ||
        ano > anoAtual
    ) {

        alert("Informe um ano de lançamento válido!");
        campoAno.focus();
        return;
    }

    // Validar nota

    if (
        campoNota.value === "" ||
        !Number.isFinite(nota) ||
        nota < 1 ||
        nota > 10
    ) {

        alert("A nota deve estar entre 1 e 10!");
        campoNota.focus();
        return;
    }

    // Validar gênero

    if (genero === "") {

        alert("Selecione o gênero do filme!");
        campoGenero.focus();
        return;
    }

    // Criar objeto do filme

    const filme = {
        id: Date.now(),
        nome: nome,
        ano: ano,
        nota: nota,
        genero: genero
    };

    // Salvar filme

    filmes.push(filme);

    salvarFilmes();

    // Executar análise

    exibirResultado(filme);

    // Atualizar histórico e estatísticas

    atualizarHistorico();
    atualizarEstatisticas();

    // Limpar formulário

    formFilme.reset();

});

// =============================================
// SALVAR NO NAVEGADOR
// =============================================

function salvarFilmes() {

    try {

        localStorage.setItem(
            "cinebotFilmes",
            JSON.stringify(filmes)
        );

    } catch (erro) {

        console.error("Não foi possível salvar os filmes:", erro);

        alert("Não foi possível salvar os dados no navegador.");

    }
}

// =============================================
// EXIBIR RESULTADO DO FILME
// =============================================

function exibirResultado(filme) {

    const analise = analisarFilme(filme);

    resultado.hidden = false;

    document.getElementById("resultadoNome").textContent =
        filme.nome;

    document.getElementById("resultadoGenero").textContent =
        "Gênero: " + filme.genero;

    document.getElementById("resultadoAno").textContent =
        "Lançamento: " + filme.ano;

    document.getElementById("resultadoNota").textContent =
        filme.nota.toFixed(1) + "/10";

    // Exibir estrelas

    const quantidadeEstrelas = Math.round(filme.nota / 2);

    document.getElementById("estrelas").textContent =
        "★".repeat(quantidadeEstrelas) +
        "☆".repeat(5 - quantidadeEstrelas);

    // Idade do filme

    const textoIdade = analise.idade === 1 ? "ano" : "anos";

    document.getElementById("resultadoIdade").textContent =
        "🎞️ Idade: " + analise.idade + " " + textoIdade;

    // Classificação

    document.getElementById("resultadoClassificacao").textContent =
        "🏆 Avaliação: " + analise.avaliacao;

    // Comentários do robô

    document.getElementById("comentarioBot").textContent =
        analise.comentario + " " +
        analise.comentarioGenero + " " +
        analise.comentarioIdade;

    document.getElementById("recomendacaoBot").textContent =
        analise.recomendacao;

    // Mostrar resultado na tela

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// =============================================
// ATUALIZAR HISTÓRICO
// =============================================

function atualizarHistorico() {

    const lista = document.getElementById("listaFilmes");

    lista.replaceChildren();

    if (filmes.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.className = "empty-message";
        mensagem.textContent = "🍿 Nenhum filme cadastrado ainda.";

        lista.appendChild(mensagem);

        return;
    }

    // Mostrar filmes mais recentes primeiro

    const filmesOrdenados = [...filmes].reverse();

    filmesOrdenados.forEach(function(filme) {

        const card = document.createElement("article");

        card.className = "history-card";

        const titulo = document.createElement("h3");
        titulo.textContent = "🎬 " + filme.nome;

        const ano = document.createElement("p");
        ano.textContent = "📅 Lançamento: " + filme.ano;

        const genero = document.createElement("p");
        genero.textContent = "🎭 Gênero: " + filme.genero;

        const nota = document.createElement("p");
        nota.className = "history-rating";
        nota.textContent = "⭐ " + filme.nota.toFixed(1) + "/10";

        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "btn-primary";
        botao.textContent = "Ver análise";

        botao.addEventListener("click", function() {

            exibirResultado(filme);

        });

        card.append(
            titulo,
            ano,
            genero,
            nota,
            botao
        );

        lista.appendChild(card);

    });

}

// =============================================
// ATUALIZAR ESTATÍSTICAS
// =============================================

function atualizarEstatisticas() {

    const total = filmes.length;

    document.getElementById("totalFilmes").textContent = total;

    if (total === 0) {

        document.getElementById("mediaNotas").textContent = "0.0";

        document.getElementById("melhorNota").textContent = "0";

        return;
    }

    // Somar todas as notas

    const soma = filmes.reduce(function(total, filme) {

        return total + filme.nota;

    }, 0);

    // Calcular média

    const media = soma / total;

    // Encontrar a melhor nota

    const melhor = Math.max(
        ...filmes.map(function(filme) {
            return filme.nota;
        })
    );

    document.getElementById("mediaNotas").textContent =
        media.toFixed(1);

    document.getElementById("melhorNota").textContent =
        melhor.toFixed(1);
}

// =============================================
// LIMPAR HISTÓRICO
// =============================================

document.getElementById("limparHistorico")
    .addEventListener("click", function() {

        if (filmes.length === 0) {

            alert("O histórico já está vazio!");
            return;
        }

        const confirmar = confirm(
            "Tem certeza que deseja apagar todos os filmes?"
        );

        if (confirmar) {

            filmes = [];

            salvarFilmes();

            atualizarHistorico();

            atualizarEstatisticas();

            resultado.hidden = true;

            alert("Histórico apagado com sucesso!");

        }

    });

// =============================================
// INICIALIZAR O CINEBOT
// =============================================

atualizarHistorico();

atualizarEstatisticas();
