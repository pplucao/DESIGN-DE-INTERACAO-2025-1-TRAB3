import { footerElements, footerState } from "./footerElements.js";

const pagePreview = document.getElementById('pagePreview');

export function criarFooter() {
  if (!footerState.element) {
    footerState.element = document.createElement('footer');
    footerState.element.className = 'footer-container';

    // Cria a lista de itens
    const lista = document.createElement('div');
    lista.className = 'footer-items';
    footerState.element.appendChild(lista);

    pagePreview.appendChild(footerState.element);
    atualizarFooter();

    // Ativa o botão de adicionar campo
    if (footerElements.btnAddRodape) {
      footerElements.btnAddRodape.disabled = false;
    }

    return true;
  }
  return false;
}

export function adicionarFooter() {

  // Cria o footer se não existir
  if (!footerState.element && !criarFooter()) {
    alert('Não foi possível criar o rodapé!');
    return;
  }

  if (!footerElements.footerAddItem) {
    console.error("Campo de adicionar item não encontrado");
    return;
  }

  // Validação do campo nome
  const itemText = footerElements.footerAddItem.value.trim();
  if (!itemText) {
    alert('Digite um nome para o campo!');
    return;
  }

  const listaItens = footerState.element.querySelector('.footer-items') || criarListaItens();
  if (!listaItens) return;

  const footerItem = document.createElement('div');
  footerItem.className = 'footer-item';

  const itemContent = document.createElement('span');
  itemContent.textContent = itemText;
  itemContent.style.color = footerElements.footerTextColor?.value || '';
  //nao altera estilo caso nao mexam

  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'X';
  botaoExcluir.className = 'remover-campo';
  botaoExcluir.onclick = function () {
    footerItem.remove();
    atualizarFooter();
  }

  // Monta o item
  footerItem.appendChild(itemContent);
  footerItem.appendChild(botaoExcluir);
  listaItens.appendChild(footerItem);

  // 2. Depois verifica se ultrapassou o limite
  const alturaMaxima = parseInt(footerElements.footerHeight.value) || 200;
  if (footerState.element.scrollHeight > alturaMaxima) {
    footerItem.remove();
    alert('Não é possível adicionar mais itens - altura máxima do rodapé atingida!');
    atualizarFooter();
    return;
  }


  footerElements.footerAddItem.value = '';
  atualizarFooter();
}

export function atualizarFooter() {

  if (!footerState.element) return;

  // Aplica cor de fundo do rodapé
  if (footerElements.footerColor) {
    footerState.element.style.backgroundColor = footerElements.footerColor.value;
  }

  // Altura do rodapé
  if (footerElements.footerHeight) {
    let height = parseInt(footerElements.footerHeight.value) || 70;
    height = Math.max(70, Math.min(height, 200)); // Garante entre 70 e 200
    footerState.element.style.height = `${height}px`;
    footerState.element.style.boxSizing = 'border-box';
    footerElements.footerHeight.value = height;
  }

  // Aplica cor do texto para todos os itens
  if (footerElements.footerTextColor) {
    const items = footerState.element.querySelectorAll('.footer-item span');
    items.forEach(item => {
      item.style.color = footerElements.footerTextColor.value;
    });
  }

  // Aplica estilo aos itens (fundo individual)
  if (footerElements.footerItemColor) {
    const items = footerState.element.querySelectorAll('.footer-item');
    items.forEach(item => {
      item.style.backgroundColor = footerElements.footerItemColor.value;
    });
  }

  //atualiza raio da borda
  if (footerElements.footerItemBorder) {
    const borderRadius = Math.min(parseInt(footerElements.footerItemBorder.value) || 0, 10);
    const items = footerState.element.querySelectorAll('.footer-item');
    items.forEach(item => {
      item.style.borderRadius = `${borderRadius}px`;
    });
  }

  // Espaçamento entre itens
  if (footerElements.footerSpacing) {
    const spacing = Math.min(parseInt(footerElements.footerSpacing.value) || 10, 30);
    const listaItens = footerState.element.querySelector('.footer-items');
    if (listaItens) {
      listaItens.style.gap = `${spacing}px`;
    }
  }
}
