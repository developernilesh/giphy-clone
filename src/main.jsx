import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Search from "./pages/Search.jsx";
import SingleGif from "./pages/SingleGIF.jsx";
import Favourites from "./pages/Favourites.jsx";
import GifContextProvider from "./context/GifContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":category",
        element: <Category />,
      },
      {
        path: "search/:query",
        element: <Search />,
      },
      {
        path: ":type/:slug",
        element: <SingleGif />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GifContextProvider>
    <RouterProvider router={router} />
  </GifContextProvider>
);
