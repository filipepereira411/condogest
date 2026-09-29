// Estado da Aplicação (Dados em Memória com IDs para controlo)
let transacoes = [
    { id: 1, desc: 'Quota Condominial - Outubro', valor: 5200.00, tipo: 'receita' },
    { id: 2, desc: 'Manutenção do Elevador', valor: 1800.00, tipo: 'despesa' }
];

// Função auxiliar para formatar valores em Euros (Formato PT-PT)
function formatarEuro(valor) {
    return valor.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
}

// Alternar entre Abas (Tabs)
function changeTab(tabId, event) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Atualizar os Painéis de Valores e a Tabela Financeira
function atualizarFinanceiro() {
    let totalReceitas = 0;
    let totalDespesas = 0;

    const tabela = document.getElementById('tabela-financeiro');
    tabela.innerHTML = ''; // Limpa a tabela para renderizar o estado atual

    transacoes.forEach(t => {
        if (t.tipo === 'receita') totalReceitas += t.valor;
        if (t.tipo === 'despesa') totalDespesas += t.valor;

        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${t.desc}</td>
            <td>${formatarEuro(t.valor)}</td>
            <td><span class="badge ${t.tipo}">${t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)}</span></td>
            <td><button class="btn-delete" onclick="apagarTransacao(${t.id})">🗑️</button></td>
        `;
    });

    const saldo = totalReceitas - totalDespesas;
    
    document.getElementById('total-receitas').innerText = formatarEuro(totalReceitas);
    document.getElementById('total-despesas').innerText = formatarEuro(totalDespesas);
    
    const saldoElemento = document.getElementById('saldo-atual');
    saldoElemento.innerText = formatarEuro(saldo);

    if (saldo < 0) {
        saldoElemento.style.color = 'var(--danger-color)';
    } else {
        saldoElemento.style.color = 'var(--primary-color)';
    }
}

// Adicionar Nova Transação Financeira
function addFinanca(event) {
    event.preventDefault();

    const desc = document.getElementById('fin-desc').value;
    const valor = parseFloat(document.getElementById('fin-valor').value);
    const tipo = document.getElementById('fin-tipo').value;

    const novaTransacao = {
        id: Date.now(), // Gera um ID único baseado no timestamp
        desc,
        valor,
        tipo
    };

    transacoes.push(novaTransacao);
    atualizarFinanceiro();
    document.getElementById('form-financeiro').reset();
}

// Apagar Transação Financeira
function apagarTransacao(id) {
    transacoes = transacoes.filter(t => t.id !== id);
    atualizarFinanceiro();
}

// Registar Novo Condómino
function addMorador(event) {
    event.preventDefault();

    const nome = document.getElementById('mor-nome').value;
    const unidade = document.getElementById('mor-unidade').value;
    const contato = document.getElementById('mor-contato').value;

    const tabela = document.getElementById('tabela-moradores');
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${unidade}</td>
        <td>${contato}</td>
        <td><button class="btn-delete" onclick="apagarLinha(this)">🗑️</button></td>
    `;

    document.getElementById('form-moradores').reset();
}

// Adicionar Nova Reserva
function addReserva(event) {
    event.preventDefault();

    const nome = document.getElementById('res-nome').value;
    const area = document.getElementById('res-area').value;
    const dataInput = document.getElementById('res-data').value;

    const dataFormatada = dataInput.split('-').reverse().join('/');

    const tabela = document.getElementById('tabela-reservas');
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${area}</td>
        <td>${dataFormatada}</td>
        <td><button class="btn-delete" onclick="apagarLinha(this)">🗑️</button></td>
    `;

    document.getElementById('form-reservas').reset();
}

// Publicar Novo Aviso no Mural
function addAviso(event) {
    event.preventDefault();

    const titulo = document.getElementById('aviso-titulo').value;
    const texto = document.getElementById('aviso-texto').value;

    const muralContainer = document.getElementById('mural-container');
    
    const novoCard = document.createElement('div');
    novoCard.classList.add('aviso-card');
    novoCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4>📢 ${titulo}</h4>
            <button class="btn-delete" onclick="this.closest('.aviso-card').remove()">🗑️</button>
        </div>
        <p>${texto}</p>
    `;

    muralContainer.insertBefore(novoCard, muralContainer.firstChild);
    document.getElementById('form-mural').reset();
}

// Função auxiliar para apagar linhas genéricas (Condóminos e Reservas)
function apagarLinha(botao) {
    const linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}

// Inicialização ao carregar a página
window.onload = function() {
    atualizarFinanceiro();
    
    // Adiciona botões de apagar aos elementos estáticos que já vieram do HTML
    adicionarBotoesApagarEstaticos();
};

function adicionarBotoesApagarEstaticos() {
    // Adicionar botão na tabela de condóminos estática
    const linhasMoradores = document.querySelectorAll('#tabela-moradores tr');
    linhasMoradores.forEach(linha => {
        if (!linha.querySelector('.btn-delete')) {
            const td = document.createElement('td');
            td.innerHTML = '<button class="btn-delete" onclick="apagarLinha(this)">🗑️</button>';
            linha.appendChild(td);
        }
    });

    // Adicionar botão na tabela de reservas estática
    const linhasReservas = document.querySelectorAll('#tabela-reservas tr');
    linhasReservas.forEach(linha => {
        if (!linha.querySelector('.btn-delete')) {
            const td = document.createElement('td');
            td.innerHTML = '<button class="btn-delete" onclick="apagarLinha(this)">🗑️</button>';
            linha.appendChild(td);
        }
    });

    // Adicionar botão nos avisos estáticos
    const cardsAviso = document.querySelectorAll('.aviso-card');
    cardsAviso.forEach(card => {
        if (!card.querySelector('.btn-delete')) {
            const titulo = card.querySelector('h4');
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.justify = 'space-between';
            wrapper.style.alignItems = 'center';
            
            card.insertBefore(wrapper, titulo);
            wrapper.appendChild(titulo);
            
            const btn = document.createElement('button');
            btn.className = 'btn-delete';
            btn.innerHTML = '🗑️';
            btn.onclick = function() { card.remove(); };
            wrapper.appendChild(btn);
        }
    });
}
