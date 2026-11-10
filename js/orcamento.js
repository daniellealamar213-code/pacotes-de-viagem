
// =====================================================
// orcamento.js — JavaScript da página de orçamento
// =====================================================

console.log('O arquivo orcamento.js foi carregado!');

// ===== Etapa 11: VARIÁVEIS E TIPOS DE DADOS =====

const nomeAgencia = 'Jornada Viagens';
const descontoPix = 5;
let promocaoAtiva = true;

const destinosDestaque = ['Japão', 'Paraíba', 'San Andreas'];

const pacoteDoMes = {
    destino: 'Paraíba',
    preco: 1199,
    dias: 4
};

console.log(nomeAgencia, '→', typeof nomeAgencia);
console.log(descontoPix, '→', typeof descontoPix);
console.log(promocaoAtiva, '→', typeof promocaoAtiva);
console.log('Primeiro destino da lista:', destinosDestaque[0]);
console.log('Destino do pacote do mês:', pacoteDoMes.destino);

// ===== Etapa 12: MANIPULAÇÃO DO DOM =====

// 1) Escrever na página

const textoDestaque = document.getElementById('texto-destaque');

if (textoDestaque) {
    textoDestaque.textContent =
        'Pacote do mês: ' + pacoteDoMes.destino +
        ' por R$ ' + pacoteDoMes.preco +
        ' (' + pacoteDoMes.dias + ' dias). ' +
        'Destaques: ' + destinosDestaque.join(', ') + '.';

    if (promocaoAtiva) {
        textoDestaque.style.fontWeight = 'bold';
    }
}

// 2) Pegar os campos do formulário

const campoHospedagem = document.getElementById('hospedagem');
const campoPessoas = document.getElementById('pessoas');
const campoDiarias = document.getElementById('diarias');

const saidaPessoas = document.getElementById('saida-pessoas');
const saidaTotal = document.getElementById('total');
const saidaPix = document.getElementById('total-pix');

// 3) Função para formatar valores em reais

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para calcular desconto

function calcularDesconto(valor, percentual) {
    const desconto = valor * percentual / 100;
    return valor - desconto;
}

// 4) Função que calcula o total e mostra na tela

function calcularTotal() {

    if (!campoHospedagem || !campoPessoas || !campoDiarias) {
        return;
    }

    const diaria = Number(campoHospedagem.value);
    const pessoas = Number(campoPessoas.value);
    const diarias = Number(campoDiarias.value);

    const total = diaria * pessoas * diarias;

    // Calcula o desconto PIX

    const totalComPix = calcularDesconto(total, descontoPix);

    // Mostra os valores na página

    if (saidaPessoas) {
        saidaPessoas.textContent = pessoas;
    }

    if (saidaTotal) {
        saidaTotal.textContent = formatarMoeda(total);
    }

    if (saidaPix) {
        saidaPix.textContent = formatarMoeda(totalComPix);
    }

    // Muda a aparência se o total for acima de R$ 3.000

    if (saidaTotal) {
        if (total > 3000) {
            saidaTotal.style.backgroundColor = '#ffe5b4';
            saidaTotal.style.padding = '0 8px';
        } else {
            saidaTotal.style.backgroundColor = '';
            saidaTotal.style.padding = '';
        }
    }
}

// 5) Recalcular quando o usuário mexer nos campos

if (campoHospedagem) {
    campoHospedagem.addEventListener('change', calcularTotal);
}

if (campoPessoas) {
    campoPessoas.addEventListener('input', calcularTotal);
}

if (campoDiarias) {
    campoDiarias.addEventListener('input', calcularTotal);
}

calcularTotal();

// ===== Etapa 13: BARRA DE PROGRESSO E VALIDAÇÃO =====

const formulario = document.getElementById('form-orcamento');
const barra = document.getElementById('barra-preenchimento');
const areaAlertas = document.getElementById('area-alertas');

const camposObrigatorios = [
    document.getElementById('nome'),
    document.getElementById('email'),
    document.getElementById('destino'),
    campoHospedagem
].filter(Boolean);

// Atualizar barra de progresso

function atualizarProgresso() {

    let preenchidos = 0;

    camposObrigatorios.forEach(function (campo) {
        if (campo.value.trim() !== '') {
            preenchidos++;
        }
    });

    const porcentagem = camposObrigatorios.length
        ? Math.round((preenchidos / camposObrigatorios.length) * 100)
        : 0;

    if (barra) {
        barra.style.width = porcentagem + '%';
        barra.textContent = porcentagem + '%';

        barra.parentElement.setAttribute('aria-valuenow', porcentagem);

        if (porcentagem === 100) {
            barra.classList.add('bg-success');
        } else {
            barra.classList.remove('bg-success');
        }
    }
}

// Atualizar progresso ao preencher os campos

camposObrigatorios.forEach(function (campo) {
    campo.addEventListener('input', atualizarProgresso);
    campo.addEventListener('change', atualizarProgresso);
});

// Envio do formulário

if (formulario) {

    formulario.addEventListener('submit', function (evento) {

        evento.preventDefault();

        let tudoCerto = true;

        camposObrigatorios.forEach(function (campo) {

            if (campo.checkValidity()) {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            } else {
                campo.classList.remove('is-valid');
                campo.classList.add('is-invalid');
                tudoCerto = false;
            }
        });

        if (areaAlertas) {

            if (tudoCerto) {
                areaAlertas.innerHTML =
                    '<div class="alert alert-success" role="alert">' +
                    '<strong>Pronto!</strong> Seu orçamento foi enviado. Total: ' +
                    saidaTotal.textContent + '</div>';
            } else {
                areaAlertas.innerHTML =
                    '<div class="alert alert-danger" role="alert">' +
                    '<strong>Atenção!</strong> Corrija os campos em vermelho.</div>';
            }
        }
    });

    // Botão Limpar

    formulario.addEventListener('reset', function () {

        setTimeout(function () {

            camposObrigatorios.forEach(function (campo) {
                campo.classList.remove('is-valid', 'is-invalid');
            });

            if (areaAlertas) {
                areaAlertas.innerHTML = '';
            }

            atualizarProgresso();
            calcularTotal();

        }, 0);
    });
}

// ===== Etapa 15: jQuery =====

// Botão de dicas

if (typeof jQuery !== 'undefined') {

    $('#btn-dicas').on('click', function () {
        $('#caixa-dicas').slideToggle(300);
    });

}

// Função para mostrar resumo

function mostrarResumo() {

    const nome = document.getElementById('nome').value;
    const destino = document.getElementById('destino').value;

    document.getElementById('resumo').innerHTML = `
        <div class="card card-body">
            <h3 class="h5">Resumo do orçamento</h3>
            <p class="mb-1"><strong>Viajante:</strong> ${nome}</p>
            <p class="mb-1"><strong>Destino:</strong> ${destino}</p>
            <p class="mb-1">
                <strong>Pessoas:</strong> ${campoPessoas.value} |
                <strong>Diárias:</strong> ${campoDiarias.value}
            </p>
            <p class="mb-0">
                <strong>Total:</strong> ${saidaTotal.textContent}
                (no Pix: ${saidaPix.textContent})
            </p>
        </div>
    `;
}

// Validação do nome

const campoNome = document.getElementById('nome');
const avisoNome = document.getElementById('aviso-nome');

if (campoNome) {

    campoNome.addEventListener('keydown', function (evento) {

        if (evento.key >= '0' && evento.key <= '9') {
            evento.preventDefault();

            if (avisoNome) {
                avisoNome.textContent = 'O nome não pode ter números.';
            }

        } else {
            if (avisoNome) {
                avisoNome.textContent = '';
            }
        }
    });
}

// Validação do e-mail

const campoEmail = document.getElementById('email');
const avisoEmail = document.getElementById('aviso-email');

if (campoEmail) {

    campoEmail.addEventListener('blur', function () {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(campoEmail.value)) {

            if (avisoEmail) {
                avisoEmail.textContent = 'Digite um e-mail válido.';
            }

        } else {

            if (avisoEmail) {
                avisoEmail.textContent = '';
            }
        }
    });
}

// Validação do destino

const campoDestino = document.getElementById('destino');
const avisoDestino = document.getElementById('aviso-destino');

if (campoDestino) {

    campoDestino.addEventListener('change', function () {

        if (campoDestino.value === 'select' || campoDestino.value === '') {

            if (avisoDestino) {
                avisoDestino.textContent = 'Escolha um destino.';
            }

        } else {

            if (avisoDestino) {
                avisoDestino.textContent = '';
            }
        }
    });
}

// ===== FILTRO DE PACOTES =====

const cardsPacotes = document.querySelectorAll('article.card');
const botoesFiltro = document.querySelectorAll('.filtro button');
const contador = document.getElementById('contador');

// Função para mostrar produtos

function mostrarProdutos(resultado) {

    cardsPacotes.forEach(function (card) {

        const nome = card.querySelector('h3')?.textContent || '';

        const encontrado = resultado.some(function (produto) {
            return produto.nome === nome;
        });

        card.style.display = encontrado ? '' : 'none';
    });
}

// Função para filtrar produtos

function filtrar(tipo) {

    const resultado = [];

    cardsPacotes.forEach(function (card) {

        const titulo = card.querySelector('h3');
        const precoElemento = card.querySelector('.preco');

        if (!titulo || !precoElemento) {
            return;
        }

        const produto = {
            nome: titulo.textContent,
            preco: Number(
                precoElemento.textContent
                    .replace('R$', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
                    .trim()
            ),
            categoria: card.dataset.categoria
        };

        if (tipo === 'todos') {
            resultado.push(produto);

        } else if (tipo === 'ate100' && produto.preco <= 100) {
            resultado.push(produto);

        } else if (tipo === 'acima100' && produto.preco > 100) {
            resultado.push(produto);
        }
    });

    mostrarProdutos(resultado);

    if (contador) {
        contador.textContent =
            resultado.length + ' produto(s) encontrado(s)';
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

atualizarProgresso();
