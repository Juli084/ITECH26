import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('USER'), // 'ADMIN' | 'USER'
  createdAt: timestamp('created_at').defaultNow(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  serviceInterest: text('service_interest'),
  message: text('message'),
  status: text('status').default('NEW'), // NEW, CONTACTED, CLOSED
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  mediaType: text('media_type').default('IMAGE'), // 'IMAGE' | 'VIDEO'
  status: text('status').default('DRAFT'), // DRAFT, PUBLISHED
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: integer('price').notNull(), // Em centavos (inteiro)
  promoPrice: integer('promo_price'), // Em centavos (inteiro) - Opcional
  stockQuantity: integer('stock_quantity').notNull().default(0),
  status: text('status').notNull().default('ACTIVE'), // ACTIVE, INACTIVE
  category: text('category').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const productMedia = pgTable('product_media', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  type: text('type').notNull().default('IMAGE'), // IMAGE, VIDEO
  url: text('url').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // Opcional (compra sem login por enquanto, ou futuro)
  customerName: text('customer_name'),
  customerEmail: text('customer_email'), // Para guest checkout
  total: integer('total').notNull(), // Em centavos, calculado no server
  status: text('status').notNull().default('PENDING'), // PENDING, PAID, CANCELED
  createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: integer('price_at_purchase').notNull(), // Preço congelado no momento da compra
});


export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  siteName: text('site_name').notNull().default('iTech Soluções Digitais'),
  siteDescription: text('site_description'),
  whatsappNumber: text('whatsapp_number'),
  contactEmail: text('contact_email'),
  instagramUrl: text('instagram_url'),
  linkedinUrl: text('linkedin_url'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  projectUrl: text('project_url'),
  createdAt: timestamp('created_at').defaultNow(),
});
