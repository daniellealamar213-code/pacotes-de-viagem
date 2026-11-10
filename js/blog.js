
//=====================================================
// blog.js — Destino surpresa
//=====================================================
const destinos = [
    {
        nome: 'Japão',
        foto: 'img/japao.jpg',
        alt: 'Rua comercial no Japão com lanternas vermelhas.',
        texto: 'Templos, tecnologia e uma culinária inesquecível.'
    },
    {
        nome: 'Paraíba',
        foto: 'img/paraiba.jpg',
        alt: 'Praia com coqueiros e mar azul.',
        texto: 'Praias de águas mornas e o pôr do sol mais famoso do Nordeste.'
    },
    {
        nome: 'San Andreas',
        foto: 'img/sanandreas.jpg',
        alt: 'Rio de águas cristalinas cercado por montanhas.',
        texto: 'Natureza, rios cristalinos e muita aventura ao ar livre.'
    }
];

// Pegamos os elementos que vamos alterar
const fotoSurpresa = document.getElementById('foto-surpresa');
const textoSurpresa = document.getElementById('texto-surpresa');
const botaoSurpresa = document.getElementById('btn-surpresa');

// Quando clicar no botão...
botaoSurpresa.addEventListener('click', function () {
    const posicao = Math.floor(Math.random() * destinos.length);
    const escolhido = destinos[posicao];
    fotoSurpresa.src = escolhido.foto;
    fotoSurpresa.alt = escolhido.alt;
    textoSurpresa.textContent = escolhido.nome + ': ' + escolhido.texto;
});
