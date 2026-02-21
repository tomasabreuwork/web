document.addEventListener('DOMContentLoaded', () => {
    // ✅ Esconde a tela de carregamento quando tudo estiver carregado
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.remove();
            });
        }
    });

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

    // ✅ Inicialização das partículas de fundo
    const particleCanvas = document.querySelector('.galeria-eventos-section .background-particles');
    if (particleCanvas) {
        createParticleCanvas(particleCanvas);
    }

    const contactosCanvas = document.querySelector('.contactos-section .background-particles');
    if (contactosCanvas) {
        createParticleCanvas(contactosCanvas);
    }

    // ✅ Animação para a seção de contactos
    const contactosSection = document.querySelector('.contactos-section');
    const contactosContent = document.querySelector('.contactos-content');

    if (contactosSection && contactosContent) {
        const contactosObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: window.innerWidth <= 767 ? 0.2 : 0.6
        };

        const contactosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactosContent.classList.add('active');
                } else {
                    contactosContent.classList.remove('active');
                }
            });
        }, contactosObserverOptions);

        contactosObserver.observe(contactosSection);
    }
});

// ✅ Função para criar canvas de partículas

function createParticleCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 50;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 1.2,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
}