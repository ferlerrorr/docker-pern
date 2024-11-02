# Dockerized Full-Stack App: React, Node.js, PostgreSQL, Nginx

A Dockerized development environment for a full-stack app with a React frontend, Node.js backend, PostgreSQL database, and Nginx as a reverse proxy.

## Project Structure


## Services

1. **PostgreSQL**: Relational database with `POSTGRES_PASSWORD` environment variable.
2. **Nginx**: Reverse proxy for routing to client and API, exposed on `localhost:3050`.
3. **Node.js API**: Backend service configured to connect to PostgreSQL.
4. **React Client**: Frontend with hot-reloading enabled.

## Environment Variables

- **PostgreSQL**: `POSTGRES_PASSWORD`
- **Node.js API**: `PGUSER`, `PGHOST`, `PGDATABASE`, `PGPASSWORD`, `PGPORT`
- **React Client**: `CHOKIDAR_USEPOLLING=true`

---

> **Note**: This setup is for **development only**. Update configurations for production.
