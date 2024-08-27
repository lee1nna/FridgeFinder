import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "../components/DietResultStep";
import { QuestionText } from "../components/RecipeIngredientStep";
import RecipeModal from "../components/RecipeModal";
import Wrapper from "../components/Wrapper";
import { LoadingContext } from "../context/LoadingContext";
import { auth, db } from "../firebase";
import { RecipeRes } from "../type/recipe";
import { StepButton, StyledLink } from "./RecommendMenu";

const RecipeUl = styled.ul`
  margin: 0;
  padding: 0;
  max-height: calc(100% - 120px);
  overflow-y: auto;
`

const RecipeLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 20px 15px;
  border-radius: 20px;
  background-color: #fff;
  margin: 15px 0;
`

const FavoriteRecipe = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const loadingContext = useContext(LoadingContext);
  const { setIsLoading } = loadingContext;
  const [isRecipe, setIsRecipe] = useState<boolean | undefined>(undefined);

  const getFirebaseData = async () => {
    setIsLoading({isLoading: true});
    const docRef = doc(db, 'users', auth.currentUser?.uid!, 'favorite_recipes', 'DJJoxCmhPZZafMy5xx0g')
    
    try {
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      if(data) {
        setFavoriteRecipes(data.RCP_NM)
      }

    } catch(err) {
      console.log(err)
    }
    setIsLoading({isLoading: false});
  }

  useEffect(() => {
    getFirebaseData()
  }, [isRecipe])

  const { REACT_APP_RECIPE_API_KEY, REACT_APP_API_URL } = process.env;
  const [recipe, setRecipe] = useState<RecipeRes>();

  const fetchRecipe = async (recipe:string) => {
    let tempRecipe = recipe.split('&')[0]

    const url = `${REACT_APP_API_URL}/${REACT_APP_RECIPE_API_KEY}/COOKRCP01/json/1/1/RCP_NM=${tempRecipe}`;

    try {
      const res = await axios.get(url);
      setRecipe(res.data.COOKRCP01.row[0])
      setIsRecipe(true)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          alert("서버와의 연결이 끊겼습니다. 잠시 후 다시 시도해주세요.");
        }
      }
    }
  }

  return <Wrapper>
    <QuestionText>⭐️ 보관된 레시피 ⭐️</QuestionText>
     <RecipeUl>
    {
      favoriteRecipes.map(recipe => {
        return <RecipeLi>{recipe} 
        <Button onClick={() => {fetchRecipe(recipe)}}>레시피보기</Button>
        </RecipeLi>
      })
    }
     </RecipeUl>
     {isRecipe !== undefined && (
        <RecipeModal
          modalStatus={isRecipe}
          offModal={() => setIsRecipe(false)}
          recipe={recipe}
        />
      )}
      {
          <StepButton backgroundColor="#ff6f6f" style={{position: 'absolute', bottom:'30px'}}>
            <StyledLink to={"/"}>
              이전
            </StyledLink>
          </StepButton>
      }
  </Wrapper>;
};

export default FavoriteRecipe;
