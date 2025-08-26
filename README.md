# Vlake

Vlake is a full-stack web application for real-time language learning and social chat. It features user authentication, friend management, notifications, and chat powered by Stream API.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User authentication (signup, login, JWT)
- Real-time chat and video calls
- Friend requests and notifications
- Responsive, modern UI
- RESTful API with Express.js
- State management with Zustand

## Project Structure

```
Vlake/
  Backend/
    package.json
    src/
      Server.js
      Controllers/
      Lib/
      Middleware/
      Models/
      Routes/
    .env
    .gitignore
    README.md
  Frontend/
    package.json
    src/
      App.jsx
      Components/
      Constants/
      Hooks/
      Lib/
      Pages/
      Store/
      index.css
      main.jsx
    public/
    .env
    .gitignore
    README.md
```

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Stream Chat, JWT, dotenv
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, Zustand, Stream Chat, React Router, React Query, Axios

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/LaxitSavaliya/Vlake-Real-time-Chat-Video-Calling-App
cd Vlake
```

### 2. Install dependencies

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd ../Frontend
npm install
```

## Environment Variables

Both backend and frontend require environment variables.

### Backend (`Backend/.env`)

```dotenv
PORT=5000
CORS_ORIGIN=http://localhost:5173
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (`Frontend/.env`)

```dotenv
VITE_STREAM_API_KEY=your_stream_api_key
```

## Running the Application

### Backend

```bash
cd Backend
npm run dev   # Development
npm start     # Production
```

### Frontend

```bash
cd Frontend
npm run dev   # Development
npm run build # Production build
npm run preview # Preview production build
```

## API Endpoints

- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/chat` - Chat operations

## License

MIT
