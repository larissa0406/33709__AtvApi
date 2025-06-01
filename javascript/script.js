// URLS da API
const API_BASE = 'http://cnms-parking-api.net.uztec.com.br/api/v1/';

const endpoints = {
    entrada: `${API_BASE}entry`,
    tempo: `${API_BASE}time/`,
    saida: `${API_BASE}exit/`,
    atualizar: `${API_BASE}update/`,
    cancelar: `${API_BASE}cancel/`
};

// Função para fazer requisições genéricas
async function requisicao(url, metodo = 'GET', corpo = null) {
    const config = {
        method: metodo,
        headers: { 'Content-Type': 'application/json' }
    };
    if (corpo) config.body = JSON.stringify(corpo);

    const resposta = await fetch(url, config);

    if (!resposta.ok) {
        throw new Error(`Erro: ${resposta.status}`);
    }
    return resposta.json();
}

// Registrar entrada
document.getElementById('carForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const placa = document.getElementById('plate').value;
    const modelo = document.getElementById('model').value;

    try {
        await requisicao(endpoints.entrada, 'POST', { plate: placa, model: modelo });
        document.getElementById('resultado').textContent = '✅ Entrada registrada!';
    } catch (err) {
        document.getElementById('resultado').textContent = '❌ Erro ao registrar entrada.';
        console.error(err);
    }
});

// Consultar tempo
document.getElementById('tempoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const placa = document.getElementById('tempoPlate').value;

    try {
        const dados = await requisicao(endpoints.tempo + placa);
        document.getElementById('tempo').textContent = `⏱️ Tempo: ${dados.parkedTime.toFixed(2)} horas`;
    } catch (err) {
        document.getElementById('tempo').textContent = '❌ Erro ao consultar tempo.';
        console.error(err);
    }
});

// Registrar saída
document.getElementById('saidaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const placa = document.getElementById('saidaPlate').value;

    try {
        await requisicao(endpoints.saida + placa, 'PATCH');
        document.getElementById('saidaResultado').textContent = '🚗 Saída registrada!';
    } catch (err) {
        document.getElementById('saidaResultado').textContent = '❌ Erro na saída.';
        console.error(err);
    }
});


