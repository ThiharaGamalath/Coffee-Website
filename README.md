# ☕ Coffee Shop Backend API

## 📌 Overview
This is the **backend API** for the Coffee Shop E-Commerce Application.  
It is built using **Next.js 15** (API routes), **TypeScript**, **Prisma ORM**, and **PostgreSQL**, with **Stripe** integration for secure payment processing.

This backend provides:
- Complete menu management
- Customer and order management
- Secure authentication
- Real-time order status updates
- Admin dashboard functionalities

---

## 🏗 Tech Stack

| Technology    | Purpose |
|---------------|---------|
| **Next.js 15** | Full-stack framework with API routes |
| **TypeScript** | Type safety and better developer experience |
| **Tailwind CSS** | *(Frontend styling, if integrated with SSR pages)* |
| **Prisma ORM** | Database schema & queries |
| **PostgreSQL** | Relational database |
| **Stripe** | Payment processing |
| **JWT** | User authentication |
| **Lucide React** | Icon set (for frontend dashboard) |

---

## ✨ Features

- 🍽 **Menu Management**  
  Add, update, delete, and view coffee items

- 🛒 **Order Processing**  
  Customers can place orders and pay via Stripe

- 👤 **Customer Management**  
  Securely store and manage customer data

- 🔐 **Authentication**  
  User registration, login, and JWT-based authorization

- 📊 **Admin Dashboard API**  
  Manage inventory and track orders in real time

- ⚡ **Performance Optimizations**  
  Server-side rendering (SSR) + static generation (SSG)

---

## 📡 API Endpoints

### **Menu**
| Method | Endpoint       | Auth Required | Description            |
|--------|---------------|--------------|------------------------|
| GET    | `/api/menu`   | ❌ No         | Get all menu items      |
| POST   | `/api/menu`   | ✅ Yes (Admin) | Create a new menu item  |

### **Orders**
| Method | Endpoint         | Auth Required | Description                       |
|--------|-----------------|--------------|-----------------------------------|
| GET    | `/api/orders`   | ✅ Yes (Admin) | Get all orders                    |
| POST   | `/api/orders`   | ✅ Yes        | Create new order + Stripe payment |

### **Customers**
| Method | Endpoint             | Auth Required | Description             |
|--------|---------------------|--------------|-------------------------|
| GET    | `/api/customers`    | ✅ Yes (Admin) | Get all customers       |
| POST   | `/api/customers`    | ❌ No         | Create a new customer   |

---

## ⚙️ Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/coffee-shop-backend.git
cd coffee-shop-backend
