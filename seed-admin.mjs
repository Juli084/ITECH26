import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import bcrypt from 'bcryptjs';

async function seed() {
    const passwordHash = await bcrypt.hash('admin123', 10);
    try {
        // User account
        await db.insert(users).values({
            name: 'Julio Rodrigues',
            email: 'juliorodrigues84@live.com',
            passwordHash: passwordHash,
            role: 'ADMIN',
        });
        console.log('User created successfully');

        // General admin
        await db.insert(users).values({
            name: 'Admin iTech',
            email: 'admin@itech.com',
            passwordHash: passwordHash,
            role: 'ADMIN',
        });
        console.log('Admin user created successfully');
    } catch (e) {
        console.log('Users might already exist');
    }
}

seed();
