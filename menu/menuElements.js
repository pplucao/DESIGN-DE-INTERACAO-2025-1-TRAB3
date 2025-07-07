

export const menuElements = {
    menuColor: document.getElementById('menu-color'),
    menuTextColor: document.getElementById('menu-text-color'),
    menuItemColor: document.getElementById('menu-itens-color'),
    menuItemBorder: document.getElementById('menu-item-border'),
    menuSpacing: document.getElementById('menu-spacing'),
    menuHeight: document.getElementById('menu-height'),
    aligmItens: document.getElementById('aligm-itens'),
    addItem: document.getElementById('add-item'),
    addItemButton: document.getElementById('add-item-button'),
    clearItemBtn: document.getElementById('clear-item-button')
};

export const menuState = {
    element: null,       // Referência ao elemento <nav> criado
    itens: [],           // Substitui o array itensMenu
    alturaMenu: 80,    // Substitui alturaMenu
};
