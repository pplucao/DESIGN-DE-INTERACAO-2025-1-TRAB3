// ============ ELEMENTOS DO DOM ============
export const galeriaElements = {
    // Inputs do formulário
    imageFile: document.getElementById('image-file'),
    cardTitle: document.getElementById('card-title'),
    cardDescription: document.getElementById('card-description'),
    
    // Customização visual
    cardColor: document.getElementById('card-color'),
    cardColorText: document.getElementById('card-color-text'),
    cardBorder: document.getElementById('card-border'),
    
    // Dimensões
    cardWidth: document.getElementById('card-width'),
    cardHeight: document.getElementById('card-height'),
    cardSpacing: document.getElementById('card-spacing'),
    
    // Botões e ações
    addCardBtn: document.getElementById('adicionar-card-btn'),
    
    // Container da galeria
    galeriaContainer: document.getElementById('galeria-container')
};

// ============ ESTADO DA GALERIA ============
export const galeriaState = {
    element: null,          // Referência ao container principal da galeria
    cards: [],              // Array de cards criados
    currentId: 0,           // Contador para IDs únicos
};

