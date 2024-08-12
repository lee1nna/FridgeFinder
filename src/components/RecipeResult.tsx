import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { RecipeRes } from "../type/recipe";

const Text = styled.h4``;

const RecommendMenu = styled.h2`
  text-align: center;
  margin-top: 50px;
`;

const FoodImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 6px 6px 15px 1px #c99e6b;
`;

const Step3 = () => {
  const userContext = useContext(UserContext);
  const { recipeType, setUserInfo, mainIngredient } = userContext;
  const [recommendRecipe, setRecommendRecipe] = useState<RecipeRes>();

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env.REACT_APP_RECIPE_API_KEY);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_RECIPE_API_KEY}/COOKRCP01/json/1/1/RCP_PAT2=${recipeType}&RCP_PARTS_DTLS=${mainIngredient}`
      )
      .then((res: AxiosResponse) => {
        console.log(res);
        setRecommendRecipe(res.data.COOKRCP01.row[0]);
      });
  }, []);

  return (
    <>
      <Text>
        <span style={{ color: "#ff8c00" }}>{mainIngredient}</span>가 들어가는
        아래 메뉴를 추천드립니다!
      </Text>
      <RecommendMenu>{recommendRecipe?.RCP_NM}</RecommendMenu>
      <FoodImg src={recommendRecipe?.ATT_FILE_NO_MAIN} alt="food_img" />
      {/* <button>레시피보기</button> */}
    </>
  );
};

export default Step3;
