import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('USER'), // 'ADMIN' | 'USER'
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

export const leads = sqliteTable('leads', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  serviceInterest: text('service_interest'),
  message: text('message'),
  status: text('status').default('NEW'), // NEW, CONTACTED, CLOSED
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

export const posts = sqliteTable('posts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  status: text('status').default('DRAFT'), // DRAFT, PUBLISHED
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

export const products = sqliteTable('products', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: integer('price').notNull(), // Em centavos (inteiro)
  promoPrice: integer('promo_price'), // Em centavos (inteiro) - Opcional
  stockQuantity: integer('stock_quantity').notNull().default(0),
  status: text('status').notNull().default('ACTIVE'), // ACTIVE, INACTIVE
  category: text('category').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

export const productMedia = sqliteTable('product_media', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  type: text('type').notNull().default('IMAGE'), // IMAGE, VIDEO
  url: text('url').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
});
