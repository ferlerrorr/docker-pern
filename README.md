# Dockerized Full-Stack Application: React, Node.js, PostgreSQL, and Nginx

This project provides a Dockerized development environment for a full-stack web application. It includes a **React** frontend, a **Node.js** backend, a **PostgreSQL** database, and **Nginx** as a reverse proxy to manage routing between services.

## Table of Contents

- [Project Structure](#project-structure)
- [Services](#services)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Notes](#notes)

## Project Structure

```bash
project-root/
├── client/              # React frontend with development dependencies
├── server/              # Node.js backend configured to connect to PostgreSQL
├── nginx/               # Nginx configuration files
├── .env.development     # Sample environment file with placeholders for credentials
├── docker-compose.yml   # Docker Compose configuration for all services
└── README.md            # Project documentation
```

## Services

The Docker Compose configuration (`docker-compose.yml`) defines four main services:

### PostgreSQL
- **Description**: A relational database used to store the application’s data.
- **Configuration**: Configured with `POSTGRES_PASSWORD` and other necessary credentials specified in environment variables.
- **Environment Variables**:
  - `POSTGRES_PASSWORD`: Defines the password for the PostgreSQL database. Set this variable in your `.env` file to ensure database security.

### Nginx

- **Description**: Serves as a reverse proxy to route HTTP requests to the appropriate services, such as the React client or the Node.js API.
- **Configuration**: Exposes the application at `localhost:3050`, providing a single entry point for both frontend and backend.
- **Ports**: Accessible via `localhost:3050` on your local machine, with routing rules that manage traffic between the React frontend and Node.js backend.

### Node.js API
- **Description**: The backend service responsible for handling business logic and communicating with PostgreSQL.
- **Configuration**: Connects to the PostgreSQL database using credentials defined in environment variables.
- **Endpoints**: Exposes RESTful API endpoints to be consumed by the React frontend.
- **Environment Variables**:
  - `PGUSER`: Username for PostgreSQL.
  - `PGHOST`: Host for PostgreSQL (usually the service name defined in `docker-compose.yml`).
  - `PGDATABASE`: Database name for PostgreSQL.
  - `PGPASSWORD`: Password for the PostgreSQL user.
  - `PGPORT`: Port for PostgreSQL (default is `5432`).

### React Client
- **Description**: The frontend application, built with React and configured for fast development with hot-reloading enabled.
- **Configuration**: Connects to the backend API through the Nginx proxy.
- **Environment Variables**:
  - `CHOKIDAR_USEPOLLING=true`: Enables polling for file changes, necessary for hot-reloading on some file systems, ensuring changes are updated in real time during development.


## Environment Variables

To configure this project, create a `.env` file by copying the provided `.env.development` file. This `.env` file will contain all necessary environment variables, including credentials. The main variables are as follows:

### PostgreSQL:
- `POSTGRES_PASSWORD`: Sets the password for the PostgreSQL database.

### Node.js API:
- `PGUSER`: Username for PostgreSQL.
- `PGHOST`: Host for PostgreSQL (typically the service name in `docker-compose.yml`).
- `PGDATABASE`: Name of the PostgreSQL database.
- `PGPASSWORD`: Password for the PostgreSQL user.
- `PGPORT`: Port for PostgreSQL (default is `5432`).

### React Client:
- `CHOKIDAR_USEPOLLING=true`: Enables polling to detect file changes, especially useful for smooth hot-reloading on certain systems.

## Setup Instructions

1. Copy the `.env.development` file to `.env`:

```bash
cp .env.development .env
```

2. Run the following command to build and start all services:

```bash
docker-compose up --build 
```

This command builds and starts the React client, Node.js API, PostgreSQL database, and Nginx reverse proxy in Docker containers, setting up the environment for development.

## Usage

- **Access the Frontend**: Open a browser and go to [http://localhost:3050](http://localhost:3050).
- **Backend API and Database**: The Node.js API and PostgreSQL database are accessible only internally within the Docker network, ensuring they are secure and isolated.
- **pgAdmin (Optional)**: If configured, you can access pgAdmin for PostgreSQL management at [http://localhost:8080](http://localhost:8080) to inspect and manage database contents.

## Notes

> **Important**: This setup is intended for **development purposes only**. For production deployments, review and adjust configurations for enhanced security, load handling, and resource management.

This setup provides a consistent and easy-to-use development environment for a full-stack application, with each service isolated in a Docker container for streamlined local development.

Feel free to integrate this section into your overall `README.md` file. If you need further assistance or adjustments, just let me know!

