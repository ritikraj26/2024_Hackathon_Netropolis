import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/DashboardPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { createContext, useState } from "react";
import { Spinner } from "flowbite-react";
import LoginPage from "./pages/LoginSignupPage/LoginPage";
import SignupPage from "./pages/LoginSignupPage/SignupPage";
import TopNavbar from "./components/Navbar/Navbar";
import QuestPage from "./pages/QuestPage/QuestPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditorPage } from "./pages/EditorPage/EditorPage";
import CreateTaskModal from "./components/Tasks/CreateTask";

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
        setAuthSession(authCookieObj);
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
  const [authObj, setAuthObj] = useState(null);

  return (
    <>
      <ToastContainer />
      {/* TODO: Add AuthContext.Provider value */}
      <AuthContext.Provider
        value={{
          authSession: authObj,
          setAuthSession: setAuthObj,
        }}
      >
        <BrowserRouter>
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
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export { App, AuthContext };
