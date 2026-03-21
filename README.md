# Event Management System API

A robust and scalable backend for managing events and clients, built with Node.js, Express, TypeScript, and TypeORM, powered by Neon Postgres.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Overview

This system allows organizations to manage their events and for clients to register and participate. It features secure authentication, event CRUD operations, and client profile management.

### Key Features

- **Event Management**: Create, list, view details, and delete events.
- **Client Authentication**: Secure sign-up and sign-in with JWT.
- **Registration System**: Clients can register for events and view their participation list.
- **Client Management**: List all clients and manage personal profiles.
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`.
- **Database Branching**: Leveraging Neon Postgres for seamless development and production environments.

## Getting Started

### Prerequisites

- Node.js
- Yarn or NPM
- Neon Postgres account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables (.env):
   ```bash
   PORT=3000
   NODE_ENV="development"
   DEV_DATABASE_URI=your_neon_dev_uri
   MAIN_DATABASE_URI=your_neon_main_uri
   COOKIE_SECRET=your_cookie_secret
   JWT_SECRET=your_jwt_secret
   ```

### Database Setup

1. Generate initial migrations:
   ```bash
   yarn build
   npx typeorm-ts-node-commonjs migration:generate ./src/typeorm/migrations/InitialSchema -d ./src/typeorm/data-source.ts
   ```
2. Run migrations:
   ```bash
   yarn typeorm migration:run -d src/typeorm/data-source.ts
   ```

### Running the App

```bash
yarn dev  # Development mode
yarn build && yarn start  # Production mode
```

The API will be accessible at `http://localhost:3000`.
Swagger UI is available at `http://localhost:3000/api-docs`.

## Deployment to Vercel

This project is configured for deployment as Vercel Serverless Functions.

### 1. Vercel Configuration
The project includes a `vercel.json` file and an `api/index.ts` entry point that exports the Express app.

### 2. Environment Variables
You must set the following environment variables in your Vercel Project Settings:
- `NODE_ENV`: `production`
- `MAIN_DATABASE_URI`: Your production PostgreSQL connection string.
- `COOKIE_SECRET`: A secure random string.
- `JWT_SECRET`: A secure random string.
- `DB_PORT`: `5432` (or your DB port).

### 3. Deploy
- **Via Vercel CLI**: Run `vercel` in the root directory.
- **Via GitHub**: Connect your repository to Vercel. It will automatically detect the configuration and deploy.

## API Endpoints Summary

### Auth
- `POST /api/v1/auth/signup`: Register a new client.
- `POST /api/v1/auth/signin`: Authenticate and get token.

### Events
- `GET /api/v1/events`: List all events.
- `GET /api/v1/events/:id`: Get event details.
- `POST /api/v1/events`: Create a new event.
- `DELETE /api/v1/events/:id`: Delete an event.
- `POST /api/v1/events/:id/register`: Register current client for an event.

### Clients
- `GET /api/v1/clients`: List all clients.
- `GET /api/v1/clients/me`: Get current client profile.
- `PUT /api/v1/clients/me`: Update profile.

## Documentation

For more detailed technical tips and migration guides, see [docs/README.md](./docs/README.md).

## Author

**Souhail Tourjmen**

## License

MIT
