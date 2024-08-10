import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Step1 from "../components/Step1";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Step2 from "../components/Step2";

const ButtonWrapper = styled.div<{ step: number }>`
  position: absolute;
  width: calc(100% - 40px);
  display: flex;
  justify-content: ${(props) => (props.step < 4 ? "space-between" : "center")};
  bottom: 30px;
`;

const StepButton = styled.button<{
  backgroundColor: string;
}>`
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  background-color: ${(props) => props.backgroundColor};
  border: 0;
  border-radius: 20px;
  width: fit-content;
  height: 50px;
  font-family: "TTLaundry";
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

  const goPrevPage = () => {
    setStep((prev) => prev - 1);
  };

  const goNextPage = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("step 변경!", step);

    switch (step) {
      case 1:
        setPrevPagePath("/");
        break;
      case 2:
        setPrevPagePath("/recommend-menu");
        break;
      case 4:
        setNextPagePath("/");
        break;
    }
  }, [step]);

  return (
    <Wrapper>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      <ButtonWrapper step={step}>
        {step < 4 && (
          <StepButton backgroundColor="#ff6f6f" onClick={goPrevPage}>
            <StyledLink to={prevPagePath}>이전</StyledLink>
          </StepButton>
        )}
        <StepButton backgroundColor="#8f98ff" onClick={goNextPage}>
          <StyledLink to={nextPagePath}>
            {(step === 1 || step === 2) && "다음"}
            {step === 3 && "추천받기"}
            {step === 4 && "메인으로"}
          </StyledLink>
        </StepButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default RecommendMenu;
