import { footerElements, footerState } from "./footerElements.js";

import { atualizarFooter, adicionarFooter } from "./footerFunctions.js";

export function initFooterListeners (){

    footerElements.footerColor.addEventListener('input', atualizarFooter);
    footerElements.footerTextColor.addEventListener('input', atualizarFooter);
    footerElements.footerItemColor.addEventListener('input', atualizarFooter);
    footerElements.footerItemBorder.addEventListener('input', atualizarFooter);


    //tamanho do rodapé (RESTRIÇÃO)
    if (footerElements.footerHeight) { //limita o valor maximo durante digitação
        footerElements.footerHeight.addEventListener('input', function() {
            if (parseInt(this.value) > 200) this.value = 200;
        });
    }

    //espaçamento dos itens do rodapé (RESTRIÇÃO)
    footerElements.footerItemBorder.addEventListener('input', function() {
        // Remove qualquer caractere não numérico
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limita a no máximo 10
        if (parseInt(this.value) > 10) {
            this.value = '10';
            alert('O valor máximo para a borda é 10!');
        }
    });

    //limite de caracteres (RESTRIÇÃO)
    footerElements.footerAddItem.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
        if(this.value.length > 14) {
            this.value = this.value.substring(0, 14);
            alert('Limite de 14 caracteres!');
        }
    });

    
    if (footerElements.btnAddRodape) {
        footerElements.btnAddRodape.addEventListener('click', function(e) {
            e.preventDefault();
            adicionarFooter();
        });
    }

    if (footerElements.footerAligmItens) {
    footerElements.footerAligmItens.addEventListener('change', function(e) {
        if (footerState.element) {
            const listaItens = footerState.element.querySelector('.footer-items');
            if (listaItens) {
                listaItens.style.display = "flex";
                listaItens.style.justifyContent = e.target.value;
            }
        }
    });
}
}