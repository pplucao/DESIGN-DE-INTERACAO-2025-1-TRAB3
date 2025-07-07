import { headerElements, headerState } from './headerElements.js';

const pagePreview = document.getElementById('pagePreview');

// Função para atualizar a visibilidade dos campos de conteúdo/imagem
export function atualizarVisibilidadeCampos() {
  if (!headerElements.elementType) return;

  const selectedType = elementType.value; //PEGA O TIPO ESCOLHIDO
  const textColorContainer = textColor.parentNode; //PEGA A DIV .editor-form DE COR 
  const elementSizeContainer = elementSize.parentNode; // PEGA A DIV .editor-form DA ALTURA

  if (selectedType === 'image') {
    headerElements.elementImage?.classList.remove('d-none');
    headerElements.elementContent?.classList.add('d-none');// DESABILITA CAIXA DE CONTEUDO (TEXTO)
    elementSizeContainer?.classList.add('d-none');// OCULTA A DIV INTEIRA (label e input) DO TAMANHO
    textColorContainer?.classList.add('d-none');
  } else if (selectedType === 'text') {
    headerElements.elementContent?.classList.remove('d-none'); //HABILITA CAIXA DE CONTEUDO (TEXTO)
    headerElements.elementImage?.classList.add('d-none');
    elementSizeContainer?.classList.remove('d-none'); //HABILITA A DIV INTEIRA (label e input) DO TAMANHO
    textColorContainer?.classList.remove('d-none');
  }
}


export function criarHeader() {

  if (headerState.element) return;

  /*VERIFICA SE JÁ FOI CRIADO*/
  if (!headerState.element) {
    headerState.element = document.createElement('header');
    headerState.element.className = 'headerPage';

    /* ADICIONA ESTILOS FIXOS */
    headerState.element.style.cssText = `
            width: 100%;
            height: 100px;
            min-height: 100px; 
            max-height: 100px;
            overflow: hidden;
        `;

    pagePreview.appendChild(headerState.element); // ADICIONA AO CONTAINER
    atualizarHeader(); // APLICA OS ESTILOS INICIAIS
  }
}

// Função para atualizar o estilo do cabeçalho
export function atualizarHeader() {
  if (!headerState.element || !headerElements.headerBorder || !headerElements.headerBorderColor || !headerElements.headerBgColor) return;

  let borderWidth = parseInt(headerBorder.value) || 0; // pega tamanho da borda, se n tiver nada é 0
  borderWidth = Math.max(0, Math.min(borderWidth, 20)); // Entre 0 e 20

  headerState.element.style.backgroundColor = headerElements.headerBgColor.value; //pega valor da borda
  headerState.element.style.border = `${borderWidth}px solid ${headerElements.headerBorderColor.value}`; //aplica borda e cor da borda
}


export function adicionarHeader() {
  criarHeader();
  if (!headerElements.elementType) return;

  const selectedType = headerElements.elementType.value; //seleciona o tipo

  if (selectedType == 'text') {
    //caso a header já tenha obtido todo o espaço definido
    if (headerState.element.querySelectorAll('span').length >= 3) {
      alert('Máximo de 3 textos atingido!');
      return; // Impede adição de mais textos
    }

    if (!headerElements.elementContent?.value.trim()) { // nao deixa texto vazio (obrigando usuario a digitar)
      alert('O conteúdo do texto não pode estar vazio!');
      return;
    }

    //Cria elemento de texto
    const textoElemento = document.createElement('div');
    textoElemento.className = 'textHeader';
    textoElemento.textContent = headerElements.elementContent.value;

    if (headerElements.textColor) { //adiciona cor ao texto
      textoElemento.style.color = headerElements.textColor.value;
    }

    if (headerElements.elementSize) { //adiciona tamanho ao texto
      const tamanhoTexto = Math.min(parseInt(headerElements.elementSize.value), 20);// Máximo 20px
      textoElemento.style.fontSize = `${tamanhoTexto}px`;
    }

    //Botão para remover
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'X';
    botaoExcluir.className = 'excluir-campo';
    botaoExcluir.onclick = () => textoElemento.remove();

    textoElemento.appendChild(botaoExcluir);
    headerState.element.appendChild(textoElemento); //insere texto no header
    headerElements.elementContent.value = ''; //limpa caixa de texto 

  } else if (selectedType == 'image') {

    const file = headerElements.elementImage?.files[0];
    if (file) { /*verifica se usuario selecionou algo*/
      const reader = new FileReader(); /*ler conteudo da imagem*/
      reader.onload = function (e) {
        // Verifica se o header existe
        if (!headerState.element) {
          console.error("Elemento header não encontrado!");
          return;
        }
        // Remove a imagem anterior (se existir)
        const oldImg = headerState.element.querySelector('.img-container');
        if (oldImg) oldImg.remove();

        // Cria o container da imagem
        const container = document.createElement('div');
        container.className = 'img-container';
        container.style.cssText = `
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    `;

        const imgWrapper = document.createElement('div'); // Novo wrapper para a imagem
        imgWrapper.className = 'img-wrapper';
        imgWrapper.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    `;

        const img = new Image();
        img.src = e.target.result;
        img.style.cssText = `
                    height: 80px;
                    width: auto;
                    max-width: 200px;
                    display: block;
                    border-radius: 50%;
                    `;

        // Botão de excluir
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'X';
        botaoExcluir.className = 'excluir-logo';
        botaoExcluir.onclick = () => container.remove();

        imgWrapper.appendChild(img);
        container.appendChild(imgWrapper);
        container.appendChild(botaoExcluir);

        // Insere no header
        if (headerState.element.firstChild) { //posiciona a logo antes do primeiro filho (sempre a  esquerda)
          headerState.element.insertBefore(container, headerState.element.firstChild);
        } else {
          headerState.element.appendChild(container);
        }

        headerElements.elementImage.value = '';
      }
      reader.readAsDataURL(file); /*le o conteudo do file*/
    }
  }
}
