import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/addrecipe", element: <AddRecipe /> },
  { path: "/recipes/:recipeId", element: <RecipeDetail /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
