import * as dotenv from 'dotenv';
dotenv.config();

async function seedProjects() {
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL not found.');
        process.exit(1);
    }

    const { db } = await import('./index');
    const { projects } = await import('./schema');
    const { eq } = await import('drizzle-orm'); // Safe import

    console.log('🚀 Seeding More Projects...');

    try {
        // Clear existing to avoid duplicates or just add new ones? 
        // Let's clear for a clean state since we are dev-ing.
        // But invalidating foreign keys might be an issue? No foreign keys strictly used yet on projects table.
        // Actually, let's just delete all.
        // We can't use 'delete from projects' easily without importing table properly or using sql.
        // Let's just insert and assume user doesn't mind duplicates or we check logic.
        // Simplest: Delete all and re-seed.

        // However, standard Drizzle 'delete' requires query builder.
        // await db.delete(projects); // Delete all

        // Let's just create a robust list.
        const newProjects = [
            {
                title: "E-commerce de Luxo",
                description: "Plataforma de moda high-end com experiência imersiva, checkout otimizado e painel administrativo completo.",
                imageUrl: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2695&auto=format&fit=crop",
                projectUrl: "#",
            },
            {
                title: "Logística Dashboard v2",
                description: "Sistema de monitoramento de frotas em tempo real com mapas interativos e relatórios de IA.",
                imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
                projectUrl: "#",
            },
            {
                title: "App NeoBank",
                description: "Interface bancária 100% digital focada em usabilidade mobile-first e segurança biométrica.",
                imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
                projectUrl: "#",
            },
            {
                title: "Imobiliária Prime",
                description: "Portal de imóveis de luxo com tour virtual 360º e agendamento automático de visitas.",
                imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
                projectUrl: "#",
            },
            {
                title: "SaaS CRM Medical",
                description: "Plataforma de gestão para clínicas médicas com prontuário eletrônico e telemedicina integrada.",
                imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
                projectUrl: "#",
            }
        ];

        // Delete existing (optional, but good for clean demo)
        // Note: db.delete(projects) without where clause deletes all.
        await db.delete(projects);

        await db.insert(projects).values(newProjects);

        console.log('✅ 5 Projects seeded successfully!');
        process.exit(0);
    } catch (e) {
        console.error('Error seeding projects:', e);
        process.exit(1);
    }
}

seedProjects();
