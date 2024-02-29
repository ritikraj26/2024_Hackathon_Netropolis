import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Profile from "./pages/Profile/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { createContext, useState } from "react";
import { Spinner } from "flowbite-react";
import LoginPage from "./pages/LoginSignupPage/LoginPage";
import SignupPage from "./pages/LoginSignupPage/SignupPage";
import TopNavbar from "./components/Navbar/Navbar";
import QuestPage from "./pages/QuestPage/QuestPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext({
  authSession: null,
  setAuthSession: () => {},
});

const ProtectedRoute = (props) => {
  const { authSession, setAuthSession } = useContext(AuthContext);

  const [auth, setAuth] = useState({
    isAuthed: false,
    checkingAuth: true,
  });

  // check for auth in useEffect
  useEffect(() => {
    console.log("authsession topnav : ", authSession);
    if (authSession !== null && authSession !== undefined) {
      setAuth({
        isAuthed: true,
        checkingAuth: false,
      });
    } else {
      const authCookie = sessionStorage.getItem("auth");
      console.log("auth cookie", authCookie);
      if (authCookie === null) {
        setAuth({
          isAuthed: false,
          checkingAuth: false,
        });
      } else {
        const authCookieObj = JSON.parse(authCookie);
        setAuthSession({ ...authCookieObj });
        setAuth({
          isAuthed: true,
          checkingAuth: false,
        });
      }
    }
  }, [setAuthSession, authSession]);

  return (
    <div>
      {auth.checkingAuth ? (
        <div className="w-100  text-center justify-center absolute top-1/2 left-1/2">
          <Spinner
            size="xl"
            className="fill-primary-600"
            aria-label="Center-aligned"
          />
        </div>
      ) : (
        <>
          {auth.isAuthed ? (
            <>
              <ToastContainer />
              <TopNavbar children={props.children} />
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
  const [authSession, setAuthSession] = useState(null);

  return (
    <>
      <BrowserRouter>
        {/* TODO: Add AuthContext.Provider value */}
        <AuthContext.Provider
          value={{
            authSession: authSession,
            setAuthSession: setAuthSession,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage role={"user"} />} />
            <Route path="/signup" element={<SignupPage role={"user"} />} />
            <Route
              path="/manager/signup"
              element={<SignupPage role={"manager"} />}
            />
            <Route
              path="/manager/login"
              element={<LoginPage role={"manager"} />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quests"
              element={
                <ProtectedRoute>
                  <QuestPage />
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
