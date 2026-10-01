/**
 * APLICAÇÃO PRINCIPAL - RENDERIZAÇÃO E LÓGICA DO PORTFÓLIO MULTI-PÁGINA (MODELO SDD)
 * 
 * Consome `window.portfolioData` e gerencia a interatividade em todas as páginas.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Verificar dados do Modelo SDD
    if (!window.portfolioData) {
        console.error("Erro: portfolioData (Modelo SDD) não foi encontrado.");
        return;
    }

    const data = window.portfolioData;

    // Inicializar módulos comuns e específicos por página
    initThemeToggle();
    initMobileMenu();
    initScrollHeader();
    highlightActivePageNav();

    // Renderizadores seguros (apenas executam se os elementos existirem na página atual)
    renderHero(data.personal, data.socials);
    renderAbout(data.personal);
    renderSkills(data.skills);
    renderProjectFilters(data.projectCategories);
    renderProjects(data.projects);
    renderContactInfo(data.personal, data.socials);
    initContactForm();
});

/* ==========================================================================
   0. NAVEGAÇÃO MULTI-PÁGINA & NAVEGADOR
   ========================================================================== */
function highlightActivePageNav() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================================================
   1. HERO SECTION (INÍCIO & PERFIL)
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
        heroAvatar.alt = `Foto de Perfil de ${personal.name}`;
    }

    if (heroLocation) {
        heroLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${personal.location} &nbsp;|&nbsp; <i class="fas fa-check-circle" style="color:#10b981;"></i> ${personal.availability}`;
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
   2. SOBRE MIM & ARQUITETURA SDD
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
                        <span style="font-size:0.8rem; color:var(--text-dim);">${skill.category}</span>
                    </div>
                </div>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            ${skill.desc ? `<p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">${skill.desc}</p>` : ''}
            <div class="skill-bar">
                <div class="skill-progress" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');

    // Animação das barras ao entrar na visualização
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-level') + '%';
                });
            }
        });
    }, { threshold: 0.1 });

    observer.observe(skillsGrid);
}

/* ==========================================================================
   4. PROJETOS (FILTROS E CARDS SDD)
   ========================================================================== */
function renderProjectFilters(categories) {
    const filterContainer = document.getElementById('portfolio-filters');
    if (!filterContainer) return;

    filterContainer.innerHTML = categories.map((cat, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

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
        projectsGrid.innerHTML = `<p style="text-align:center; grid-column:1/-1; color:var(--text-muted); padding:2rem;">Nenhum projeto encontrado nesta categoria.</p>`;
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
                        Ver Especificação SDD <i class="fas fa-arrow-right"></i>
                    </button>
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
   5. MODAL DE ESPECIFICAÇÃO SDD DO PROJETO
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
        <p style="color:var(--text-muted); line-height:1.7; margin-bottom:1.5rem;">${project.fullDescription}</p>
        
        <h4 style="margin-bottom:0.75rem; font-size:1.05rem; font-weight:700;">Especificações & Recursos Técnicos (SDD):</h4>
        <ul class="modal-list" style="margin-bottom:1.5rem;">
            ${project.details ? project.details.map(item => `
                <li style="display:flex; align-items:flex-start; gap:0.5rem; margin-bottom:0.5rem; color:var(--text-main);">
                    <i class="fas fa-check-circle" style="color:var(--accent-primary); margin-top:3px;"></i>
                    <span>${item}</span>
                </li>
            `).join('') : ''}
        </ul>

        <div class="project-tags" style="margin-bottom:1.5rem;">
            ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <a href="contacto.html" class="btn btn-primary" style="flex:1;"><i class="far fa-paper-plane"></i> Solicitar Demo / Projeto</a>
            <button class="btn btn-outline" onclick="closeProjectModal()"><i class="fas fa-times"></i> Fechar</button>
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
   6. CONTATO E INFORMAÇÕES DE COMUNICAÇÃO
   ========================================================================== */
function renderContactInfo(personal, socials) {
    const contactList = document.getElementById('contact-info-list');
    if (!contactList) return;

    contactList.innerHTML = `
        <div class="contact-item" onclick="copyToClipboard('${personal.email}', 'E-mail eduinocacuata@gmail.com copiado!')" style="cursor:pointer;" title="Clique para copiar e-mail">
            <div class="contact-icon"><i class="far fa-envelope"></i></div>
            <div class="contact-details">
                <h4>Endereço de E-mail (Clique para copiar)</h4>
                <p>${personal.email}</p>
            </div>
        </div>

        <div class="contact-item" onclick="copyToClipboard('${personal.phone}', 'Número 940690728 copiado!')" style="cursor:pointer;" title="Clique para copiar telefone">
            <div class="contact-icon"><i class="fas fa-phone-alt"></i></div>
            <div class="contact-details">
                <h4>Telefone / Telemóvel</h4>
                <p>${personal.phoneFormatted} (${personal.phone})</p>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="contact-details">
                <h4>Localização</h4>
                <p>${personal.location}</p>
            </div>
        </div>

        <a href="https://wa.me/${personal.whatsapp}" target="_blank" rel="noopener noreferrer" class="contact-item">
            <div class="contact-icon" style="background:rgba(16, 185, 129, 0.12); border-color:rgba(16, 185, 129, 0.3); color:#10b981;">
                <i class="fab fa-whatsapp"></i>
            </div>
            <div class="contact-details">
                <h4>Conversar no WhatsApp</h4>
                <p>Enviar mensagem direta para ${personal.phone}</p>
            </div>
        </a>
    `;
}

/* ==========================================================================
   7. FORMULÁRIO DE CONTATO
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

        showToast(`Mensagem enviada com sucesso por ${name}! Obrigado pelo contato.`, 'success');
        form.reset();
    });
}

/* ==========================================================================
   8. NOTIFICAÇÕES TOAST & CÓPIA
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
    }).catch(() => {
        showToast('Não foi possível copiar automaticamente.', 'warning');
    });
};

/* ==========================================================================
   9. INTERFACE: TEMA, MENU MOBILE & HEADER SCROLL
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

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
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

