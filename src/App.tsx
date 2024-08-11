import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecommendMenu from "./pages/RecommendMenu";
import FavoriteRecipe from "./pages/FavoriteRecipe";
import RecommendDiet from "./pages/RecommendDiet";
import {
  UserContext,
  UserInfoContextType,
  UserInfoType,
} from "./context/UserContext";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    recipeType: null,
    mainIngredient: "",
  });

  return (
    <UserContext.Provider value={{ ...userInfo, setUserInfo }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend-menu" element={<RecommendMenu />} />
        <Route path="/recommend-diet" element={<RecommendDiet />} />
        <Route path="/favorite-recipe" element={<FavoriteRecipe />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
