/**
 * TÉCNICA SSD - SINGLE SOURCE OF DATA (Fonte Única de Dados)
 * 
 * Este arquivo é a ÚNICA fonte de dados do seu portfólio.
 * Todas as informações como dados pessoais, contatos, habilidades e projetos
 * estão centralizadas aqui. Para atualizar qualquer conteúdo no site,
 * basta modificar as propriedades deste objeto!
 */

const portfolioData = {
    // 1. DADOS PESSOAIS
    personal: {
        name: "Eduino Francisco",
        title: "Desenvolvedor Full Stack & UI/UX Designer",
        bio: "Desenvolvedor apaixonado por criar experiências digitais modernas, eficientes e escaláveis. Especializado no desenvolvimento de aplicações web intuitivas com design elegante e código limpo.",
        location: "Luanda, Angola",
        email: "eduino.francisco@exemplo.com",
        phone: "+244 923 000 000",
        whatsapp: "244923000000",
        avatar: "assets/images/profile.png",
        availability: "Disponível para novos projetos e freelancers",
        stats: [
            { label: "Anos de Experiência", value: "3+" },
            { label: "Projetos Concluídos", value: "15+" },
            { label: "Clientes Satisfeitos", value: "10+" }
        ]
    },

    // 2. REDES SOCIAIS E CONTATOS
    socials: [
        {
            name: "GitHub",
            icon: "fab fa-github",
            url: "https://github me",
            description: "Confira meus repositórios e código fonte"
        },
        {
            name: "LinkedIn",
            icon: "fab fa-linkedin-in",
            url: "https://linkedin.com",
            description: "Conecte-se profissionalmente"
        },
        {
            name: "WhatsApp",
            icon: "fab fa-whatsapp",
            url: "https://wa.me/244923000000",
            description: "Envie uma mensagem direta"
        },
        {
            name: "Email",
            icon: "far fa-envelope",
            url: "mailto:eduino.francisco@exemplo.com",
            description: "Respondo em até 24 horas"
        }
    ],

    // 3. HABILIDADES TÉCNICAS (SKILLS)
    skills: [
        { name: "HTML5 / CSS3", category: "Frontend", level: 95, icon: "fab fa-html5" },
        { name: "JavaScript (ES6+)", category: "Frontend", level: 90, icon: "fab fa-js" },
        { name: "React / Next.js", category: "Frontend", level: 85, icon: "fab fa-react" },
        { name: "Node.js", category: "Backend", level: 80, icon: "fab fa-node-js" },
        { name: "Python", category: "Backend", level: 75, icon: "fab fa-python" },
        { name: "SQL & NoSQL", category: "Database", level: 80, icon: "fas fa-database" },
        { name: "Git & GitHub", category: "Ferramentas", level: 88, icon: "fab fa-git-alt" },
        { name: "UI/UX & Figma", category: "Design", level: 85, icon: "fab fa-figma" }
    ],

    // 4. CATEGORIAS DE PROJETOS PARA FILTRO
    projectCategories: [
        { id: "todos", label: "Todos" },
        { id: "web", label: "Web Apps" },
        { id: "mobile", label: "Mobile" },
        { id: "ai", label: "IA & Ferramentas" }
    ],

    // 5. PROJETOS EM QUE JÁ PARTICIPOU
    projects: [
        {
            id: 1,
            title: "Painel Analítico de Vendas (Dashboard)",
            category: "web",
            categoryLabel: "Web App",
            shortDescription: "Plataforma de gestão analítica em tempo real com gráficos interativos e relatórios.",
            fullDescription: "Desenvolvimento de um dashboard administrativo completo para monitoramento de vendas, métricas de clientes e relatórios financeiros em tempo real. Implementado com métricas visuais avançadas e modo escuro nativo.",
            image: "assets/images/project1.png",
            tags: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
            featured: true,
            demoUrl: "#",
            githubUrl: "#",
            details: [
                "Interface responsiva com suporte a Dark/Light Mode",
                "Gráficos dinâmicos de desempenho e conversão",
                "Exportação de relatórios em PDF e Excel"
            ]
        },
        {
            id: 2,
            title: "Aplicação Mobile de E-Commerce",
            category: "mobile",
            categoryLabel: "Mobile",
            shortDescription: "Interface intuitiva para loja virtual com carrinho dinâmico e fluxo de checkout.",
            fullDescription: "Aplicativo móvel focado em proporcionar uma experiência de compra ágil e moderna. Possui catálogo categorizado, busca em tempo real, carrinho de compras sincronizado e integração de pagamentos.",
            image: "assets/images/project2.png",
            tags: ["JavaScript", "UI/UX", "CSS Grid", "Mobile First"],
            featured: true,
            demoUrl: "#",
            githubUrl: "#",
            details: [
                "Navegação otimizada para dispositivos móveis",
                "Carrinho interativo com cálculo automático de total",
                "Filtro rápido por categorias de produtos"
            ]
        },
        {
            id: 3,
            title: "Plataforma de Assistência com IA",
            category: "ai",
            categoryLabel: "IA & Ferramentas",
            shortDescription: "Ferramenta interativa de geração de conteúdo e análise com inteligência artificial.",
            fullDescription: "Sistema SaaS Web moderno para geração automatizada de textos, sugestões de código e automação de atendimento. Utiliza design glassmorphism com micro-animações elegantes.",
            image: "assets/images/project3.png",
            tags: ["JavaScript", "CSS Glassmorphism", "REST API", "AI Integration"],
            featured: true,
            demoUrl: "#",
            githubUrl: "#",
            details: [
                "Integração com APIs de Modelos de Linguagem",
                "Histórico de conversas salvo localmente",
                "Tema futurista com alto contraste e acessibilidade"
            ]
        }
    ]
};

// Tornar os dados globalmente acessíveis
window.portfolioData = portfolioData;
