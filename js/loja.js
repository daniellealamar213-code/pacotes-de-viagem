
const produtos = [
    { nome: 'Mala de bordo 10 kg', preco: 349.90, icone: 'bi-suitcase2' },
    { nome: 'Travesseiro de pescoço', preco: 59.90, icone: 'bi-cloud' },
    { nome: 'Adaptador universal de tomada', preco: 79.90, icone: 'bi-plug' },
    { nome: 'Garrafa térmica', preco: 89.90, icone: 'bi-cup-straw' },
    { nome: 'Necessaire', preco: 49.90, icone: 'bi-bag' },
    { nome: 'Cadeado com senha', preco: 39.90, icone: 'bi-lock' },
    { nome: 'Carregador portátil', preco: 149.90, icone: 'bi-battery-charging' },
    { nome: 'Guarda-chuva compacto', preco: 34.90, icone: 'bi-umbrella' }
];

// Formatar preços em reais
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// ===== Etapa 7: LOOP FOR =====

const lista = document.getElementById('lista-produtos');

if (lista) {
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];

        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between';

        const nome = document.createElement('span');
        nome.textContent = produto.nome;

        const preco = document.createElement('strong');
        preco.textContent = formatarPreco(produto.preco);

        item.appendChild(nome);
        item.appendChild(preco);

        lista.appendChild(item);
    }
}

// ===== Etapa 8: FOREACH =====

const vitrine = document.getElementById('vitrine');

function mostrarProdutos(listaDeProdutos) {

    if (!vitrine) return;

    vitrine.innerHTML = '';

    listaDeProdutos.forEach(function (produto) {

        const coluna = document.createElement('div');
        coluna.className = 'col';

        const card = document.createElement('article');
        card.className = 'card h-100 text-center shadow-sm';

        const corpo = document.createElement('div');
        corpo.className = 'card-body';

        const icone = document.createElement('i');
        icone.className = `bi ${produto.icone} display-5 text-primary`;

        const titulo = document.createElement('h3');
        titulo.className = 'h6 mt-3';
        titulo.textContent = produto.nome;

        const preco = document.createElement('p');
        preco.className = 'fs-5 fw-bold mb-0';
        preco.textContent = formatarPreco(produto.preco);

        corpo.appendChild(icone);
        corpo.appendChild(titulo);
        corpo.appendChild(preco);

        card.appendChild(corpo);
        coluna.appendChild(card);

        vitrine.appendChild(coluna);
    });
}

// ===== Etapa 9: FILTROS =====

const contador = document.getElementById('contador');
const botoesFiltro = document.querySelectorAll('[data-filtro]');

function filtrar(tipo) {

    const resultado = [];

    for (const produto of produtos) {

        if (tipo === 'todos') {
            resultado.push(produto);

        } else if (tipo === 'ate100' && produto.preco <= 100) {
            resultado.push(produto);

        } else if (tipo === 'acima100' && produto.preco > 100) {
            resultado.push(produto);
        }
    }

    mostrarProdutos(resultado);

    if (contador) {
        contador.textContent = resultado.length + ' produto(s) encontrado(s)';
    }

    botoesFiltro.forEach(function (botao) {

        botao.classList.remove('active');

        if (botao.dataset.filtro === tipo) {
            botao.classList.add('active');
        }
    });
}

// Evento de clique nos botões
botoesFiltro.forEach(function (botao) {

    botao.addEventListener('click', function () {
        filtrar(botao.dataset.filtro);
    });
});

// Mostrar todos os produtos ao abrir a página
filtrar('todos');
const formulario = document.getElementById('form Orcamento');
const campos = formulario.querySelectorAll('input[required]');
const botaoEnviar = document.getElementById('btn-enviar');