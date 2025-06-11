document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    const surpriseButton = document.getElementById('surpriseButton');
    if (surpriseButton) {
        // Função do botão principal
        surpriseButton.addEventListener('click', function() {
            window.location.href = 'surpresa.html';
        });

        // Função para criar corações flutuantes
        const heartsContainer = document.querySelector('.hearts-container');
        if (heartsContainer) {
            const heartCount = 80; // Quantidade de corações
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Duração entre 5s e 10s
                heart.style.animationDelay = Math.random() * 2 + 's';
                heartsContainer.appendChild(heart);
            }
        }
    }


    // --- LÓGICA DA PÁGINA DE SURPRESA (surpresa.html) ---
    const cardDeck = document.querySelector('.card-deck');
    if (cardDeck) {
        const cards = Array.from(cardDeck.querySelectorAll('.card'));
        const nextButton = document.getElementById('nextCard');
        const prevButton = document.getElementById('prevCard');
        let currentIndex = 0;

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
            const finalCard = cards[cards.length - 1];
            const finalSurprise = finalCard.querySelector('.final-surprise');

            // Se não estamos na última carta, avança
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCards();
            } 
            // Se estamos na última carta e a surpresa ainda não foi ativada
            else if (finalSurprise && !finalSurprise.classList.contains('triggered')) {
                finalSurprise.classList.add('triggered');
                nextButton.style.display = 'none'; // Esconde o botão da surpresa
            }
        });

        prevButton.addEventListener('click', () => {
            const finalSurprise = cards[cards.length - 1].querySelector('.final-surprise');

            // Se a surpresa final está ativa, esconde ela e volta ao normal
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