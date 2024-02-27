import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Profile from "./pages/Profile/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import Dock from "./components/Dock/Dock";
import { createContext, useState } from "react";
import { Spinner } from "flowbite-react";
import LoginPage from "./pages/LoginSignupPage/LoginPage";
import SignupPage from "./pages/LoginSignupPage/SignupPage";

const AuthContext = createContext({
  supabase: null,
});

const ProtectedRoute = (props) => {
  const [auth, setAuth] = useState({
    isAuthed: true,
    checkingAuth: true,
  });

  // check for auth in useEffect

  return (
    <div>
      {auth.checkingAuth ? (
        <div className="w-100  text-center justify-center absolute top-1/2 left-1/2">
          <Spinner
            size="xl"
            className="fill-[#4d4dc7]"
            aria-label="Center-aligned"
          />
        </div>
      ) : (
        <>
          {auth.isAuthed ? (
            <>
              <Dock />
              {props.children}
              {/* {props.children} */}
            </>
          ) : (
            <Navigate to="/login" replace />
          )}
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        {/* TODO: Add AuthContext.Provider value */}
        <AuthContext.Provider value={{}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage login={true} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export { App, AuthContext };
