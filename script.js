/*Dados Iniciais*/
let lista = JSON.parse(localStorage.getItem("filmes")) || [];

let filmesAdicionados = [
    {
        id: Date.now() + 1,
        titulo: "Jogos Vorazes",
        genero: "Distopia",
        descricao: "Em um futuro distópico, Katniss Everdeen se voluntaria para participar dos Jogos Vorazes, uma competição mortal televisionada onde jovens lutam até a morte para entreter a elite da Capital.",
        imagem: "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABT_8mnmw07ngPioKmJwzsiylClB7S99p2x947MAntA4pb2tqnmj0gJL4oB4PNTPZSjnvXLTDvLhQTRyN-2edyiTVYBveELJgGScf.jpg?r=691",
        gostei: 0,
        naoGostei: 0
    },
    {
        id: Date.now() + 2,
        titulo: "Jogos Vorazes: Em chamas",
        genero: "Distopia",
        descricao: "Após vencer os Jogos, Katniss e Peeta tornam-se símbolos de rebelião e são forçados a participar de uma edição especial que ameaça reacender a revolta nos distritos.",
        imagem: "https://www.planocritico.com/wp-content/uploads/2013/11/jogos-vorazes-em-chamas-imagem-destacada.jpg",
        gostei: 0,
        naoGostei: 0
    },
    {
        id: Date.now() + 3,
        titulo: "Jogos Vorazes: a Esperança Parte 1",
        genero: "Distopia",
        descricao: "Refugiada no Distrito 13, Katniss assume o papel de símbolo da resistência e lidera a luta contra a opressão da Capital.",
        imagem: "https://m.media-amazon.com/images/S/pv-target-images/e0f41d9eb424509cfc055a786aad5b67c7dc5ca3f5288cfa932dbbadd52d2ed2.jpg",
        gostei: 0,
        naoGostei: 0
    },
    {
        id: Date.now() + 4,
        titulo: "Jogos Vorazes: a Esperança Parte 2",
        genero: "Distopia",
        descricao: "Katniss e seus aliados partem em uma missão final para derrubar o Presidente Snow e libertar Panem de sua tirania.",
        imagem: "https://s2.glbimg.com/kJwok1FFClbENx6kWwLv_bo1Poc=/e.glbimg.com/og/ed/f/original/2015/06/09/katniss.jpg",
        gostei: 0,
        naoGostei: 0
    },
    {
        id: Date.now() + 5,
        titulo: "Jogos Vorazes: A Cantiga dos Pássaros e das Serpentes",
        genero: "Distopia",
        descricao: "Décadas antes de Katniss, o jovem Coriolanus Snow vê nos Jogos Vorazes sua chance de ascender ao poder ao ser mentor de uma tributo do empobrecido Distrito 12.",
        imagem: "https://m.media-amazon.com/images/S/pv-target-images/7d10fd628b1c11968b83dca8e257584a260838148f120c18a112370ccd07e455._SX1080_FMjpg_.jpg",
        gostei: 0,
        naoGostei: 0
    }
];

/*Inicialização*/
if (!localStorage.getItem("filmes")) {
    lista = filmesAdicionados;
    localStorage.setItem("filmes", JSON.stringify(lista));
}

/*Elementos DOM*/
let abrirModal = document.querySelector('#abrir-modal');
let modalAdicionar = document.querySelector('.modal-adicionar');
let filmesSeries = document.querySelector('.filmes-series');
let botaoValidaImagem = document.querySelector('#botao-valida-imagem');
let carregaImagem = document.querySelector('#carrega-imagem');
let exibirTotal = document.querySelector('#total-votos-geral');


/*Funções*/
const validaUrlImg = url => (url.match(/\.(jpeg|jpg|png)$/i) != null);


const renderizarFilmes = () => {
    filmesSeries.innerHTML = "";
    let titulo = document.querySelector('#adicionar-titulo').value = "";
    let genero = document.querySelector('#adicionar-genero').value = "";
    let descricao = document.querySelector('#adicionar-descricao').value = "";
    let imagem = document.querySelector('#adicionar-imagem').value = "";

    carregaImagem.src = "carrega-imagem.png";



    let totalGostei = 0;
    let totalNaoGostei = 0;

    lista.forEach(filme => {
        let divExibe = document.createElement('div');
        divExibe.classList.add('exibe');

        let imagemFilme = document.createElement('img');
        imagemFilme.src = filme.imagem;
        imagemFilme.classList.add('imagem-filme');

        let tituloFilme = document.createElement('h3');
        tituloFilme.textContent = filme.titulo;
        tituloFilme.classList.add('titulo-item');

        let generoFilme = document.createElement('p');
        generoFilme.textContent = `Gênero: ${filme.genero}`;
        generoFilme.classList.add('genero-item');

        let descricaoFilme = document.createElement('p');
        descricaoFilme.textContent = filme.descricao;
        descricaoFilme.classList.add('descricao-item');

        let containerAvaliacao = document.createElement('div');
        containerAvaliacao.classList.add('container-avalicao');

        let gostei = document.createElement('button');
        gostei.textContent = `${filme.gostei > 0 ? filme.gostei : ""} Gostei`;
        gostei.classList.add('botao-gostei');
        gostei.addEventListener('click', () => gosteiFilme(filme.id));

        let naoGostei = document.createElement('button');
        naoGostei.textContent = `${filme.naoGostei > 0 ? filme.naoGostei : ""} Não Gostei`;
        naoGostei.classList.add('botao-nao-gostei');
        naoGostei.addEventListener('click', () => naoGosteiFilme(filme.id));

        let totalVotos = document.createElement('p');
        totalVotos.textContent = `Esse filme recebeu ${filme.gostei + filme.naoGostei} voto(s)`;
        totalVotos.classList.add('total-votos');

        filmesSeries.appendChild(divExibe);
        divExibe.append(imagemFilme, tituloFilme, generoFilme, descricaoFilme, containerAvaliacao, totalVotos);
        containerAvaliacao.append(gostei, naoGostei);

        totalGostei += filme.gostei;
        totalNaoGostei  += filme.naoGostei;
    });

    exibirTotal.textContent = `Votos Positivos: ${totalGostei} | Votos Negativos: ${totalNaoGostei}`;
};

const gosteiFilme = idFilme => {
    let filme = lista.find(f => f.id === idFilme);
    if (filme) {
        filme.gostei++;
        localStorage.setItem("filmes", JSON.stringify(lista));
        renderizarFilmes();
    }
};

const naoGosteiFilme = idFilme => {
    let filme = lista.find(f => f.id === idFilme);
    if (filme) {
        filme.naoGostei++;
        localStorage.setItem("filmes", JSON.stringify(lista));
        renderizarFilmes();
    }
};

/*Eventos*/
abrirModal.addEventListener('click', () => {
    modalAdicionar.style.display = 'flex';
});

window.addEventListener('click', e => {
    if (e.target === modalAdicionar) {
        modalAdicionar.style.display = 'none';
    }
});

document.querySelector('#botao-adicionar').addEventListener('click', () => {
    let titulo = document.querySelector('#adicionar-titulo').value;
    let genero = document.querySelector('#adicionar-genero').value;
    let descricao = document.querySelector('#adicionar-descricao').value;
    let imagem = document.querySelector('#adicionar-imagem').value;

    if (!titulo || !genero || !imagem) {
        document.querySelector('#erro').style.display = 'block';
        return;
    }

    let novoFilme = { id: Date.now(), titulo, genero, descricao, imagem, gostei: 0, naoGostei: 0 };
    lista.push(novoFilme);
    localStorage.setItem("filmes", JSON.stringify(lista));

    modalAdicionar.style.display = 'none';

    renderizarFilmes();
});

botaoValidaImagem.addEventListener('click', () => {
    let imagem = document.querySelector('#adicionar-imagem').value;
    if (validaUrlImg(imagem)) {
        document.querySelector('#erro-imagem').style.display = 'none';
        carregaImagem.src = imagem;
    } else {
        document.querySelector('#erro-imagem').style.display = 'block';
        carregaImagem.src = "carrega-imagem.png";
        document.querySelector('#adicionar-imagem').value = "";
    }
});


/*Renderização Inicial*/
renderizarFilmes();