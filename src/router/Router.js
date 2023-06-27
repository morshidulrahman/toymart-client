import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layout/Main";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import NotfoundPages from "../pages/404";
import Privateroute from "./PrivateRoute";
import AllToys from "../components/AllToys/AllToys";
import AddToys from "../pages/AddToys";
import MyToys from "../components/MyToys/MyToys";
import UpdateToys from "../pages/UpdateToys";
import Blog from "../pages/Blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotfoundPages />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/toys/:id",
        element: (
          <Privateroute>
            <SingleProduct />
          </Privateroute>
        ),
        loader: ({ params }) =>
          fetch(`https://toyserver-iota.vercel.app/toys/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/alltoys",
        element: <AllToys />,
      },
      {
        path: "/addtoys",
        element: (
          <Privateroute>
            <AddToys />
          </Privateroute>
        ),
      },
      {
        path: "/mytoys",
        element: (
          <Privateroute>
            <MyToys />
          </Privateroute>
        ),
      },
      {
        path: "/updatedtoys/:id",
        element: (
          <Privateroute>
            <UpdateToys />
          </Privateroute>
        ),
        loader: ({ params }) =>
          fetch(`https://toyserver-iota.vercel.app/toys/${params.id}`),
      },
    ],
  },
]);
