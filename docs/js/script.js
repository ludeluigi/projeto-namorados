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
            const heartCount = 20; // Quantidade de corações
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
                heart.style.animationDelay = Math.random() * 5 + 's';
                heartsContainer.appendChild(heart);
            }
        }
    }


    // --- LÓGICA DA PÁGINA DE SURPRESA (surpresa.html) ---
    const cardDeck = document.querySelector('.card-deck');
    if (cardDeck) {
        const audio = document.getElementById('backgroundMusic');
        const cards = Array.from(cardDeck.querySelectorAll('.card'));
        const nextButton = document.getElementById('nextCard');
        const prevButton = document.getElementById('prevCard');
        let currentIndex = 0;

        // ---- INÍCIO DA CORREÇÃO PARA MÚSICA NO IPHONE ----
        let musicStarted = false;
        function playMusic() {
            if (!musicStarted) {
                audio.play().catch(error => {
                    console.log("O navegador impediu o autoplay, esperando interação do usuário.", error);
                });
                musicStarted = true;
                // Remove o evento de clique do corpo para não tentar tocar de novo
                document.body.removeEventListener('click', playMusic);
            }
        }
        // Adiciona um "ouvinte" para o primeiro clique em qualquer lugar da página
        document.body.addEventListener('click', playMusic);
        // ---- FIM DA CORREÇÃO ----


        function updateCards() {
            // ... (o resto da função updateCards continua igual)
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
            // Tenta tocar a música no clique, caso ainda não tenha começado
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

        prevButton.addEventListener('click', () => {
             // Tenta tocar a música no clique, caso ainda não tenha começado
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