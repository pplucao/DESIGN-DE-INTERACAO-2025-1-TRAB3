import { pagePreview } from '../pagePreview.js';
import { formElements, formState } from './formularioElements.js';

export function criarFormulario(){
    if(!formState.element){
        formState.element = document.createElement('form');
        formState.element.className = 'formPage';

        formState.formTitleElement = document.createElement('h2');
        formState.formTitleElement.className = 'form-title';
        formState.element.appendChild(formState.formTitleElement);

        pagePreview.appendChild(formState.element);
        atualizarFormulario();

        // Ativa o botão de adicionar campo
        if (formElements.btnAdicionarCampo) {
            formElements.btnAdicionarCampo.disabled = false;
        }

        return true;
    }
    return false;
}

// adicionar novo campo ao formulário 
export function adicionarCampo() {
    if (!formState.element) {
        criarFormulario(); // Garante que o formulário existe
    }

    if (!formElements.nameCamp?.value.trim()) {
        alert('Preencha o nome do campo corretamente!');
        return;
    }

    // Validação do campo nome
    const nomeCampo = formElements.nameCamp.value.trim();
    if (!nomeCampo) {
        alert('Digite um nome para o campo!');
        return;
    }

    const formCamp = document.createElement('div');
    formCamp.className = 'campo-formulario'; 

    const label = document.createElement('label');
    label.textContent = nomeCampo + ':';

    const input = document.createElement('input');
    input.type = formElements.typeCamp?.value || 'text';

    // Restrições para texto e telefone
    switch (formElements.typeCamp.value){
        case 'text': //restrições para texto
            input.setAttribute('oninput', 'this.value = this.value.replace(/[^a-zA-Z\s]/g, "")');
            break;
        case 'tel'://restrições para telefone
            input.setAttribute('maxlength', '11');
            input.setAttribute('oninput', 'this.value = this.value.replace(/[^0-9]/g, "")');
            break;
    }

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'X';
    botaoExcluir.className = 'remover-campo';
    botaoExcluir.onclick = function() {
        formCamp.remove();
    }

    // Montagem do campo
    formCamp.appendChild(label);
    formCamp.appendChild(input);
    formCamp.appendChild(botaoExcluir);

    // Adiciona ao formulário
    formState.element.appendChild(formCamp);

    // Limpa o campo de nome após adicionar
    formElements.nameCamp.value = '';
}

//atualizar formulario
export function atualizarFormulario() {
    if (!formState.element) return;

    // atualiza título (texto e cor) em um único bloco
    if(formState.formTitleElement && formElements.nameForm) {
        formState.formTitleElement.textContent = formElements.nameForm.value;
        if (formElements.formTextColor) {
            formState.formTitleElement.style.color = formElements.formTextColor.value;
        }
    }

    //atualiza raio da borda
    if (formElements.formBorder) {
        const borderRadius = Math.min(parseInt(formElements.formBorder.value) || 0, 20);
        formState.element.style.borderRadius = `${borderRadius}px`;
    }

    //atualiza cor
    if (formElements.formColor) {
        formState.element.style.backgroundColor = formElements.formColor.value;
    }

}