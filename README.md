# EStore Management System

This project consists of two parts:
- **Backend**: ASP.NET Core 7 REST API for e-store management
- **Frontend**: React SPA with TypeScript and Tailwind CSS

## Backend Features

- **REST API** with full CRUD operations for products and categories
- **JWT Authentication** for secure order management
- **SQLite Database** with Entity Framework Core
- **Swagger/OpenAPI** documentation with interactive UI
- **Migrations** for database schema management
- **Docker Support** for containerized deployment
- **Input Validation** on all endpoints
- **Error Handling** with descriptive responses

## Frontend Features

- **Modern Homepage**: Beautiful landing page with hero section and features
- **User Registration**: Complete signup system with form validation
- **React SPA** with TypeScript
- **Product Catalog** using Fake Store API (GET requests)
- **Product Creation** with form submission (POST requests)
- **Shopping Cart** with local state management and localStorage persistence
- **Authentication System** with context-based state
- **Category Filtering** and product browsing
- **Responsive Design** with Tailwind CSS
- **Loading States** and **Error Handling**
- **Feature-based Architecture** separating logic from UI
- **TypeScript Interfaces** for all data and props

## Frontend Technologies

- **React 18** with hooks (useState, useEffect)
- **TypeScript** for type safety
- **Axios** for API requests (GET/POST)
- **React Router** for SPA navigation
- **Tailwind CSS** for responsive styling
- **Context API** for global state management
- **localStorage** for cart persistence

## Prerequisites

- .NET 7 SDK ([download](https://dotnet.microsoft.com/en-us/download/dotnet/7.0))
- Node.js and npm
- Docker (optional, for containerized deployment)

## Quick Start

### Backend Setup

1. **Navigate to project:**
   ```bash
   cd c:\Users\Lietotajs\Documents\GitHub\EStoreManagementAPI
   ```

2. **Build project:**
   ```bash
   dotnet build
   ```

3. **Apply database migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Run the server:**
   ```bash
   dotnet run --urls http://localhost:5000
   ```

5. **Access Swagger UI:**
   - Browser: http://localhost:5000/swagger
   - API Root: http://localhost:5000
   - Health: http://localhost:5000/health

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open app:**
   - Browser: http://localhost:5176
   - **Homepage**: Modern landing page with features overview
   - **Catalog**: Browse and shop products
   - **Cart**: View and manage shopping cart
   - **Sign Up**: Create new user account
   - **Login**: Access existing account

### Docker Deployment

1. **Build Docker image:**
   ```bash
   docker build -t estoreapi:latest .
   ```

2. **Run with docker-compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access containerized API:**
   - Swagger: http://localhost:8080/swagger
   - Health: http://localhost:8080/health

## API Documentation

### Products Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/{id}` | Get product by ID | No |
| POST | `/api/products` | Create new product | No |
| PUT | `/api/products/{id}` | Update product | No |
| DELETE | `/api/products/{id}` | Delete product | No |

**Request Example (POST):**
```json
{
  "name": "Laptop",
  "price": 999.99,
  "categoryId": 1
}
```

### Categories Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/{id}` | Get category by ID |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete category |

### Orders Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create new order |

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/login` |

## Project Structure

```
.
├── Program.cs              # Main application, endpoints, configuration
├── EStoreManagementAPI.csproj  # Project dependencies
├── Migrations/             # EF Core database migrations
├── shop.db                 # SQLite database (generated)
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose orchestration
└── README.md              # This file
```

## Database Schema

- **Users:** Id, Email
- **Categories:** Id, Name
- **Products:** Id, Name, Price, CategoryId (FK)
- **Orders:** Id, OrderDate, UserId (FK)
