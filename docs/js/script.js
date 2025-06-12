document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    const surpriseButton = document.getElementById('surpriseButton');
    const audioIndex = document.getElementById('backgroundMusic');

    if (surpriseButton) {
        surpriseButton.addEventListener('click', function() {
            // Tenta iniciar a música no primeiro clique
            if (audioIndex) {
                audioIndex.play().catch(e => console.error("Erro ao tocar áudio no index:", e));
            }
            // Redireciona para a página da surpresa
            window.location.href = '/projeto-namorados/docs/surpresa.html';
        });
    }


    // --- LÓGICA DA PÁGINA DE SURPRESA (surpresa.html) ---
    const cardDeck = document.querySelector('.card-deck');
    if (cardDeck) {
        const audioSurpresa = document.getElementById('backgroundMusic');
        const cards = Array.from(cardDeck.querySelectorAll('.card'));
        const nextButton = document.getElementById('nextCard');
        const prevButton = document.getElementById('prevCard');
        let currentIndex = 0;
        let musicStarted = false;

        function playMusic() {
            if (!musicStarted && audioSurpresa) {
                audioSurpresa.play().catch(e => console.error("Erro ao tocar áudio na surpresa:", e));
                musicStarted = true;
            }
        }

        function updateCards() {
            cards.forEach((card, index) => {
                card.classList.remove('active', 'gone', 'coming');
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index < currentIndex) {
                    card.classList.add('gone');
                } else {
                    card.classList.add('coming');
                }
            });
            prevButton.style.display = currentIndex === 0 ? 'none' : 'inline-block';
            nextButton.textContent = currentIndex === cards.length - 1 ? 'Surpresa Final ✨' : 'Próxima →';
        }

        nextButton.addEventListener('click', () => {
            playMusic(); // Garante que a música toque no primeiro clique de "próxima"

            const finalCard = cards[cards.length - 1];
            const finalSurprise = finalCard.querySelector('.final-surprise');

            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCards();
            } else if (finalSurprise && !finalSurprise.classList.contains('triggered')) {
                finalSurprise.classList.add('triggered');
                nextButton.style.display = 'none';
            }
        });

        prevButton.addEventListener('click', () => {
            playMusic(); // Garante que a música toque no primeiro clique de "anterior"

            const finalSurprise = cards[cards.length - 1].querySelector('.final-surprise');
            if (finalSurprise && finalSurprise.classList.contains('triggered')) {
                finalSurprise.classList.remove('triggered');
                nextButton.style.display = 'inline-block';
            } else if (currentIndex > 0) {
                currentIndex--;
                updateCards();
            }
        });

        // Inicia o baralho na primeira carta
        updateCards();
    }
});