const botaoTema = document.getElementById('btn-tema');
function aplicarTema(tema) {
    if (tema === 'escuro') {
        document.body.classList.add('tema-escuro');
        botaoTema.innerHTML = '<i class="bi bi-sun-fill"></i> Tema claro';
    } else {
        document.body.classList.remove('tema-escuro');
        botaoTema.innerHTML = '<i class="bi bi-moon-stars-fill"></i> Tema escuro';
    }
}
function alternarTema() {
    if (document.body.classList.contains('tema-escuro')) {
        aplicarTema('claro');
        localStorage.setItem('tema', 'claro');
    } else {
        aplicarTema('escuro');
        localStorage.setItem('tema', 'escuro');
    }
}
botaoTema.addEventListener('click', alternarTema);
aplicarTema(localStorage.getItem('tema'));
document.getElementById("botao").addEventListener("click", function () {
    document.getElementById("titulo").textContent = "Bem-vindo ao nosso site!";
});