import styled from "styled-components";

const QuestionText = styled.h3``;

const RecipeItem = styled.div`
  background-color: #ff8c00;
  border-radius: 20px;
  color: #fff;
  padding: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

type recipeType = "밥" | "반찬" | "국" | "찌개" | "후식";

const Step1 = () => {
  const recipeKind = ["밥", "반찬", "국", "찌개", "후식"];

  return (
    <>
      <QuestionText>
        만들어 먹을 요리의 종류를 선택해주세요.
        {recipeKind.map((recipe, idx) => {
          return <RecipeItem key={idx}>{recipe}</RecipeItem>;
        })}
      </QuestionText>
    </>
  );
};

export default Step1;
