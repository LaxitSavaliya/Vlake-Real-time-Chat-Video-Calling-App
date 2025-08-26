import { Navigate, Route, Routes } from "react-router";
import { Toaster } from 'react-hot-toast';

import HomePage from './Pages/HomePage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import NotificationsPage from './Pages/NotificationsPage.jsx';
import CallPage from './Pages/CallPage.jsx';
import ChatPage from './Pages/ChatPage.jsx';
import OnboardingPage from './Pages/OnboardingPage.jsx';
import PageLoader from "./Components/PageLoader.jsx";
import FriendsPage from "./Pages/FriendsPage.jsx";
import Layout from "./Components/Layout.jsx";

import useAuthUser from './Hooks/useAuthUser.js';
import { useThemeStore } from "./Store/useThemeStore.js";

const App = () => {

  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>

        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        <Route
          path="/"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <HomePage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route
          path="/friends"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <FriendsPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route
          path="/notifications"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationsPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? (
            <CallPage />
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        <Route
          path="/onboarding"
          element={isAuthenticated ? (
            !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/login" />
          )} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;