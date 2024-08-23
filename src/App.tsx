import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecommendMenu from "./pages/RecommendMenu";
import FavoriteRecipe from "./pages/FavoriteRecipe";
import RecommendDiet from "./pages/RecommendDiet";
import { UserContext, UserInfoType } from "./context/UserContext";
import { useState } from "react";
import Loading from "./components/Loading";
import { LoadingContext, LoadingType } from "./context/LoadingContext";
import { auth } from "./firebase";

function App() {
  console.log(auth);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    recipeType: null,
    mainIngredient: "",
  });

  const [loadingStatus, setIsLoading] = useState<LoadingType>({
    isLoading: false,
  });

  return (
    <UserContext.Provider value={{ ...userInfo, setUserInfo }}>
      <LoadingContext.Provider value={{ ...loadingStatus, setIsLoading }}>
        {loadingStatus.isLoading && <Loading></Loading>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend-menu" element={<RecommendMenu />} />
          <Route path="/recommend-diet" element={<RecommendDiet />} />
          <Route path="/favorite-recipe" element={<FavoriteRecipe />} />
        </Routes>
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
