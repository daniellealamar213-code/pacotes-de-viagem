
// =====================================================
// componentes.js — liga os componentes do Bootstrap
// =====================================================

// 1) TOOLTIPS
const listaTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
listaTooltips.forEach(function (elemento) {
    new bootstrap.Tooltip(elemento);
});

// 2) POPOVERS
const listaPopovers = document.querySelectorAll('[data-bs-toggle="popover"]');
listaPopovers.forEach(function (elemento) {
    new bootstrap.Popover(elemento);
});

// 3) FAVORITAR
const botoesFavoritar = document.querySelectorAll('.btn-favoritar');
botoesFavoritar.forEach(function (botao) {
    botao.addEventListener('click', function () {
        const icone = botao.querySelector('i');
        if (icone) {
            icone.classList.toggle('bi-heart');
            icone.classList.toggle('bi-heart-fill');
        }
        botao.classList.toggle('active');
    });
});

// 4) COLLAPSE
const linksCollapse = document.querySelectorAll('[data-bs-toggle="collapse"]');

// O Bootstrap controla automaticamente a abertura e o fechamento
// dos elementos Collapse.

// 5) MODAL: agradece a avaliação sem recarregar a página
const formFeedback = document.getElementById('form-feedback');

if (formFeedback) {
    formFeedback.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nome = document.getElementById('fb-nome').value;
        const notaSelecionada = document.querySelector('input[name="nota"]:checked');

        if (!notaSelecionada) {
            alert('Por favor, selecione uma nota.');
            return;
        }

        const nota = notaSelecionada.value;

        // Fecha o modal usando o JavaScript do Bootstrap
        const modal = bootstrap.Modal.getInstance(
            document.getElementById('modalFeedback')
        );

        if (modal) {
            modal.hide();
        }

        document.getElementById('area-feedback').innerHTML =
            '<div class="alert alert-success" role="alert">Obrigado, <strong>' + nome +
            '</strong>! Recebemos sua nota ' + nota + '.</div>';

        formFeedback.reset();
    });
}
const cardsPacotes = document.querySelectorAll('article.card');
cardsPacotes.forEach(function (card) {
    card.addEventListener('mouseover', function () {
        card.classList.add('card-destaque');
    });
    card.addEventListener('mouseout', function () {
        card.classList.remove('card-destaque');
    });
});