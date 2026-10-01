/**
 * MODELO SDD - SOFTWARE DESIGN DOCUMENT / SYSTEM DRIVEN DESIGN
 * 
 * Este arquivo é a fonte central de dados estruturados do portfólio.
 * Todas as informações como dados pessoais, contatos, habilidades e projetos
 * estão centralizadas e organizadas sob a arquitetura SDD.
 */

const portfolioData = {
    // 1. DADOS PESSOAIS
    personal: {
        name: "Eduino Francisco",
        title: "Desenvolvedor Full Stack & UI/UX Designer",
        bio: "Desenvolvedor de software focado no modelo SDD (Software Design Document). Crio sistemas web robustos, escaláveis e eficientes com arquitetura limpa, código sustentável e interfaces humanas intuitivas.",
        location: "Benguela, Angola",
        email: "eduinocacuata@gmail.com",
        phone: "940690728",
        phoneFormatted: "+244 940 690 728",
        whatsapp: "244940690728",
        avatar: "assets/images/Eduino.jpg",
        availability: "Disponível para novos projetos, consultoria e freelancers",
        sddOverview: "Modelo SDD (Software Design Document): Estrutura de desenvolvimento orientada a especificações rigorosas, arquitetura limpa e documentação técnica precisa.",
        stats: [
            { label: "Anos de Experiência", value: "3+" },
            { label: "Projetos SDD Concluídos", value: "15+" },
            { label: "Sistemas em Produção", value: "10+" },
            { label: "Taxa de Satisfação", value: "100%" }
        ]
    },

    // 2. REDES SOCIAIS E CONTATOS
    socials: [
        {
            name: "GitHub",
            icon: "fab fa-github",
            url: "https://github.com",
            description: "Repositórios com arquitetura SDD e projetos Open Source"
        },
        {
            name: "LinkedIn",
            icon: "fab fa-linkedin-in",
            url: "https://linkedin.com",
            description: "Conexões profissionais e histórico de carreira"
        },
        {
            name: "WhatsApp",
            icon: "fab fa-whatsapp",
            url: "https://wa.me/244940690728",
            description: "Contacto rápido via WhatsApp: 940690728"
        },
        {
            name: "Email",
            icon: "far fa-envelope",
            url: "mailto:eduinocacuata@gmail.com",
            description: "Envie um e-mail direto para eduinocacuata@gmail.com"
        }
    ],

    // 3. HABILIDADES TÉCNICAS (SKILLS)
    skills: [
        { name: "HTML5 / CSS3 Avançado", category: "Frontend", level: 95, icon: "fab fa-html5", desc: "Layouts semânticos, acessíveis e responsivos" },
        { name: "JavaScript (ES6+ / TypeScript)", category: "Frontend", level: 90, icon: "fab fa-js", desc: "Desenvolvimento modular, assíncrono e moderno" },
        { name: "React & Next.js", category: "Frontend", level: 85, icon: "fab fa-react", desc: "Aplicações de alto desempenho e arquitetura por componentes" },
        { name: "Node.js & Express", category: "Backend", level: 82, icon: "fab fa-node-js", desc: "Construção de APIs RESTful e arquitetura baseada em eventos" },
        { name: "Python & Django/FastAPI", category: "Backend", level: 78, icon: "fab fa-python", desc: "Automação, scripts e serviços de backend escaláveis" },
        { name: "Bancos de Dados (SQL & NoSQL)", category: "Database", level: 80, icon: "fas fa-database", desc: "Modelagem relacional, otimização de queries e relatórios" },
        { name: "Engenharia de Software (SDD)", category: "Arquitetura", level: 88, icon: "fas fa-sitemap", desc: "Especificação de requisitos, casos de uso e documentos SDD" },
        { name: "Git, GitHub & CI/CD", category: "Ferramentas", level: 88, icon: "fab fa-git-alt", desc: "Controle de versão rigoroso e automação de builds" },
        { name: "UI/UX & Design Systems", category: "Design", level: 85, icon: "fab fa-figma", desc: "Prototipagem realista, acessibilidade e componentes reutilizáveis" }
    ],

    // 4. CATEGORIAS DE PROJETOS PARA FILTRO
    projectCategories: [
        { id: "todos", label: "Todos os Projetos" },
        { id: "web", label: "Web Applications" },
        { id: "mobile", label: "Mobile Apps" },
        { id: "sdd", label: "Arquitetura SDD" }
    ],

    // 5. PROJETOS COM ESPECIFICAÇÃO SDD
    projects: [
        {
            id: 1,
            title: "Sistema Analítico de Vendas & Gestão",
            category: "web",
            categoryLabel: "Web App",
            shortDescription: "Plataforma empresarial de gestão analítica com gráficos em tempo real e arquitetura SDD.",
            fullDescription: "Desenvolvimento de um sistema completo de gestão de vendas e indicadores comerciais. O projeto seguiu rigorosamente o modelo SDD (Software Design Document), garantindo modularidade, facilidade de manutenção e segurança nos dados.",
            image: "assets/images/project1.png",
            tags: ["Modelo SDD", "JavaScript", "Chart.js", "REST API"],
            featured: true,
            demoUrl: "#",
            githubUrl: "#",
            sddDocUrl: "#",
            details: [
                "Documentação SDD completa incluindo diagramas de fluxo de dados",
                "Interface limpa e profissional com suporte nativo a Dark/Light Mode",
                "Gráficos dinâmicos de desempenho comercial e relatórios exportáveis"
            ]
        },
        {
            id: 2,
            title: "Aplicação Mobile de E-Commerce",
            category: "mobile",
            categoryLabel: "Mobile",
            shortDescription: "Interface nativa otimizada para compras com catálogo interativo e fluxo checkout intuitivo.",
            fullDescription: "Aplicativo móvel focado em proporcionar uma experiência de compra ágil, limpa e segura. O fluxo do utilizador foi especificado previamente no documento SDD antes da implementação do código.",
            image: "assets/images/project2.png",
            tags: ["JavaScript", "UI/UX Realista", "Mobile First", "Modelo SDD"],
            featured: true,
            demoUrl: "#",
            githubUrl: "#",
            sddDocUrl: "#",
            details: [
                "Arquitetura focada na otimização de performance mobile",
                "Carrinho de compras interativo com validação dinâmica",
                "Integração de pagamentos com tratamento transparente de erros"
            ]
        },
        {
            id: 3,
            title: "Plataforma de Especificação & Gestão SDD",
            category: "sdd",
            categoryLabel: "Arquitetura SDD",
            shortDescription: "Ferramenta para criação, validação e manutenção de documentos de Software Design (SDD).",
            fullDescription: "Sistema construído especificamente para gerir o ciclo de vida de especificações de software. Permite a desenvolvedores e gestores estruturar módulos, diagramas de sequência e especificações de API segundo o modelo SDD.",
            image: "assets/images/project3.png",
            tags: ["Modelo SDD", "Engenharia de Software", "JavaScript", "Arquitetura Limpa"],
            featured: true,
            demoUrl: "#",
            githubUrl: "#",
            sddDocUrl: "#",
            details: [
                "Modelagem de requisitos funcionais e não-funcionais",
                "Exportação de documentos SDD em formato padronizado",
                "Visualização realista de diagramas de arquitetura de software"
            ]
        }
    ]
};

// Tornar os dados globalmente acessíveis
window.portfolioData = portfolioData;
