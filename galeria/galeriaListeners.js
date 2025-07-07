import { galeriaElements } from './galeriaElements.js';
import { adicionarCard } from './galeriaFunctions.js';
export function initGaleriaListeners () {

    const form = document.getElementById('card-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Isso previne o refresh
        });
    }

    // ======== BOTÃO ADICIONAR CARD =========
    if (galeriaElements.addCardBtn) {
        galeriaElements.addCardBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            adicionarCard();
        });
    } 

    // =======RESTRIÇÃO LARGURA (100 a 400) ==========
    if (galeriaElements.cardWidth) {
        galeriaElements.cardWidth.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 100) value = 100;
            if (value > 400) value = 400;
            this.value = value;
        });
        
        galeriaElements.cardWidth.addEventListener('input', function() {
            if (parseInt(this.value) > 400) this.value = 400;
        });
    }

    // ========= RESTRIÇÃO ALTURA CARD (100 a 400) ===========
    if (galeriaElements.cardHeight) {
        galeriaElements.cardHeight.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 100) value = 100;
            if (value > 400) value = 400;
            this.value = value;
        });
        
        galeriaElements.cardHeight.addEventListener('input', function() {
            if (parseInt(this.value) > 400) this.value = 400;
        });
    }

    //============ RESTRIÇÃOO ESPAÇAMENTO (30px) =========
    if (galeriaElements.cardSpacing) {
        galeriaElements.cardSpacing.addEventListener('input', function() {
            this.value = Math.min(parseInt(this.value), 30);
        });
    }

    //============ RESTRIÇÃO BORDA (10px) ============
    if (galeriaElements.cardBorder) {
        galeriaElements.cardBorder.addEventListener('input', function() {
            const maxBorder = 10;
            if (parseInt(this.value) > maxBorder) {
                this.value = maxBorder;
                alert(`O valor máximo para a borda é ${maxBorder}px!`);
            }
        });
    }
}