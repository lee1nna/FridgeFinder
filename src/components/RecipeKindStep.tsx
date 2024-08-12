import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { recipeType } from "../type/recipe";

const QuestionText = styled.h3`
  line-height: 25px;
`;

const RecipeItem = styled.div`
  background-color: #ff8c00;
  border-radius: 20px;
  color: #fff;
  padding: 15px;
  margin-top: 20px;
  cursor: pointer;
`;

const RecipeKindStep = () => {
  const recipeKind: recipeType[] = ["밥", "반찬", "국", "찌개", "후식"];
  const userContext = useContext(UserContext);
  const { recipeType, setUserInfo } = userContext;

  const choiceRecipeType = (idx: number) => {
    console.log(recipeKind[idx]);
    setUserInfo((prev) => {
      return { ...prev, recipeType: recipeKind[idx] };
    });
  };

  return (
    <>
      <QuestionText>
        만들어 먹을 요리의 종류를 <br /> 선택해주세요.
        {recipeKind.map((recipe, idx) => {
          return (
            <RecipeItem
              key={idx}
              onClick={() => choiceRecipeType(idx)}
              style={
                recipeKind.findIndex((kind) => kind === recipeType) === idx
                  ? {
                      backgroundColor: "#573001",
                    }
                  : {}
              }
            >
              {recipe}
            </RecipeItem>
          );
        })}
      </QuestionText>
    </>
  );
};

export default RecipeKindStep;
