
# Vlake - Backend

This is the backend server for the Vlake application. It handles API requests, user authentication, database interactions, and real-time chat functionality.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)

## Features

- User authentication (signup, login, JWT)
- Real-time chat using Stream API
- Friend requests and user management
- RESTful API with Express.js
- Secure CORS and cookie handling

## Project Structure

```
Backend/
    package.json
    src/
        Server.js
        Controllers/
            authController.js
            chatController.js
            userController.js
        Lib/
            db.js
            Stream.js
        Middleware/
            authMiddleware.js
        Models/
            FriendRequest.js
            User.js
        Routes/
            authRoutes.js
            chatRoutes.js
            userRoutes.js
```

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

```bash
cd Backend
npm install
```

## Environment Variables

Create a `.env` file in the `Backend` directory. Example:

```dotenv
PORT=4040
CORS_ORIGIN=http://localhost:5173
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

```bash
# Development (with auto-reload)
npm run dev


## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Stream Chat**: Real-time chat API
- **dotenv**: Environment variable management
- **MongoDB**: Database (via db.js)
- **JWT**: Authentication

## API Endpoints

- `/api/auth` - Authentication (see `authRoutes.js`)
- `/api/users` - User management (see `userRoutes.js`)
- `/api/chat` - Chat operations (see `chatRoutes.js`)

---
