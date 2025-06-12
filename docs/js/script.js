document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    const surpriseButton = document.getElementById('surpriseButton');
    if (surpriseButton) {
        surpriseButton.addEventListener('click', function() {
            // CAMINHO CORRIGIDO E SIMPLIFICADO
            window.location.href = 'surpresa.html';
        });
    }

    // --- LÓGICA DA PÁGINA DE SURPRESA (surpresa.html) ---
    const cardDeck = document.querySelector('.card-deck');
    if (cardDeck) {
        const audio = document.getElementById('backgroundMusic');
        const cards = Array.from(cardDeck.querySelectorAll('.card'));
        const nextButton = document.getElementById('nextCard');
        const prevButton = document.getElementById('prevCard');
        let currentIndex = 0;
        let musicStarted = false;

        function playMusic() {
            if (!musicStarted && audio) {
                audio.play().catch(e => console.log("Navegador aguardando interação para tocar música."));
                musicStarted = true;
            }
        }
        // Adiciona um "ouvinte" para o primeiro clique ou toque
        document.body.addEventListener('click', playMusic, { once: true });
        document.body.addEventListener('touchstart', playMusic, { once: true });


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

        nextButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            playMusic(); 

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

        prevButton.addEventListener('click', (event) => {
            event.stopPropagation();
            playMusic();

            const finalSurprise = cards[cards.length - 1].querySelector('.final-surprise');
            if (finalSurprise && finalSurprise.classList.contains('triggered')) {
                finalSurprise.classList.remove('triggered');
                nextButton.style.display = 'inline-block';
            } else if (currentIndex > 0) {
                currentIndex--;
                updateCards();
            }
        });

        updateCards();
    }
});