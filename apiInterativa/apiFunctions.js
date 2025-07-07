import { pagePreview } from '../pagePreview.js';

export async function consulta() {
    const raca = document.querySelector('#raca').value.trim();
    if (!raca) {
        alert('Por favor, digite uma raça válida');
        return;
    }

    const url = `https://dog.ceo/api/breed/${raca.toLowerCase()}/images/random`;
    
    try {
        // Mostra estado de carregamento
        const painel = pagePreview.querySelector('#dog-api-results') || criaPainelResultado();
        painel.innerHTML = '<p>Carregando imagem...</p>';
        
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.status === "success" && dados.message) {
            mostraImagem(dados.message);
        } else {
            painel.innerHTML = `
                <div class="api-error">
                    <h4>Raça não encontrada</h4>
                    <p>Tente raças como "beagle", "poodle" ou "husky"</p>
                </div>
            `;
        }
    } catch(err) {
        const painel = pagePreview.querySelector('#dog-api-results') || criaPainelResultado();
        painel.innerHTML = `
            <div class="api-error">
                <h4>Erro na conexão</h4>
                <p>${err.message}</p>
            </div>
        `;
    }
}

function criaPainelResultado() {
    const resultsSection = document.createElement('div');
    resultsSection.id = 'dog-api-results';
    resultsSection.className = 'api-results-section';
    
    // Insere no pagePreview após o container da API
    const apiContainer = pagePreview.querySelector('#interactiveapi');
    if (apiContainer) {
        apiContainer.insertAdjacentElement('afterend', resultsSection);
    } else {
        // Fallback: adiciona ao final do pagePreview
        pagePreview.appendChild(resultsSection);
    }
    
    return resultsSection;
}

export function mostraImagem(imageUrl) {
    // Garante que o painel existe
    const painel = pagePreview.querySelector('#dog-api-results') || criaPainelResultado();
    
    painel.innerHTML = `
        <div class="api-result-item">
            <img src="${imageUrl}" alt="Imagem de ${document.querySelector('#raca').value}" class="dog-image">
            <button class="btn-remove-api" onclick="this.closest('#dog-api-results').innerHTML=''">
                Remover Resultado
            </button>
        </div>
    `;
}

export function initDogApi() {
    const btnEnviar = document.querySelector('#enviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', consulta);
    }

    const racaInput = document.querySelector('#raca');
    if (racaInput) {
        racaInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
            if(this.value.length > 20) {
                this.value = this.value.substring(0, 20);
                alert('Limite de 20 caracteres para a raça!');
            }
        });
    }
}