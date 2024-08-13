import { createContext } from "react";

export type LoadingType = {
  isLoading: boolean;
};

export type LoadingContextType = LoadingType & {
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingType>>;
};

const defaultLoading: LoadingContextType = {
  isLoading: false,
  setIsLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextType>(defaultLoading);
