# Tweeter - Full-Stack Twitter Alternative

## Overview
Tweeter is a simple, full-stack Twitter alternative with authentication, developed for my uni project.

## Project Documentation
For detailed project documentation visit:
https://miro.com/app/board/uXjVKcXZiZI=/?share_link_id=200809234493

## Technologies Used
- Frontend:
  - Vue 3.4
  - Pinia
  - Vuetify (for icons)
  - Vue Toastification
- Backend:
  - Express.js
  - PostgreSQL
  - JSON Web Tokens (JWT) for authentication
- Docker for containerization

## Project Structure
- `/frontend`: Vue.js frontend application
- `/backend`: Express backend server
- `/database`: PostgreSQL database scripts and configurations

## Setup and Installation

Generate .env file
```./create_env.sh```

### Using Docker
1. Ensure Docker and Docker Compose are installed on your system.
2. Clone the repository.
3. Navigate to the project root directory.
4. Run the following command to build and start the containers:
`docker-compose up --build`
5. Access the application at `http://localhost:3000`

### Manual Setup
1. Clone the repository.
2. Set up the backend:
- Navigate to the `/backend` directory.
- Install dependencies: `npm install`
- Start the server: `npm start`
3. Set up the frontend:
- Navigate to the `/frontend` directory.
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
4. Set up the database:
- Install PostgreSQL.
- Execute the SQL scripts in the `/database/sql` directory to set up the schema and functions.

## Features
- User authentication (register, login, logout)
- Tweet creation, deletion, and viewing
- Like/unlike tweets
- User profile management
- Internationalization support
- Responsive design

## API Endpoints
- `/api/auth/register`: User registration
- `/api/auth/login`: User login
- `/api/auth/accounts`: Get user accounts
- `/api/account`: User account management
- `/api/tweets`: Tweet CRUD operations
