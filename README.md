# Coffee Shop Backend API Documentation

## Overview
This is the backend API for the coffee shop application built with Next.js, Prisma, and PostgreSQL.

## Features
- Complete menu management
- Order processing with Stripe integration
- Customer management
- Admin dashboard for order management
- Real-time order status updates

## API Endpoints

### Menu Items
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create new menu item

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order with Stripe payment

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Set up PostgreSQL database and update DATABASE_URL in .env

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `JWT_SECRET`: JWT secret for authentication

## Usage
The backend is now ready to serve the coffee shop frontend with full CRUD operations for menu items, orders, and customers, along with Stripe payment integration.
