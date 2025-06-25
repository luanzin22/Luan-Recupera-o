const form = document.getElementById('form-troca');
const lista = document.getElementById('lista-trocas');

function criarTroca(troca, index) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${troca.item}</strong><br />
    ${troca.descricao}<br />
    <em>${troca.contato}</em><br />
    <button onclick="excluirTroca(${index})">Excluir</button>
  `;
  return li;
}

function atualizarLista() {
  lista.innerHTML = '';
  const trocas = JSON.parse(localStorage.getItem('trocas') || '[]');
  trocas.forEach((troca, index) => {
    lista.appendChild(criarTroca(troca, index));
  });
}

function excluirTroca(index) {
  const trocas = JSON.parse(localStorage.getItem('trocas') || '[]');
  trocas.splice(index, 1);
  localStorage.setItem('trocas', JSON.stringify(trocas));
  atualizarLista();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const novaTroca = {
    item: document.getElementById('item').value,
    descricao: document.getElementById('descricao').value,
    contato: document.getElementById('contato').value
  };
  const trocas = JSON.parse(localStorage.getItem('trocas') || '[]');
  trocas.push(novaTroca);
  localStorage.setItem('trocas', JSON.stringify(trocas));
  form.reset();
  atualizarLista();
});

atualizarLista();
