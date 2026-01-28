import * as dotenv from 'dotenv';
import { count, sql } from 'drizzle-orm';

// 1. Load Environment Variables
dotenv.config();

async function seed() {
    console.log('🌱 Starting Seed Script...');

    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL not found in environment.');
        process.exit(1);
    }

    // 2. Dynamic Imports (Ensures env vars are loaded before DB connection init)
    const { db } = await import('./index');
    const { users, siteSettings } = await import('./schema');

    try {
        console.log('🔌 Connecting to Neon DB...');
        // Verify connection
        await db.execute(sql`SELECT 1`);
        console.log('✅ Connected successfully!');

        // --- USERS ---
        console.log('👤 Seeding Admin Users...');
        const adminHash = '$2b$10$YNGqKHnh3pVOj/slDq1Ewu3K6HXJvHeyss/uRTjVoJGWXhp.SgG02'; // 'admin123'

        await db.insert(users).values([
            {
                name: 'Julio Rodrigues',
                email: 'juliorodrigues84@live.com',
                passwordHash: adminHash,
                role: 'ADMIN'
            },
            {
                name: 'Admin iTech',
                email: 'admin@itech.com',
                passwordHash: adminHash,
                role: 'ADMIN'
            }
        ]).onConflictDoNothing({ target: users.email });

        // --- SITE SETTINGS ---
        console.log('⚙️ Seeding Site Settings...');
        await db.insert(siteSettings).values({
            id: 1,
            siteName: 'iTech Soluções Digitais',
            siteDescription: 'Especialistas em reparos Apple e acessórios premium.',
            whatsappNumber: '5515997534529',
            contactEmail: 'contato@itechsolucoesdigitais.com',
            instagramUrl: 'https://www.instagram.com/itech_solucoes_digitais/',
            linkedinUrl: 'linkedin.com/in/julio-rodrigues84/'
        }).onConflictDoNothing();

        console.log('✨ Seed operations finished! (Clean state)');

        // --- VERIFICATION ---
        const uCount = await db.select({ value: count() }).from(users);
        const sCount = await db.select({ value: count() }).from(siteSettings);

        console.log(`\n📊 Database Totals:`);
        console.log(`Users:    ${uCount[0].value}`);
        console.log(`Settings: ${sCount[0].value}`);

        process.exit(0);

    } catch (error) {
        console.error('❌ Seed Failed:', error);
        process.exit(1);
    }
}

seed();
