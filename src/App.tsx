import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecommendMenu from "./pages/RecommendMenu";
import FavoriteRecipe from "./pages/FavoriteRecipe";
import RecommendDiet from "./pages/RecommendDiet";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recommend-menu" element={<RecommendMenu />} />
      <Route path="/recommend-diet" element={<RecommendDiet />} />
      <Route path="/favorite-recipe" element={<FavoriteRecipe />} />
    </Routes>
  );
}

export default App;
