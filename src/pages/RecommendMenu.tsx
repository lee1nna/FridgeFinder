import { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import RecipeKindStep from "../components/RecipeKindStep";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RecipeIngredientStep from "../components/RecipeIngredientStep";
import { UserContext } from "../context/UserContext";
import RecipeResult from "../components/RecipeResult";

const ButtonWrapper = styled.div<{ step: number }>`
  position: absolute;
  width: calc(100% - 40px);
  display: flex;
  justify-content: ${(props) => (props.step < 3 ? "space-between" : "center")};
  bottom: 30px;
`;

const StepButton = styled.button<{
  backgroundColor: string;
  disabled?: boolean;
}>`
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  font-size: 16px;
  color: ${(props) => (props.disabled ? "#666" : "#fff")};
  border: 0;
  border-radius: 20px;
  width: fit-content;
  height: 50px;
  font-family: "TTLaundry";
  border: 0;
  background-color: ${(props) =>
    props.disabled ? "#cccccc" : props.backgroundColor};
`;

const StyledLink = styled(Link)`
  color: #fff;
  padding: 15px;
  width: 100%;
  height: 100%;
`;

const RecommendMenu = () => {
  const [step, setStep] = useState<number>(1);
  const [prevPagePath, setPrevPagePath] = useState("/");
  const [nextPagePath, setNextPagePath] = useState("/recommend-menu");

  const goPrevPage = (step: number) => {
    if (step === 1) {
      setUserInfo((prev) => {
        return { ...prev, recipeType: null };
      });
    } else if (step === 2) {
      setUserInfo((prev) => {
        return { ...prev, mainIngredient: "" };
      });
    }
    setStep((prev) => prev - 1);
  };

  const goNextPage = () => {
    if (step === 3) {
      setStep(1);
      setUserInfo((prev) => {
        return { ...prev, recipeType: null, mainIngredient: "" };
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    switch (step) {
      case 1:
        setPrevPagePath("/");
        break;
      case 2:
        setPrevPagePath("/recommend-menu");
        break;
      case 3:
        setNextPagePath("/");
        break;
    }
  }, [step]);

  const userContext = useContext(UserContext);
  const { recipeType, setUserInfo, mainIngredient } = userContext;

  return (
    <Wrapper>
      {step === 1 && <RecipeKindStep />}
      {step === 2 && <RecipeIngredientStep />}
      {step === 3 && <RecipeResult />}
      <ButtonWrapper step={step}>
        {step < 3 && (
          <StepButton
            backgroundColor="#ff6f6f"
            onClick={() => {
              goPrevPage(step);
            }}
          >
            <StyledLink to={prevPagePath}>이전</StyledLink>
          </StepButton>
        )}
        <StepButton
          backgroundColor="#8f98ff"
          disabled={step === 1 ? !recipeType : mainIngredient === ""}
          onClick={goNextPage}
        >
          <StyledLink to={nextPagePath}>
            {step === 1 && "다음"}
            {step === 2 && "추천받기"}
            {step === 3 && "메인으로"}
          </StyledLink>
        </StepButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default RecommendMenu;
