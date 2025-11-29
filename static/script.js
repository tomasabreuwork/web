document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para as âncoras da navbar
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
    if (window.innerWidth <= 767) {
        heroVideo.querySelector('source').setAttribute('src', '../static/videos/background_mobile.mp4');
        heroVideo.load();
    }

    // Animação da seção "Sobre Mim"
    const aboutSection = document.querySelector('.about-me-section');
    const profilePhoto = document.querySelector('.profile-photo');
    const aboutText = document.querySelector('.about-text');

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

    // Animação de Experiência
    const experienciaSection = document.querySelector('.experiencia-section');
    const academicColumn = document.querySelector('.experiencia-column:nth-child(1)');
    const professionalColumn = document.querySelector('.experiencia-column:nth-child(2)');

    academicColumn.classList.add('academic-animate');
    professionalColumn.classList.add('professional-animate');

    const experienciaObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: window.innerWidth <= 767 ? 0.2 : 0.5
    };

    const experienciaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                academicColumn.classList.add('active');
                professionalColumn.classList.add('active');
            } else {
                academicColumn.classList.remove('active');
                professionalColumn.classList.remove('active');
            }
        });
    }, experienciaObserverOptions);

    experienciaObserver.observe(experienciaSection);

    // Animação de Artigos
    const artigosSection = document.querySelector('.artigos-section');
    const artigoBoxes = document.querySelectorAll('.artigo-box');

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

    // 🔹 NOVO: Animação da seção Certificados
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

    // Tela de carregamento
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.remove();
            });
        }
    });

    // Partículas de fundo
    document.querySelectorAll('.background-particles').forEach(createParticleCanvas);

    // 🆕 NOVO — Lógica de troca entre logotipos e cursos
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
            { nome: "DevOps & Agile Culture", horas: "30h", descricao: "Automação e metodologias ágeis." },
            { nome: "IA e Computacional", horas: "35h", descricao: "Machine Learning e redes neuronais." }
        ],
        udemy: [
            { nome: "Cyber Threat Intelligence", horas: "22h", descricao: "Estruturas de inteligência e OSINT." }
        ]
    };

    document.querySelectorAll(".cert-logo-card").forEach(card => {
        card.addEventListener("click", () => {
            const company = card.dataset.company;
            logosView.classList.add("hidden");
            coursesView.classList.remove("hidden");
            companyTitle.textContent = company.toUpperCase();

            coursesList.innerHTML = coursesData[company]
                .map(course => `
                    <div class="course-item">
                        <h4>${course.nome}</h4>
                        <p><strong>Horas:</strong> ${course.horas}</p>
                        <p>${course.descricao}</p>
                    </div>
                `).join("");
        });
    });

    backButton?.addEventListener("click", () => {
        coursesView.classList.add("hidden");
        logosView.classList.remove("hidden");
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
