
# Vlake - Frontend

This is the frontend for the Vlake application, built with React, Vite, Tailwind CSS, DaisyUI, Zustand, and Stream Chat. It provides a modern UI for chat, authentication, notifications, and more.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)

## Features

- Modern chat UI with Stream Chat
- Authentication (login, signup, onboarding)
- Notifications and friend management
- Responsive design with Tailwind CSS and DaisyUI
- State management with Zustand
- Toast notifications

## Project Structure

```
Frontend/
	public/
		i.png
		i2.png
	src/
		App.jsx
		index.css
		main.jsx
		Components/
			CallButton.jsx
			ChatLoader.jsx
			FriendCard.jsx
			Layout.jsx
			Navbar.jsx
			NoFriendsFound.jsx
			NoNotificationsFound.jsx
			PageLoader.jsx
			Sidebar.jsx
			ThemeSelector.jsx
		Constants/
			index.js
		Hooks/
			useAuthUser.js
			useLogin.js
			useLogout.js
			useSignUp.js
		Lib/
			api.js
			axios.js
			utils.js
		Pages/
			CallPage.jsx
			ChatPage.jsx
			FriendsPage.jsx
			HomePage.jsx
			LoginPage.jsx
			NotificationsPage.jsx
			OnboardingPage.jsx
			SignUpPage.jsx
		Store/
			useThemeStore.js
	package.json
	vite.config.js
	eslint.config.js
	README.md
```

## Tech Stack

- **React**: UI library
- **Vite**: Build tool
- **Tailwind CSS** & **DaisyUI**: Styling
- **Stream Chat**: Real-time chat
- **Zustand**: State management
- **React Router**: Routing
- **React Query**: Data fetching
- **Axios**: HTTP requests
- **Lucide React**: Icons
- **React Hot Toast**: Notifications

## Installation

```bash
cd Frontend
npm install
# or
yarn install
```

## Environment Variables

Create a `.env` file in the `Frontend` directory if needed. Example:

```dotenv
VITE_STREAM_API_KEY=your_stream_api_key
```

## Running the Application

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Scripts

- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `lint`: Run ESLint

---
