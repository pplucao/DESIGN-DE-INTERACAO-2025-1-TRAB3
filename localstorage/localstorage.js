import { initHeaderListeners } from './header/headerListeners.js'
import { initMenuListeners } from './menu/menuListeners.js'
import { initGaleriaListeners } from './galeria/galeriaListeners.js'
import { initFormListeners } from './formulario/formularioListeners.js'
import { initFooterListeners } from './footer/footerListeners.js' 
import { initDogApi } from './apiInterativa/apiFunctions.js'
import { initAPIButton } from './dadosAPIS/apis.js'

export function setupLocalStorageControls() {
    // Elementos da UI
    const saveBtn = document.getElementById('saveToLocalStorage');
    const loadBtn = document.getElementById('loadFromLocalStorage');
    const clearBtn = document.getElementById('clearLocalStorage');
    const codeDisplay = document.getElementById('codeDisplay');
    const htmlCodeContent = document.getElementById('htmlCodeContent');
    const pagePreview = document.getElementById('pagePreview');

    if (!saveBtn || !loadBtn || !clearBtn || !codeDisplay || !htmlCodeContent || !pagePreview) {
        console.error('Elementos do LocalStorage não encontrados!');
        return;
    }

    // Função para salvar no LocalStorage
    saveBtn.addEventListener('click', () => {
        try {
            const pagePreviewContent = pagePreview.innerHTML;
            const fullHtmlCode = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Salva</title>
    <style>
        /* Seus estilos CSS podem ser incluídos aqui */
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        /* Adicione outros estilos necessários */
    </style>
</head>
<body>
${pagePreviewContent}
</body>
</html>`;

            localStorage.setItem('savedPage', fullHtmlCode);
            htmlCodeContent.textContent = fullHtmlCode;
            codeDisplay.style.display = 'block';
            
            showAlert('success', 'Página salva no LocalStorage!');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            showAlert('error', 'Erro ao salvar a página');
        }
    });

    // Função para carregar do LocalStorage
    loadBtn.addEventListener('click', () => {
        try {
            const savedCode = localStorage.getItem('savedPage');
            
            if (savedCode) {
                // Extrai o conteúdo do body preservando event listeners
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = savedCode;
                const bodyContent = tempDiv.querySelector('body').innerHTML;
                
                pagePreview.innerHTML = bodyContent;
                htmlCodeContent.textContent = savedCode;
                codeDisplay.style.display = 'block';

                // Reinicia todos os listeners
                setTimeout(() => {
                    initHeaderListeners();
                    initMenuListeners();
                    initGaleriaListeners();
                    initFormListeners();
                    initFooterListeners();
                    initDogApi();
                    initAPIButton();
                }, 300);
                
                showAlert('success', 'Página carregada com sucesso!');
            } else {
                showAlert('warning', 'Nenhuma página salva encontrada');
            }
        } catch (error) {
            console.error('Erro ao carregar:', error);
            showAlert('error', 'Erro ao carregar a página');
        }
    });

    // Função para limpar o LocalStorage
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('savedPage');
        codeDisplay.style.display = 'none';
        showAlert('info', 'LocalStorage limpo com sucesso!');
    });

    // Função auxiliar para mostrar alertas
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '10px 20px';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.color = 'white';
        alertDiv.style.zIndex = '1000';
        
        switch(type) {
            case 'success': alertDiv.style.background = '#4CAF50'; break;
            case 'error': alertDiv.style.background = '#f44336'; break;
            case 'warning': alertDiv.style.background = '#ff9800'; break;
            default: alertDiv.style.background = '#2196F3';
        }

        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
}
