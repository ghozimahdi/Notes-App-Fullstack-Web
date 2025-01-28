# Notes App

This is a fullstack website project developed using TypeScript. The application includes a backend built with Express
and a frontend built with React using TypeScript.

## Features

- Fullstack web application.
- Backend: Express.js (pure implementation, and using dependency injection with Inversify).
- Frontend: React with TypeScript.

## Project Structure

```
notes_app/
├── backend/      # Backend code
├── frontend/     # Frontend code
├── node_modules/ # Node.js modules
├── .gitignore    # Git ignore file
├── install.sh    # Shell script to install dependencies
├── package.json  # NPM package configuration
├── package-lock.json # NPM lock file
└── README.md     # Project documentation
```

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- bash (for running shell scripts)
- Docker (for building and running containers)
- Docker Compose (for managing multi-container applications)

## Installation and Running

### 1. Clone the repository

```bash
git clone <repository-url>
cd notes_app
```

### 2. Make the `install.sh` script executable

```bash
chmod +x install.sh
```

### 3. Run the `install.sh` script to install dependencies for both backend and frontend

```bash
./install.sh
```

### 4. Start the development server

```bash
npm run dev
npm run stg
npm run prod
```

### 5. Build and Run with Docker Compose

#### Build the Docker containers:

```bash
NODE_ENV=development docker-compose build
NODE_ENV=staging docker-compose build
NODE_ENV=production MONGODB_URI=mongodb://mongo:27017/mydatabase SESSION_SECRET=mysecret docker-compose up --build
```

#### Start all services using Docker Compose:

```bash
NODE_ENV=development docker-compose up
NODE_ENV=staging docker-compose up
NODE_ENV=production docker-compose up
```

#### Stop all services:

```bash
docker-compose down
```

## Usage

- Once the development server is running, open your browser and navigate to `http://localhost:3000` to access the
  frontend.
- The backend will also be running, typically on `http://localhost:5001` (adjust according to the configuration).

## License

This project is licensed under the [MIT License](LICENSE).

