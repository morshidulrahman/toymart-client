import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router/Router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>
);
