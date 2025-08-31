import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register, { action as RegisterAction } from "./pages/Register";
import Login, { action as LoginAction } from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { isAuthReady, login } from "./app/feature/userSlice";

function App() {
  const { user, authReady } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
