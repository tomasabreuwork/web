document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // HAMBURGER MENU MOBILE
    // ============================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Fechar ao clicar num link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Rolagem suave para as âncoras da navbar
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Só faz scroll suave se for uma âncora interna (#)
            // Se for link para outra página (.html), deixa navegar normalmente
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Adiciona sombra à navbar ao descer a página
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-shadow');
        } else {
            navbar.classList.remove('navbar-shadow');
        }
    });

    // Troca o vídeo de fundo para mobile
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo && window.innerWidth <= 767) {
        heroVideo.querySelector('source').setAttribute('src', '../static/videos/background_mobile.mp4');
        heroVideo.load();
    }

    // Animação da secção "Sobre Mim"
    const aboutSection = document.querySelector('.about-me-section');
    const profilePhoto = document.querySelector('.profile-photo');
    const aboutText = document.querySelector('.about-text');

    if (aboutSection && profilePhoto && aboutText) {
        const aboutObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: window.innerWidth <= 767 ? 0.2 : 0.6
        };

        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    profilePhoto.classList.add('active');
                    aboutText.classList.add('active');
                } else {
                    profilePhoto.classList.remove('active');
                    aboutText.classList.remove('active');
                }
            });
        }, aboutObserverOptions);

        aboutObserver.observe(aboutSection);
    }

    // ============================
    // EXPERIENCIA TABS
    // ============================
    const expTabs = document.querySelectorAll('.exp-tab');
    const expPanels = document.querySelectorAll('.experiencia-panel');

    expTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Remove active de todos
            expTabs.forEach(t => t.classList.remove('active'));
            expPanels.forEach(p => {
                p.classList.remove('active');
                p.style.opacity = '0';
                p.style.transform = 'translateY(16px)';
            });

            // Ativa o selecionado
            tab.classList.add('active');
            const panel = document.getElementById(`panel-${target}`);
            if (panel) {
                panel.classList.add('active');
                // Força reflow para a transição funcionar
                panel.getBoundingClientRect();
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }
        });
    });

    // Animação de Artigos
    const artigosSection = document.querySelector('.artigos-section');
    const artigoBoxes = document.querySelectorAll('.artigo-box');

    if (artigosSection && artigoBoxes.length > 0) {
        const artigosObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: window.innerWidth <= 767 ? 0.2 : 0.5
        };

        const artigosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    artigoBoxes.forEach((box, index) => {
                        box.style.transitionDelay = window.innerWidth <= 767 ? '0s' : `${index * 0.1}s`;
                        box.classList.add('artigo-animate');
                    });
                } else {
                    artigoBoxes.forEach((box) => {
                        box.classList.remove('artigo-animate');
                        box.style.transitionDelay = '0s';
                    });
                }
            });
        }, artigosObserverOptions);

        artigosObserver.observe(artigosSection);
    }

    // Animação da secção Certificados
    const certificadosSection = document.querySelector('.certificados-section');
    const certLogoCards = document.querySelectorAll('.cert-logo-card');

    if (certificadosSection && certLogoCards.length > 0) {
        const certificadosObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: window.innerWidth <= 767 ? 0.2 : 0.5
        };

        const certificadosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    certLogoCards.forEach((card, index) => {
                        card.style.transitionDelay = window.innerWidth <= 767 ? '0s' : `${index * 0.07}s`;
                        card.classList.add('cert-logo-animate');
                    });
                } else {
                    certLogoCards.forEach(card => {
                        card.classList.remove('cert-logo-animate');
                        card.style.transitionDelay = '0s';
                    });
                }
            });
        }, certificadosObserverOptions);

        certificadosObserver.observe(certificadosSection);
    }

    // Animação de Contactos
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

    // Tela de carregamento com frase motivadora e barra de progresso
    const quotes = [
        { text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", author: "Robert Collier" },
        { text: "A disciplina é a ponte entre os objetivos e as conquistas.", author: "Jim Rohn" },
        { text: "Não tenhas medo de desistir do bom para perseguir o excelente.", author: "John D. Rockefeller" },
        { text: "O único modo de fazer um grande trabalho é amar o que fazes.", author: "Steve Jobs" },
        { text: "A coragem não é a ausência do medo, mas a decisão de que algo é mais importante.", author: "Ambrose Redmoon" }
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteTextEl = document.getElementById('loading-quote-text');
    const quoteAuthorEl = document.getElementById('loading-quote-author');
    if (quoteTextEl) quoteTextEl.textContent = `"${randomQuote.text}"`;
    if (quoteAuthorEl) quoteAuthorEl.textContent = `— ${randomQuote.author}`;

    const fill = document.getElementById('loading-fill');
    const percentEl = document.getElementById('loading-percent');
    const progressBar = document.querySelector('.loading-progress-bar');
    const enterBtn = document.getElementById('btn-enter-site');
    let progress = 0;

    const progressInterval = setInterval(() => {
        const step = progress < 70 ? Math.random() * 8 + 3 : Math.random() * 2 + 0.5;
        progress = Math.min(progress + step, 92);
        if (fill) fill.style.width = progress + '%';
        if (percentEl) percentEl.textContent = Math.floor(progress) + '%';
    }, 120);

    window.addEventListener('load', () => {
        clearInterval(progressInterval);

        // Completa a barra para 100%
        if (fill) fill.style.width = '100%';
        if (percentEl) percentEl.textContent = '100%';

        // Após 600ms substitui a barra pelo botão
        setTimeout(() => {
            if (progressBar) progressBar.style.opacity = '0';
            if (percentEl) percentEl.style.opacity = '0';

            setTimeout(() => {
                if (progressBar) progressBar.style.display = 'none';
                if (percentEl) percentEl.style.display = 'none';
                if (enterBtn) {
                    enterBtn.style.display = 'block';
                    // Força reflow para a transição funcionar
                    enterBtn.getBoundingClientRect();
                    enterBtn.classList.add('visible');
                }
            }, 400);
        }, 600);
    });

    // Fechar a loading screen ao clicar no botão — cortinas a abrir para os lados
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            const loadingScreen = document.getElementById('loading-screen');
            if (!loadingScreen) return;

            // Inicia a animação — conteúdo faz fade e cortinas abrem
            loadingScreen.classList.add('exit');

            // Remove o elemento depois da animação terminar (2.2s das cortinas)
            setTimeout(() => {
                loadingScreen.remove();
            }, 2300);
        });
    }

    // Animação dos títulos das sections separadoras
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

    // Partículas de fundo
    document.querySelectorAll('.background-particles').forEach(createParticleCanvas);

    // Lógica de troca entre logotipos e cursos
    const logosView = document.getElementById("logos-view");
    const coursesView = document.getElementById("courses-view");
    const companyTitle = document.getElementById("company-title");
    const coursesList = document.getElementById("courses-list");
    const backButton = document.querySelector(".back-button");

    const coursesData = {
        cisco: [
            { nome: "Cyber Threat Management", horas: "20h", descricao: "Gestão de ameaças e resposta a incidentes." }
        ],
        fiap: [
            { nome: "Cibersecurity", horas: "40h", descricao: "Fundamentos de proteção digital e redes." },
            { nome: "DevOps & Agile Culture", horas: "30h", descricao: "Automatização e metodologias ágeis." },
            { nome: "IA e Computacional", horas: "35h", descricao: "Machine Learning e redes neuronais." }
        ],
        udemy: [
            { nome: "Cyber Threat Intelligence", horas: "22h", descricao: "Estruturas de inteligência e OSINT." }
        ]
    };

    document.querySelectorAll(".cert-logo-card").forEach(card => {
        card.addEventListener("click", () => {
            const company = card.dataset.company;
            if (logosView) logosView.classList.add("hidden");
            if (coursesView) coursesView.classList.remove("hidden");
            if (companyTitle) companyTitle.textContent = company.toUpperCase();

            if (coursesList && coursesData[company]) {
                coursesList.innerHTML = coursesData[company]
                    .map(course => `
                        <div class="course-item">
                            <h4>${course.nome}</h4>
                            <p><strong>Horas:</strong> ${course.horas}</p>
                            <p>${course.descricao}</p>
                        </div>
                    `).join("");
            }
        });
    });

    backButton?.addEventListener("click", () => {
        if (coursesView) coursesView.classList.add("hidden");
        if (logosView) logosView.classList.remove("hidden");
    });

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');

            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = faqItem.classList.contains('active')
                ? answer.scrollHeight + "px"
                : null;
        });
    });

});


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