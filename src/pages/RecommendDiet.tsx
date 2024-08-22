import { useContext, useState } from "react";
import Wrapper from "../components/Wrapper";
import RecipeIngredientStep from "../components/RecipeIngredientStep";
import { ButtonWrapper, StepButton, StyledLink } from "./RecommendMenu";
import DietResultStep from "../components/DietResultStep";
import { UserContext } from "../context/UserContext";

const RecommendDiet = () => {
  const [step, setStep] = useState<number>(1);
  const userContext = useContext(UserContext);
  const { setUserInfo } = userContext;

  const clickPrevBtn = () => {
    if (step === 1) {
      setUserInfo(() => ({ recipeType: null, mainIngredient: "" }));
    }
    setStep((prev) => prev - 1);
  };

  const clickNextBtn = () => {
    if (step === 2) {
      setUserInfo(() => ({ recipeType: null, mainIngredient: "" }));
    }
    setStep(2);
  };

  return (
    <Wrapper>
      {step === 1 && <RecipeIngredientStep></RecipeIngredientStep>}
      {step === 2 && <DietResultStep></DietResultStep>}

      <ButtonWrapper>
        {
          <StepButton backgroundColor="#ff6f6f" onClick={clickPrevBtn}>
            <StyledLink to={step !== 1 ? "/recommend-diet" : "/"}>
              이전
            </StyledLink>
          </StepButton>
        }

        <StepButton backgroundColor="#8f98ff" onClick={clickNextBtn}>
          <StyledLink to={step !== 2 ? "/recommend-diet" : "/"}>
            {step === 1 && "추천받기"}
            {step === 2 && "메인으로"}
          </StyledLink>
        </StepButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default RecommendDiet;
