import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { LoadingContext } from "../context/LoadingContext";
import { RecipeRes } from "../type/recipe";
import crying from "../assets/icon/crying_icon.png";
import RecipeModal from "./RecipeModal";

const DietWrap = styled.div``;
const Text = styled.span<{ marginRight?: string; width: string }>`
  width: ${(props) => props.width};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)};
`;
const FlexColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const FoodImg = styled.img`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 6px 6px 15px 1px #c99e6b;
  margin: 0 15px;
`;

export const Button = styled.button`
  font-size: 14px;
  box-shadow: 0px 5px 0px 0px #007144;
  background-color: #21825b;
  white-space: nowrap;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
  border: 0;
  cursor: pointer;
`;

const DietResultStep = () => {
  const userConext = useContext(UserContext);
  const { mainIngredient } = userConext;
  const loadingContext = useContext(LoadingContext);
  const { setIsLoading } = loadingContext;
  const { REACT_APP_RECIPE_API_KEY, REACT_APP_API_URL } = process.env;
  const [recommendDiet, setRecommendDiet] = useState<RecipeRes[]>();
  const week = ["월", "화", "수", "목", "금", "토", "일"];
  const [isRecipe, setIsRecipe] = useState(false);
  const [recipe, setRecipe] = useState<RecipeRes>();

  const fetchDietRecipe = async () => {
    const randomIndex = Math.floor(Math.random() * 15);
    const ingredientQuery = mainIngredient.length
      ? `/RCP_PARTS_DTLS=${mainIngredient}`
      : "";
    const url = `${REACT_APP_API_URL}/${REACT_APP_RECIPE_API_KEY}/COOKRCP01/json/${randomIndex}/${
      randomIndex + 6
    }${ingredientQuery}`;

    setIsLoading({ isLoading: true });

    try {
      const res = await axios.get(url);
      console.log(res);
      setRecommendDiet(res.data.COOKRCP01.row);
    } catch (err) {
      console.log(err);
    }

    setIsLoading({ isLoading: false });
  };

  const openRecipeModal = (recipe: RecipeRes) => {
    setRecipe(recipe);
    setIsRecipe(true);
  };

  useEffect(() => {
    fetchDietRecipe();
  }, []);

  return (
    <DietWrap>
      <span style={{ color: "#ff8c00" }}>
        {mainIngredient.length ? mainIngredient : "랜덤 메뉴"}
      </span>
      를 이용한 주간식단메뉴입니다.
      <FlexColumn>
        {recommendDiet?.map((diet, idx) => {
          return (
            <FlexRow key={`diet_${idx}`}>
              <Text width="30px">{week[idx]}</Text>
              <FoodImg src={diet?.ATT_FILE_NO_MAIN || crying} alt="food_img" />
              <FlexColumn>
                <Text width="150px">{diet.RCP_NM}</Text>
              </FlexColumn>
              <Button onClick={() => openRecipeModal(diet)}>레시피보기</Button>
            </FlexRow>
          );
        })}
      </FlexColumn>
      {recipe?.RCP_NM && (
        <RecipeModal
          modalStatus={isRecipe}
          offModal={() => setIsRecipe(false)}
          recipe={recipe}
        />
      )}
    </DietWrap>
  );
};

export default DietResultStep;
