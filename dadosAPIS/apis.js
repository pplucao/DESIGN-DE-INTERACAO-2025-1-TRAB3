// DadosAPIS/apis.js
import { pagePreview } from '../pagePreview.js';
import { apiState } from '../apiState.js';

export async function fetchThreeAPIs() {
  try {
    // Array de Promises para as 3 APIs
    const responses = await Promise.all([
      fetch('https://api.thecatapi.com/v1/images/search'),
      fetch('http://numbersapi.com/random/trivia?json'),
      fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      })
    ]);

    // Processa todas as respostas
    const data = await Promise.all(responses.map(res => res.json()));

    return {
      catData: data[0][0],    // API de Gatos retorna array
      numberData: data[1],    // API de Números
      jokeData: data[2]       // API de Piadas
    };
  } catch (error) {
    console.error("Erro ao buscar APIs:", error);
    throw error;
  }
}

export function displayAPIsData(apiData) {

    // Garante que o container existe
    if (!apiState.multiApiContainer) return;
    
    const resultsContainer = apiState.multiApiContainer.querySelector('#multi-api-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
        <div class="api-results">
            <div class="api-item">
                <h4>Gato Aleatório</h4>
                <img src="${apiData.catData.url}" alt="Gato aleatório" class="api-image">
            </div>
            <div class="api-item">
                <h4>Fato Numérico</h4>
                <p>${apiData.numberData.text}</p>
            </div>
            <div class="api-item">
                <h4>Piada de Pai</h4>
                <p>${apiData.jokeData.joke}</p>
                <button class="btn-remove-api">REMOVER APIS</button>
            </div>
        </div>
    `;

    resultsContainer.querySelector('.btn-remove-api').addEventListener('click', () => {
        resultsContainer.innerHTML = ''; // Limpa o conteúdo
    });

}

export function initAPIButton() {
  const btn = document.getElementById('enviarapis');
    if (btn) {
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            btn.value = 'Carregando...';
            
            try {
                const apiData = await fetchThreeAPIs();
                displayAPIsData(apiData);
            } catch (error) {
                const resultsContainer = apiState.multiApiContainer?.querySelector('#multi-api-results');
                if (resultsContainer) {
                    resultsContainer.innerHTML = '<p class="api-error">Erro ao carregar dados</p>';
                }
            } finally {
                btn.disabled = false;
                btn.value = 'Dados das APIS';
            }
        });
    }
}