import { headerElements } from './headerElements.js';
import { atualizarVisibilidadeCampos, atualizarHeader, adicionarHeader } from './headerFunctions.js';

export function initHeaderListeners() {
    // VERIFICAÇÕES DE EXISTENCIA DOS ELEMENTOS ANTES DE ACIONAR O EVENTO
    if (headerElements.elementType) headerElements.elementType.addEventListener('change', atualizarVisibilidadeCampos);
    if (headerElements.headerBgColor) headerElements.headerBgColor.addEventListener('change', atualizarHeader);
    
    // ======================== RESTRIÇÕES =========================
    headerElements.elementContent.addEventListener('input', function() { // PERMITIR SÓ LETRAS
        this.value = this.value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
        if(this.value.length > 12) {
            this.value = this.value.substring(0, 12);
            alert('Limite de 12 caracteres!');
        }
    });


    if (headerElements.elementSize) { //TAMANHO DO TEXTO ATÉ 20 PX
        headerElements.elementSize.addEventListener('input', function() {
            if (parseInt(this.value) > 20) {
                this.value = 20;
                alert('O tamanho máximo é 20px!');
            }
        });
    }

    if (headerElements.headerBorder) { // BORDA ATÉ 20 PX
        headerElements.headerBorder.addEventListener('input', function() {
            if (parseInt(this.value) > 20) {
                this.value = 20;
                alert('A largura máxima da borda é 20px!');
            }
            atualizarHeader();
        });
    }
    
    // VERIFICA SE A BORDA EXISTE ANTES DE APLICAR COR
    if (headerElements.headerBorderColor) {
        headerElements.headerBorderColor.addEventListener('input', atualizarHeader);
    }

    const btnAdicionar = document.getElementById('btnAdicionarHeader');
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', adicionarHeader);
    }
    
}