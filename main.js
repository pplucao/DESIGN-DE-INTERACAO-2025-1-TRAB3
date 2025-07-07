import { pagePreview, initPagePreview } from './pagePreview.js';
import { criarHeader } from './header/headerFunctions.js';
import { initHeaderListeners } from './header/headerListeners.js';
import { initMenuListeners } from './menu/menuListeners.js';
import { criarMenu } from './menu/menuFunctions.js';
import { criarGaleria } from './galeria/galeriaFunctions.js';
import { initGaleriaListeners } from './galeria/galeriaListeners.js';
import { criarFormulario } from './formulario/formularioFunctions.js';
import { initFormListeners } from './formulario/formularioListeners.js';
import { initDogApi } from './apiInterativa/apiFunctions.js';
import { initAPIButton } from './dadosAPIS/apis.js';
import { criarAPIContainers } from './apiContainers.js';
import { criarFooter } from './footer/footerFunctions.js';
import { initFooterListeners } from './footer/footerListeners.js';
import { setupLocalStorageControls } from './localstorage/localstorage.js';

document.addEventListener('DOMContentLoaded', async () => {

    initPagePreview();
    
    // Verificação robusta do pagePreview
    if (!initPagePreview()) {
        console.error('Erro: pagePreview não inicializado!');
        return; // Impede a execução do resto do código
    }


    await criarHeader();
    await criarMenu();
    await criarGaleria();
    await criarFormulario();

    criarAPIContainers();


    await criarFooter();

    setupLocalStorageControls();

    //pequeno delay para garantir que o DOM está pronto
    await new Promise(resolve => setTimeout(resolve, 50));

    initHeaderListeners();
    initMenuListeners();
    initGaleriaListeners();
    initFormListeners();
    initDogApi();        // Agora os elementos já existem
    initAPIButton();     // Agora os elementos já existem
    initFooterListeners();
    
    console.log('Aplicação inicializada com sucesso!');
});
