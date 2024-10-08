import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { ChangeEvent, useContext, useEffect, useRef } from "react";

export const QuestionText = styled.h3`
  line-height: 25px;
`;
const WarningText = styled.h5`
  color: #ff6161;
  margin: 5px 0 0 0;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  font-size: 20px;
  padding: 20px;
`;

const RecipeIngredientStep = () => {
  const userContext = useContext(UserContext);
  const { mainIngredient, setUserInfo } = userContext;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changeIngrdient = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        mainIngredient: e.target.value,
      };
    });
  };

  return (
    <>
      <QuestionText>
        사용 할 냉장고의 메인 재료를 <br /> 입력해주세요.
        <WarningText>
          재료명에 오타가 있을 경우 <br /> 정확한 추천이 어려울 수 있습니다 🥲
        </WarningText>
      </QuestionText>
      <Input
        ref={inputRef}
        value={mainIngredient}
        onChange={(e: ChangeEvent<HTMLInputElement>) => changeIngrdient(e)}
      ></Input>
    </>
  );
};

export default RecipeIngredientStep;
