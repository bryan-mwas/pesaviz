import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home.tsx";
import { Dashboard } from "./components/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Dang! Page doesn't exist</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/report",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
