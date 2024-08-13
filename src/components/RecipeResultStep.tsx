import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RecipeRes } from "../type/recipe";
import crying from "../assets/icon/crying_icon.png";
import Loading from "./Loading";
import { LoadingContext } from "../context/LoadingContext";

const Text = styled.h4``;

const RecommendMenu = styled.h2`
  text-align: center;
  margin-top: 50px;
`;

const FoodImg = styled.img`
  box-sizing: border-box;
  position: relative;
  left: calc(50% - 150px);
  width: 300px;
  height: 300px;
  padding: 20px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 6px 6px 15px 1px #c99e6b;
`;

const RecipeResultStep = () => {
  const userContext = useContext(UserContext);
  const loadingContext = useContext(LoadingContext);
  const { setIsLoading } = loadingContext;
  const { recipeType, mainIngredient } = userContext;
  const [recommendRecipe, setRecommendRecipe] = useState<RecipeRes>();
  const { REACT_APP_RECIPE_API_KEY, REACT_APP_API_URL } = process.env;

  const fetchRecommendedRecipe = async () => {
    const url = `${REACT_APP_API_URL}/${REACT_APP_RECIPE_API_KEY}/COOKRCP01/json/1/100/RCP_PAT2=${recipeType}&RCP_PARTS_DTLS=${mainIngredient}`;

    setIsLoading(() => {
      return {
        isLoading: true,
      };
    });

    try {
      const res = await axios.get(url);
      if (res.data.COOKRCP01.RESULT.CODE === "INFO-200") {
        setIsLoading(() => {
          return {
            isLoading: false,
          };
        });
        return;
      }
      let randomIndex = Math.floor(
        Number(Math.random() * res.data.COOKRCP01.row.length - 1)
      );
      setRecommendRecipe(res.data.COOKRCP01.row[randomIndex]);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          alert("서버와의 연결이 끊겼습니다. 잠시 후 다시 시도해주세요.");
        }
      }
    }

    setIsLoading(() => {
      return {
        isLoading: false,
      };
    });
  };

  useEffect(() => {
    fetchRecommendedRecipe();
  }, []);

  return (
    <>
      {recommendRecipe?.RCP_NM && (
        <Text>
          <span style={{ color: "#ff8c00" }}>{mainIngredient}</span>(이)가
          들어가는 아래 메뉴를 추천드립니다!
        </Text>
      )}
      <RecommendMenu>
        {recommendRecipe?.RCP_NM ||
          `${mainIngredient}(이)가 들어가는 메뉴를 \n 찾지 못했습니다.
           \n 다른 메뉴를 입력해주세요.`}
      </RecommendMenu>
      <FoodImg
        src={recommendRecipe?.ATT_FILE_NO_MAIN || crying}
        alt="food_img"
      />
      {/* <button>레시피보기</button> */}
    </>
  );
};

export default RecipeResultStep;
