import * as dotenv from 'dotenv';
import { count, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// 1. Load Environment Variables
dotenv.config();

async function seed() {
    console.log('🌱 Starting Seed Script...');

    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL not found in environment.');
        process.exit(1);
    }

    const adminName = process.env.ADMIN_NAME ?? 'Administrador';
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword || adminPassword.length < 12) {
        console.error('❌ Defina ADMIN_EMAIL e ADMIN_PASSWORD (mínimo de 12 caracteres) no ambiente.');
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
        // O administrador vem do ambiente (ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME).
        // Não existe senha padrão no código.
        console.log('👤 Seeding Admin User...');
        const adminHash = await bcrypt.hash(adminPassword, 12);

        await db.insert(users).values({
            name: adminName,
            email: adminEmail,
            passwordHash: adminHash,
            role: 'ADMIN'
        }).onConflictDoNothing({ target: users.email });

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
