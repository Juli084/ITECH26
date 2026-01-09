import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import bcrypt from 'bcryptjs';

async function seed() {
    const passwordHash = await bcrypt.hash('admin123', 10);
    try {
        await db.insert(users).values({
            name: 'Admin iTech',
            email: 'admin@itech.com',
            passwordHash: passwordHash,
            role: 'ADMIN',
        });
        console.log('Admin user created successfully');
    } catch (e) {
        console.log('Admin user might already exist');
    }
}

seed();
