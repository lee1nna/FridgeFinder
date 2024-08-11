import { createContext } from "react";
import { recipeType } from "../type/recipe";

export type UserInfoType = {
  recipeType: null | recipeType;
  mainIngredient: string;
};

export type UserInfoContextType = UserInfoType & {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
};

const defaultUserInfo: UserInfoContextType = {
  recipeType: null,
  mainIngredient: "",
  setUserInfo: () => {},
};

export const UserContext = createContext<UserInfoContextType>(defaultUserInfo);
