// Respeita a preferência de movimento reduzido do sistema operativo
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            const isOpen = mobileMenu.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Fechar ao clicar num link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Rolagem suave para as âncoras da navbar
    document.querySelectorAll('.navbar-list a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Adiciona sombra à navbar ao descer + active link no scroll
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-list a');
    const sections = document.querySelectorAll('section[id]');
    const scrollThreshold = 50;

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` ||
                (current === 'experiencia' && href === '#experiencia-titulo') ||
                (current === 'artigos' && href === '#artigos-titulo') ||
                (current === 'contactos' && href === '#contactos-titulo')) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-shadow');
        } else {
            navbar.classList.remove('navbar-shadow');
        }
        updateActiveLink();
    });

    // Vídeo de fundo da hero: fonte adequada + fade-in suave (evita o "salto" inicial)
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        if (window.innerWidth <= 767) {
            heroVideo.querySelector('source').setAttribute('src', '../static/videos/background_mobile.mp4');
            heroVideo.load();
        }
        const showVideo = () => heroVideo.classList.add('ready');
        if (heroVideo.readyState >= 3) {
            showVideo();
        } else {
            heroVideo.addEventListener('canplay', showVideo, { once: true });
            heroVideo.addEventListener('loadeddata', showVideo, { once: true });
        }
        // Garantia: mostra sempre, mesmo que os eventos não disparem
        setTimeout(showVideo, 1500);
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

    // Tela de carregamento — apenas na primeira visita da sessão
    const loadingScreen = document.getElementById('loading-screen');
    const hasVisited = sessionStorage.getItem('site_visited');

    if (loadingScreen && !hasVisited) {
        // Marca a sessão como visitada
        sessionStorage.setItem('site_visited', '1');

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
        if (quoteAuthorEl) quoteAuthorEl.textContent = ` ${randomQuote.author}`;

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
            if (fill) fill.style.width = '100%';
            if (percentEl) percentEl.textContent = '100%';

            setTimeout(() => {
                if (progressBar) progressBar.style.opacity = '0';
                if (percentEl) percentEl.style.opacity = '0';

                setTimeout(() => {
                    if (progressBar) progressBar.style.display = 'none';
                    if (percentEl) percentEl.style.display = 'none';
                    if (enterBtn) {
                        enterBtn.style.display = 'block';
                        enterBtn.getBoundingClientRect();
                        enterBtn.classList.add('visible');
                    }
                }, 400);
            }, 600);
        });

        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                loadingScreen.classList.add('exit');
                setTimeout(() => loadingScreen.remove(), 2300);
            });
        }

    } else if (loadingScreen) {
        // Já visitou — remove instantaneamente sem animação
        loadingScreen.remove();
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

    // Partículas de fundo (desativadas com movimento reduzido)
    if (!prefersReducedMotion) {
        document.querySelectorAll('.background-particles').forEach(createParticleCanvas);
    }

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.toggle('active');
            button.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = isActive
                ? answer.scrollHeight + "px"
                : null;
        });
    });

    // Revelação suave do título da hero
    const heroTitleEl = document.querySelector('.hero-title');
    if (heroTitleEl && !prefersReducedMotion) {
        const runReveal = () => revealTitle(heroTitleEl);
        const ls = document.getElementById('loading-screen');
        const enterBtnEl = document.getElementById('btn-enter-site');

        const heroSubtitleEl = document.querySelector('.hero-subtitle');

        if (ls && enterBtnEl) {
            // Primeira visita: mantém título e subtítulo totalmente escondidos
            // enquanto as cortinas abrem (senão o heroFadeIn do CSS mostra-os por
            // detrás delas).
            heroTitleEl.style.animation = 'none';
            heroTitleEl.style.opacity = '0';
            heroTitleEl.style.transform = 'none';

            if (heroSubtitleEl) {
                heroSubtitleEl.style.animation = 'none';
                heroSubtitleEl.style.opacity = '0';
                heroSubtitleEl.style.transform = 'translateY(12px)';
                heroSubtitleEl.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
            }

            // Enquanto as cortinas ainda estão a abrir (transição de 2.2s em
            // .loading-curtain), o título começa a revelar-se letra a letra,
            // seguido do subtítulo.
            enterBtnEl.addEventListener('click', () => setTimeout(() => {
                heroTitleEl.style.opacity = '1';
                runReveal();
                if (heroSubtitleEl) {
                    setTimeout(() => {
                        heroSubtitleEl.style.opacity = '1';
                        heroSubtitleEl.style.transform = 'translateY(0)';
                    }, 600);
                }
            }, 1400));
        } else {
            // Visita repetida (sem loading screen): arranca de imediato
            runReveal();
        }
    }

    // Subtítulo rotativo da hero (respeita o idioma escolhido)
    const roleEl = document.querySelector('.hero-subtitle .role');
    if (roleEl) {
        const rolesByLang = {
            pt: ['Cibersegurança', 'Threat Intelligence', 'UI/UX'],
            en: ['Cybersecurity', 'Threat Intelligence', 'UI/UX'],
            es: ['Ciberseguridad', 'Threat Intelligence', 'UI/UX'],
            fr: ['Cybersécurité', 'Threat Intelligence', 'UI/UX'],
        };
        const getRoles = () => rolesByLang[localStorage.getItem('lang') || 'pt'] || rolesByLang.pt;
        let roleIdx = 0;
        roleEl.textContent = getRoles()[0];

        if (!prefersReducedMotion) {
            setInterval(() => {
                roleEl.classList.add('fading');
                setTimeout(() => {
                    roleIdx++;
                    const roles = getRoles();
                    roleEl.textContent = roles[roleIdx % roles.length];
                    roleEl.classList.remove('fading');
                }, 400);
            }, 3200);
        }
    }

});


// Revelação suave do título: cada letra faz fade + desfoca->foca + sobe ligeiramente
function revealTitle(el) {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? ' ' : ch;
        span.style.transitionDelay = `${i * 0.06}s`;
        el.appendChild(span);
    });
    // Força reflow e ativa a transição
    el.getBoundingClientRect();
    requestAnimationFrame(() => el.classList.add('reveal'));
}

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