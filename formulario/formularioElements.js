export const formElements = {
    nameForm: document.getElementById('name-form'),
    formBorder: document.getElementById('form-border'),
    formTextColor: document.getElementById('form-text-color'),
    formColor: document.getElementById('form-color'),
    typeCamp: document.getElementById('type-camp'),
    nameCamp: document.getElementById('name-camp'),
    btnAdicionarCampo: document.getElementById('btn-adicionar-campo')
}

export const formState = {
    formElement: null,
    formTitleElement: null,
    fields: [], // Para armazenar os campos adicionados dinamicamente
};

