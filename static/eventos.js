document.addEventListener('DOMContentLoaded', () => {
    // ✅ Animação do título da hero section de eventos
    const sectionTitles = document.querySelectorAll('.section-hero-title');
    if (sectionTitles.length > 0) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.4 });
        sectionTitles.forEach(title => titleObserver.observe(title));
    }

    // ✅ Tela de carregamento — remove sempre (eventos não é a primeira página)
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.remove();

    // ✅ Adiciona sombra à navbar ao descer a página
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('navbar-shadow');
            } else {
                navbar.classList.remove('navbar-shadow');
            }
        });
    }

    // ✅ Animação de entrada dos cards de eventos
    const eventoCards = document.querySelectorAll('.evento-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const eventoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay progressivo para cada card
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // 100ms de delay entre cada card
            }
        });
    }, observerOptions);

    eventoCards.forEach(card => {
        eventoObserver.observe(card);
    });

    // As partículas de fundo são criadas pelo script.js (evita duplicação)
});