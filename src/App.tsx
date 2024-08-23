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
import { AuthContext, AuthType } from "./context/AuthContext";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = useState<AuthType>({
    user: null,
  });
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    recipeType: null,
    mainIngredient: "",
  });

  const [loadingStatus, setIsLoading] = useState<LoadingType>({
    isLoading: false,
  });

  return (
    <AuthContext.Provider value={{ ...user, setUser }}>
      <UserContext.Provider value={{ ...userInfo, setUserInfo }}>
        <LoadingContext.Provider value={{ ...loadingStatus, setIsLoading }}>
          {loadingStatus.isLoading && <Loading></Loading>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/recommend-menu" element={<RecommendMenu />} />
            <Route path="/recommend-diet" element={<RecommendDiet />} />
            <Route path="/favorite-recipe" element={<FavoriteRecipe />} />
          </Routes>
        </LoadingContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
