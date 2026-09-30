/**
 * APLICAÇÃO PRINCIPAL - RENDERIZAÇÃO E LÓGICA DO PORTFÓLIO
 * 
 * Utiliza a técnica SSD (Single Source of Data) consumindo `window.portfolioData`.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Verificar se os dados do SSD foram carregados
    if (!window.portfolioData) {
        console.error("Erro: portfolioData (SSD) não foi encontrado.");
        return;
    }

    const data = window.portfolioData;

    // Inicializar todos os módulos
    initThemeToggle();
    renderHero(data.personal, data.socials);
    renderAbout(data.personal);
    renderSkills(data.skills);
    renderProjectFilters(data.projectCategories);
    renderProjects(data.projects);
    renderContactInfo(data.personal, data.socials);
    initContactForm();
    initMobileMenu();
    initScrollHeader();
});

/* ==========================================================================
   1. HERO SECTION & DADOS PESSOAIS
   ========================================================================== */
function renderHero(personal, socials) {
    const heroTitle = document.getElementById('hero-title');
    const heroBio = document.getElementById('hero-bio');
    const heroAvatar = document.getElementById('hero-avatar');
    const heroSocials = document.getElementById('hero-socials');
    const heroLocation = document.getElementById('hero-location');

    if (heroTitle) {
        heroTitle.innerHTML = `Olá, eu sou <br><span class="gradient-text">${personal.name}</span>`;
    }

    if (heroBio) {
        heroBio.textContent = personal.bio;
    }

    if (heroAvatar) {
        heroAvatar.src = personal.avatar;
        heroAvatar.alt = personal.name;
    }

    if (heroLocation) {
        heroLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${personal.location}`;
    }

    if (heroSocials) {
        heroSocials.innerHTML = socials.map(social => `
            <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="${social.name}: ${social.description}">
                <i class="${social.icon}"></i>
            </a>
        `).join('');
    }
}

/* ==========================================================================
   2. SOBRE MIM & ESTATÍSTICAS
   ========================================================================== */
function renderAbout(personal) {
    const statsContainer = document.getElementById('stats-grid');
    if (statsContainer && personal.stats) {
        statsContainer.innerHTML = personal.stats.map(stat => `
            <div class="stat-card">
                <div class="stat-number">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }
}

/* ==========================================================================
   3. HABILIDADES TÉCNICAS (SKILLS)
   ========================================================================== */
function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <div class="skill-info">
                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div>
                        <div class="skill-name">${skill.name}</div>
                        <span style="font-size:0.75rem; color:var(--text-dim);">${skill.category}</span>
                    </div>
                </div>
                <span style="font-weight:700; font-size:0.9rem; color:var(--accent-secondary);">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');

    // Animação das barras de progresso ao rolar a página
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-level') + '%';
                });
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsGrid);
}

/* ==========================================================================
   4. PROJETOS (FILTROS E CARDS SSD)
   ========================================================================== */
function renderProjectFilters(categories) {
    const filterContainer = document.getElementById('portfolio-filters');
    if (!filterContainer) return;

    filterContainer.innerHTML = categories.map((cat, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    // Adicionar escutadores de evento para os botões de filtro
    const filterBtns = filterContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    if (projects.length === 0) {
        projectsGrid.innerHTML = `<p style="text-align:center; grid-column:1/-1; color:var(--text-muted);">Nenhum projeto encontrado.</p>`;
        return;
    }

    projectsGrid.innerHTML = projects.map(proj => `
        <div class="project-card" data-category="${proj.category}">
            <div class="project-img-wrapper">
                <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                <span class="project-badge">${proj.categoryLabel}</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.shortDescription}</p>
                <div class="project-tags">
                    ${proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <button class="btn-link" onclick="openProjectModal(${proj.id})">
                        Ver Detalhes <i class="fas fa-arrow-right"></i>
                    </button>
                    ${proj.demoUrl !== '#' ? `<a href="${proj.demoUrl}" target="_blank" class="btn-icon" title="Ver Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function filterProjects(category) {
    const projects = window.portfolioData.projects;
    if (category === 'todos') {
        renderProjects(projects);
    } else {
        const filtered = projects.filter(p => p.category === category);
        renderProjects(filtered);
    }
}

/* ==========================================================================
   5. MODAL DE DETALHES DO PROJETO
   ========================================================================== */
window.openProjectModal = function(projectId) {
    const project = window.portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalOverlay = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-card-content');

    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeProjectModal()"><i class="fas fa-times"></i></button>
        <img src="${project.image}" alt="${project.title}" class="modal-img">
        <span class="project-badge" style="position:static; display:inline-block; margin-bottom:0.75rem;">${project.categoryLabel}</span>
        <h2 class="modal-title">${project.title}</h2>
        <p style="color:var(--text-muted); line-height:1.7;">${project.fullDescription}</p>
        
        <h4 style="margin-top:1.5rem; margin-bottom:0.5rem; font-size:1.05rem;">Principais Recursos:</h4>
        <ul class="modal-list">
            ${project.details ? project.details.map(item => `<li><i class="fas fa-check-circle" style="color:var(--accent-secondary); margin-right:0.5rem;"></i> ${item}</li>`).join('') : ''}
        </ul>

        <div style="margin-top:1.5rem;" class="project-tags">
            ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>

        <div style="margin-top:2rem; display:flex; gap:1rem;">
            <a href="${project.demoUrl}" class="btn btn-primary" style="flex:1;"><i class="fas fa-external-link-alt"></i> Ver Projeto Ao Vivo</a>
            <a href="${project.githubUrl}" class="btn btn-outline"><i class="fab fa-github"></i> Código Fonte</a>
        </div>
    `;

    modalOverlay.classList.add('active');
};

window.closeProjectModal = function() {
    const modalOverlay = document.getElementById('project-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
};

/* ==========================================================================
   6. CONTATO E REDES SOCIAIS (SSD)
   ========================================================================== */
function renderContactInfo(personal, socials) {
    const contactList = document.getElementById('contact-info-list');
    if (!contactList) return;

    contactList.innerHTML = `
        <div class="contact-item" onclick="copyToClipboard('${personal.email}', 'Email copiado!')" style="cursor:pointer;" title="Clique para copiar">
            <div class="contact-icon"><i class="far fa-envelope"></i></div>
            <div class="contact-details">
                <h4>Enviar E-mail (Clique para copiar)</h4>
                <p>${personal.email}</p>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-phone-alt"></i></div>
            <div class="contact-details">
                <h4>Telefone / Celular</h4>
                <p>${personal.phone}</p>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="contact-details">
                <h4>Localização</h4>
                <p>${personal.location}</p>
            </div>
        </div>

        <a href="${socials.find(s => s.name === 'WhatsApp')?.url || '#'}" target="_blank" class="contact-item">
            <div class="contact-icon" style="background:rgba(16, 185, 129, 0.15); border-color:rgba(16, 185, 129, 0.3); color:#10b981;">
                <i class="fab fa-whatsapp"></i>
            </div>
            <div class="contact-details">
                <h4>Conversar no WhatsApp</h4>
                <p>Iniciar conversa direta</p>
            </div>
        </a>
    `;
}

/* ==========================================================================
   7. FORMULÁRIO DE CONTATO E INTERAÇÃO
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            showToast('Por favor, preencha todos os campos do formulário.', 'warning');
            return;
        }

        // Simular envio bem-sucedido
        showToast('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        form.reset();
    });
}

/* ==========================================================================
   8. UTILITÁRIOS: TOAST NOTIFICATIONS & COPY
   ========================================================================== */
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}" style="color:${type === 'success' ? '#10b981' : '#f59e0b'}; font-size:1.2rem;"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

window.copyToClipboard = function(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'Copiado para a área de transferência!');
    }).catch(err => {
        showToast('Não foi possível copiar automaticamente.', 'warning');
    });
};

/* ==========================================================================
   9. INTERFACE: MENU MOBILE, TEMA & HEADER SCROLL
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    // Verificar tema salvo
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
}

function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggleBtn.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Fechar ao clicar num link
        const links = navMenu.querySelectorAll('.nav-link');
        links.forEach(l => {
            l.addEventListener('click', () => {
                navMenu.classList.remove('active');
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

function initScrollHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
}
