import { menuElements, menuState } from './menuElements.js';

const pagePreview = document.getElementById('pagePreview');

export function criarMenu(){
    if (menuState.element) return;
    // Cria o container principal do menu
    menuState.element = document.createElement('nav');
    menuState.element.className = 'menu-container';

    // Cria a lista de itens
    const lista = document.createElement('ul');
    lista.className = 'menu-lista';

    menuState.element.appendChild(lista);
    pagePreview.appendChild(menuState.element);

    // Aplica estilos iniciais
    menuState.element.style.height = `${menuState.alturaMenu}px`;
    atualizarEstilosMenu();
    
}

// Função para atualizar os itens do menu
export function atualizarItensMenu() {
    if (!menuState.element) return;
    
    const lista = menuState.element.querySelector('.menu-lista'); //lista de itens pro menu
    lista.innerHTML = '';

    menuState.itens.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';
        li.textContent = item;
        lista.appendChild(li);
    });
    
    atualizarEstilosMenu();
}

// Função para atualizar estilos (incluindo alinhamento)
export function atualizarEstilosMenu() {
    if (!menuState.element || !menuElements.menuColor || !menuElements.menuTextColor) return;

    // Estilos do container
    menuState.element.style.backgroundColor = menuElements.menuColor.value;
    menuState.element.style.color = menuElements.menuTextColor.value;
    menuState.element.style.display = 'flex';
    menuState.element.style.alignItems = 'center';
    menuState.element.style.padding = '0 20px';
    menuState.element.style.height = `${menuElements.menuHeight ? menuElements.menuHeight.value : menuState.alturaMenu}px`;


    // Estilos da lista
    const lista = menuState.element.querySelector('.menu-lista');
    if (lista) {
        lista.style.display = 'flex';
        lista.style.gap = `${menuElements.menuSpacing ? menuElements.menuSpacing.value : 10}px`;
        lista.style.listStyle = 'none';
        lista.style.margin = '0';
        lista.style.padding = '0';
        lista.style.width = '100%';
        
        // Alinhamento dos itens 
        if (menuElements.aligmItens) {
            switch(menuElements.aligmItens.value) {
                case 'left':
                    lista.style.justifyContent = 'flex-start';
                    break;
                case 'right':
                    lista.style.justifyContent = 'flex-end';
                    break;
                case 'center':
                    lista.style.justifyContent = 'center';
                    break;
            }
        }
    }

    // Estilos dos itens
    menuState.element.querySelectorAll('.menu-item').forEach(item => {
        if (menuElements.menuItemColor) {
            item.style.backgroundColor = menuElements.menuItemColor.value;
            item.style.border = `${menuElements.menuItemBorder ? menuElements.menuItemBorder.value : 0}px solid ${menuElements.menuItemColor.value}`;
        }
        item.style.padding = '8px 15px';
        item.style.borderRadius = '4px';
    });
}

