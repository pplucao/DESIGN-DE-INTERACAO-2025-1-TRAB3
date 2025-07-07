import { atualizarFormulario, adicionarCampo } from './formularioFunctions.js';
import { formElements } from './formularioElements.js';

export function initFormListeners(){
    // Verificação mais segura dos elementos
    if (!formElements.nameForm || !formElements.formBorder || 
        !formElements.formTextColor || !formElements.formColor || 
        !formElements.nameCamp) {
        console.error("Alguns elementos do formulário não foram encontrados");
        return;
    }
    
    formElements.nameForm.addEventListener('input', atualizarFormulario);
    formElements.formBorder.addEventListener('input', atualizarFormulario);
    formElements.formTextColor.addEventListener('input', atualizarFormulario);
    formElements.formColor.addEventListener('input', atualizarFormulario);

    formElements.nameCamp.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
        if(this.value.length > 14) {
            this.value = this.value.substring(0, 14);
            alert('Limite de 14 caracteres!');
        }
        atualizarFormulario();
    });

    
    if (formElements.btnAdicionarCampo) {
        formElements.btnAdicionarCampo.addEventListener('click', function(e) {
            e.preventDefault();

            if (!formElements.nameCamp.value.trim()) {
                alert('Por favor, digite um nome para o campo!');
                return;
            }

            if (typeof adicionarCampo === 'function') {
                adicionarCampo();
            } else {
                console.error("Função adicionarCampo não encontrada");
            }
        });
    } else {
        console.error("Botão btn-adicionar-campo não encontrado");
    }

    // Listener SOMENTE para atualização
    formElements.nameCamp.addEventListener('input', atualizarFormulario);
}
