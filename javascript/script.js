const apiBase = "http://cnms-parking-api.net.uztec.com.br";

function cadastrarVeiculo() {
  const placa = document.getElementById('placa').value;
  const modelo = document.getElementById('modelo').value;
  const cor = document.getElementById('cor').value;

  const dados = {
    plate: placa,
    model: modelo,
    color: cor
  };

  fetch(`${apiBase}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data => {
    alert('Veículo cadastrado com sucesso!');
    console.log(data);
  })
 .catch(error => {
    console.error("Erro:", error);
    alert("Erro ao cadastrar: " + error);
});



function listarVeiculos() {
  fetch(`${apiBase}/vehicles`)
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('lista-veiculos');
      lista.innerHTML = '';

      data.forEach(veiculo => {
        const item = document.createElement('li');
        item.textContent = `Placa: ${veiculo.plate} | Modelo: ${veiculo.model} | Cor: ${veiculo.color}`;
        lista.appendChild(item);
      });
    })
    .catch(error => {
      alert('Erro ao listar veículos!');
      console.error(error);
    });
}
