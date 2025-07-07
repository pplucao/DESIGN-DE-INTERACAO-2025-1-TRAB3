import { menuElements, menuState } from './menuElements.js';
import { atualizarEstilosMenu, criarMenu, atualizarItensMenu } from './menuFunctions.js';

export function initMenuListeners (){
    // verifica se os elementos existem antes de adicionar os listeners
    if (menuElements.menuColor) menuElements.menuColor.addEventListener('input', atualizarEstilosMenu);
    if (menuElements.menuTextColor) menuElements.menuTextColor.addEventListener('input', atualizarEstilosMenu);
    if (menuElements.menuItemColor) menuElements.menuItemColor.addEventListener('input', atualizarEstilosMenu);
    if (menuElements.aligmItens) menuElements.aligmItens.addEventListener('change', atualizarEstilosMenu);
    
    if (menuElements.menuItemBorder) {
        menuElements.menuItemBorder.addEventListener('input', function() {
            this.value = Math.min(parseInt(this.value), 10); //restrição de borda 
            atualizarEstilosMenu();
        });
    }
    
    if (menuElements.menuSpacing) {
        menuElements.menuSpacing.addEventListener('input', function() {
            this.value = Math.min(parseInt(this.value), 30); //restrição de espaçamento
            atualizarEstilosMenu();
        });
    }
    
    if (menuElements.menuHeight) {
        menuElements.menuHeight.addEventListener('input', function() {
            this.value = Math.min(parseInt(this.value), 100); //restrição de tamanho do menu
            atualizarEstilosMenu();
        });
    }
    
    if (menuElements.addItemButton) { //conteudo da caixa de texto
        menuElements.addItemButton.addEventListener('click', function() {
            const nomeItem = menuElements.addItem.value.trim();
            
            if (!nomeItem) {
                alert("Digite um nome para o item!"); //restrição para obrigar usuario a digitar
                return;
            }
        
            if (nomeItem.length > 14) {
                alert("O item não pode ter mais de 14 caracteres!");
                return;
            }
            
            menuState.itens.push(nomeItem);
            menuElements.addItem.value = '';
            
            if (!menuState.element) {
                criarMenu();
            }
            atualizarItensMenu();
        });
    }
    
    if (menuElements.addItem) {
        menuElements.addItem.addEventListener('input', function() {
            this.value = this.value.replace(/[0-9]/g, '');
            
            if (this.value.length > 14) {
                this.value = this.value.substring(0, 14);
                alert("Máximo de 14 caracteres atingido!");
            }
        });
    }
    
    if (menuElements.clearItemBtn) {
        menuElements.clearItemBtn.addEventListener('click', function() {
            if (menuState.itens.length === 0) {
                alert("Não há itens para remover!");
                return;
            }
            
            menuState.itens.pop();
            atualizarItensMenu();
        });
    }
};