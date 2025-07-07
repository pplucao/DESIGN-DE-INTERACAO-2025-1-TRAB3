import { pagePreview } from './pagePreview.js';
import { apiState } from './apiState.js';

export function criarAPIContainers() {
    // Container para API de Cachorro
    if (!apiState.dogApiContainer) {
        apiState.dogApiContainer = document.createElement('section');
        apiState.dogApiContainer.id = 'dog-api-section';
        apiState.dogApiContainer.className = 'api-section';
        apiState.dogApiContainer.innerHTML = `
            <div id="dog-api-results" class="api-results-container"></div>
        `;
        pagePreview.appendChild(apiState.dogApiContainer);
    }

    // Container para as 3 APIs
    if (!apiState.multiApiContainer) {
        apiState.multiApiContainer = document.createElement('section');
        apiState.multiApiContainer.id = 'multi-api-section';
        apiState.multiApiContainer.className = 'api-section';
        apiState.multiApiContainer.innerHTML = `
            <div id="multi-api-results" class="api-results-container"></div>
        `;
        pagePreview.appendChild(apiState.multiApiContainer);
    }
}
