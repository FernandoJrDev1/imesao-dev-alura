let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    // Garante que os dados estão carregados antes de buscar
    await carregarDadosIniciais();

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

async function carregarDadosIniciais() {
    if (dados.length > 0) return; // Se os dados já foram carregados, não faz nada

    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
    }

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Gera as áreas de aplicação como uma lista de <li>
        const areasLi = dado.areas_de_aplicacao.map(area => `<li>${area}</li>`).join('');

        article.innerHTML = `
            <div class="card-face card-front">
                <img src="${dado.imagem_url}" alt="Ilustração sobre ${dado.nome}" class="card-image" onerror="this.parentElement.innerHTML += '<i class=\'fa-solid fa-image-slash\'></i>'; this.style.display='none';">
                <h2>${dado.nome}</h2>
                <p>${dado.descricao}</p>
                <div class="tags">
                    ${dado.tags.map(tag => `<span>#${tag}</span>`).join(' ')}
                </div>
                <a href="${dado.link_oficial}" target="_blank">Saiba mais</a>
            </div>
            <div class="card-face card-back">
                <h3>Áreas de Aplicação</h3>
                <ul>
                    ${areasLi}
                </ul>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}

// Carrega os dados iniciais quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarDadosIniciais);