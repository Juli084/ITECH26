import Database from 'better-sqlite3';

const db = new Database('sqlite.db');

try {
    const result = db.prepare("UPDATE users SET role = 'ADMIN' WHERE email = ?").run('juliorodrigues84@live.com');

    if (result.changes > 0) {
        console.log('User promoted to ADMIN successfully');
    } else {
        console.log('User not found. Make sure you registered first.');
    }
} catch (e) {
    console.error('Error promoting user:', e);
} finally {
    db.close();
}
