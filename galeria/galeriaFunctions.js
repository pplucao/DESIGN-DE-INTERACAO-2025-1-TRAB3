import { galeriaElements, galeriaState } from './galeriaElements.js';
import { pagePreview } from '../pagePreview.js';

export function criarGaleria() {
    if (galeriaState.element) return true; // ======= VERIFICA SE EXISTE O CONTAINER ======== 
    
    if (!pagePreview) {
        console.error("Erro: pagePreview não encontrado!");
        return false;
    }

    // ======= CRIA O CONTAINER ======== 
    galeriaState.element = document.createElement('div');
    galeriaState.element.className = 'galeria-container';
    Object.assign(galeriaState.element.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '20px',
        border: '1px dashed #ccc' // Para visualização
    });

    pagePreview.appendChild(galeriaState.element);
    return true;
}

// ======= FUNÇÃO PARA ADICIONAR CARD ======== 
export function adicionarCard() {  
    
    if (!galeriaState.element) {
        criarGaleria(); // ======= CRIA CONTAINER CASO NAO EXISTA ======== 
    }

    // ======= VERIFICA SE UMA IMAGEM FOI CARREGADA ======== 
    if (!galeriaElements.imageFile.files[0]) {
        alert("Por favor, selecione uma imagem!");
        return;
    }

    // ======= PEGA OS VALORES ======== 
    const imageFile = galeriaElements.imageFile.files[0];
    const cardTitle = galeriaElements.cardTitle.value.trim();
    const cardDescription = galeriaElements.cardDescription.value.trim(); 
    const cardColor = galeriaElements.cardColor.value; 
    const cardColorText = galeriaElements.cardColorText.value; 
    const cardBorder = galeriaElements.cardBorder.value; 
    const cardWidth = galeriaElements.cardWidth.value;  
    const cardHeight = galeriaElements.cardHeight.value; 
    const cardSpacing = galeriaElements.cardSpacing.value; 

    // ======= VALIDAÇÕES ======== 
    if (!imageFile) {
        alert("SELECIONE UMA IMAGEM!");
        return;
    }

    if (!cardTitle) {
        alert("DIGITE UM TITULO PARA O CARD!");
        return;
    }

    // Limitar o título a 20 caracteres
    if (cardTitle.length > 20) {
        alert("O TÍTULO NÃO PODE TER MAIS DE 20 CARACTERES!");
        return;
    }

    // Limitar a descrição a 100 caracteres
    if (cardDescription.length > 100) {
        alert("A DESCRIÇÃO NÃO PODE TER MAIS DE 100 CARACTERES!");
        return;
    }
    //====================================

    // ======= CRIA O CARD ======== 
    const reader = new FileReader();
    reader.onload = function(e) {
        if (!e.target.result) {
            console.error("Erro: imagem não carregada corretamente");
            return;
        }

        const card = document.createElement('div');
        card.className = 'gallery-card';
        
        // Definir estilos do card
        card.style.width = `${cardWidth}px`;
        card.style.height = `${cardHeight}px`;
        card.style.backgroundColor = cardColor;
        card.style.color = cardColorText;
        
        const maxBorder = 10; // ======= DETERMINA TAM MAXIMO DA BORDA ========
        const cardBorderValue = parseInt(galeriaElements.cardBorder.value) || 0;
        const cardBorder = Math.min(cardBorderValue, maxBorder);

        //========== APLICA BORDA E COR DO TEXTO ==========
        card.style.border = `${cardBorder}px solid #ccc`;
        card.style.borderRadius = '8px';
        card.style.overflow = 'hidden';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.position = 'relative';

        if (parseInt(cardBorder) > maxBorder) {
            alert(`O valor máximo para a borda é ${maxBorder}px!`);
        }

        // Adicionar imagem
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '100%';
        img.style.height = 'auto';
        card.appendChild(img);

        // Adicionar texto (titulo e descriçao)
        const content = document.createElement('div');
        content.className = 'gallery-card-content';

        // Adicionar título
        const title = document.createElement('h3');
        title.textContent = cardTitle || "Sem título"; 
        title.style.color = cardColorText;
        content.appendChild(title);

        // Adicionar descrição
        const description = document.createElement('p');
        description.textContent = cardDescription || "Sem descrição";
        description.style.color = cardColorText;
        content.appendChild(description);

        card.appendChild(content);

        // Adicionar botão de remover e estilizar
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '5px';
        removeBtn.style.right = '5px';
        removeBtn.style.background = 'red';
        removeBtn.style.color = 'white';
        removeBtn.style.border = 'none';
        removeBtn.style.borderRadius = '50%';
        removeBtn.style.width = '25px';
        removeBtn.style.height = '25px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.onclick = function() {
            card.remove();
            const index = galeriaState.cards.indexOf(card);
            if (index > -1) {
                galeriaState.cards.splice(index, 1);
            }
        };
        card.appendChild(removeBtn);

        // Adicionar à galeria
        galeriaState.element.appendChild(card);
        galeriaState.cards.push(card);

        // Atualize o layout para flex wrap
        galeriaState.element.style.display = 'flex';
        galeriaState.element.style.flexWrap = 'wrap';
        galeriaState.element.style.gap = `${cardSpacing}px`;
        galeriaState.element.style.alignItems = 'flex-start'; // Alinha os cards no topo

    };

    reader.onerror = function() {
        console.error("Erro no FileReader"); // Debug 
    };
    reader.readAsDataURL(imageFile);
    
}

export function validarDimensao(valor, min, max) {
    valor = parseInt(valor);
    return Math.min(Math.max(valor, min), max);
}