// Alternar entre as abas do painel
function changeTab(tabId, event) {
    // Esconde todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Remove a classe ativa de todos os botões da barra lateral
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Mostra a aba selecionada e ativa o respetivo botão
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Valores financeiros iniciais (Mock)
let receitas = 5200;
let despesas = 1800;

// Adicionar transações financeiras
function addFinanca(e) {
    e.preventDefault();
    const desc = document.getElementById('fin-desc').value;
    const valor = parseFloat(document.getElementById('fin-valor').value);
    const tipo = document.getElementById('fin-tipo').value;

    if (tipo === 'receita') {
        receitas += valor;
    } else {
        despesas += valor;
    }

    // Atualizar os painéis de totais
    document.getElementById('total-receitas').innerText = `R$ ${receitas.toFixed(2)}`;
    document.getElementById('total-despesas').innerText = `R$ ${despesas.toFixed(2)}`;
    document.getElementById('saldo-atual').innerText = `R$ ${(receitas - despesas).toFixed(2)}`;

    // Adicionar a linha na tabela
    const tbody = document.getElementById('tabela-financeiro');
    tbody.innerHTML += `
        <tr>
            <td>${desc}</td>
            <td>R$ ${valor.toFixed(2)}</td>
            <td><span class="badge ${tipo}">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span></td>
        </tr>
    `;
    
    document.getElementById('form-financeiro').reset();
}

// Cadastrar Moradores
function addMorador(e) {
    e.preventDefault();
    const nome = document.getElementById('mor-nome').value;
    const unidade = document.getElementById('mor-unidade').value;
    const contato = document.getElementById('mor-contato').value;

    const tbody = document.getElementById('tabela-moradores');
    tbody.innerHTML += `
        <tr>
            <td>${nome}</td>
            <td>${unidade}</td>
            <td>${contato}</td>
        </tr>
    `;
    
    document.getElementById('form-moradores').reset();
}

// Reservar Espaços
function addReserva(e) {
    e.preventDefault();
    const nome = document.getElementById('res-nome').value;
    const area = document.getElementById('res-area').value;
    // Formatar data de AAAA-MM-DD para DD/MM/AAAA
    const data = document.getElementById('res-data').value.split('-').reverse().join('/');

    const tbody = document.getElementById('tabela-reservas');
    tbody.innerHTML += `
        <tr>
            <td>${nome}</td>
            <td>${area}</td>
            <td>${data}</td>
        </tr>
    `;
    
    document.getElementById('form-reservas').reset();
}

// Publicar no Mural de Avisos
function addAviso(e) {
    e.preventDefault();
    const titulo = document.getElementById('aviso-titulo').value;
    const texto = document.getElementById('aviso-texto').value;

    const container = document.getElementById('mural-container');
    container.innerHTML = `
        <div class="aviso-card">
            <h4>📌 ${titulo}</h4>
            <p>${texto}</p>
        </div>
    ` + container.innerHTML;
    
    document.getElementById('form-mural').reset();
}
