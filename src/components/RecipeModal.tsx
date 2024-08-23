import styled from "styled-components";
import { RecipeRes } from "../type/recipe";
import { useEffect, useState } from "react";
import Favorite from "./Favorite";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

type RecipeModalProps = {
  recipe: RecipeRes | undefined;
  offModal: () => void;
  modalStatus: boolean | undefined;
};

const ModalBg = styled.div<{ modalStatus: undefined | boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  ${(props) =>
    props.modalStatus === false &&
    `
    animation: fadeOut 1s forwards;
  `}
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
`;

const RecipeBg = styled(ModalBg)``;

const Modal = styled.div<{ animation?: string }>`
  position: relative;
  height: 75%;
  background-color: #ff833a;
  border-radius: 40px 40px 0px 0px;
  z-index: 2;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  animation: ${(props) => (props.animation ? props.animation : "none")};
  @keyframes upSlide {
    from {
      bottom: -100%;
    }
    to {
      bottom: -25%;
    }
  }
  @keyframes downSlide {
    from {
      bottom: -25%;
    }
    to {
      bottom: -100%;
    }
  }
`;

const Text = styled.div<{
  fontSize: string;
  align: string;
  marginTop?: string;
}>`
  color: #fff;
  text-align: ${(props) => props.align};
  font-size: ${(props) => props.fontSize};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  line-height: 25px;
`;

const RecipeModal = ({ recipe, offModal, modalStatus }: RecipeModalProps) => {
  const [menualKey, setMenualKey] = useState<string[]>([]);
  const reg = /^MANUAL(0[1-9]|1[0-9]|20)$/;
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteRecipes, setFavoriteRecipes] = useState([])

  useEffect(() => {
    if (recipe) {
      setMenualKey(
        Object.keys(recipe).filter((key: string) => {
          return reg.test(key);
        })
      );
    }

    setMenualKey((prev) => {
      return prev.sort(function (a, b) {
        return a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });
    });
  }, []);

  const getFirebaseData = async () => {
    const docRef = doc(db, 'users', auth.currentUser?.uid!, 'favorite_recipes', 'DJJoxCmhPZZafMy5xx0g')

    try {
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      if(data) {
        setFavoriteRecipes(data.RCP_NM)
        setIsFavorite(data.RCP_NM?.findIndex((recipes:string) => recipes === recipe?.RCP_NM) !== -1)
      }

    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFirebaseData()
  },[modalStatus])

  const clickFavoriteRecipe = async (recipeName: string) => {
    console.log('auth.currentUser?.uid!',auth.currentUser?.uid!)
    const docRef = doc(db, 'users', auth.currentUser?.uid!, 'favorite_recipes', 'DJJoxCmhPZZafMy5xx0g')
    const docSnap = await getDoc(docRef);


    // 즐겨찾는 레시피 추가
    if(!isFavorite) {
      try {
        if(docSnap.exists()){
          await updateDoc(docRef, {
            RCP_NM: arrayUnion(recipeName)
          });
        } else {
          await setDoc(docRef,{
            RCP_NM: arrayUnion(recipeName)
          });
      }
    setIsFavorite(true)
    } catch(err) {
      console.log('데이터 저장 err', err)
    }
    } else {
      try {
        const res = await updateDoc(docRef, {
          RCP_NM: arrayRemove(recipeName)
      });

      setIsFavorite(false)
      } catch(err) {
        console.log('데이터 삭제 err', err)
      }
      
    }
  }

  useEffect(() => {

    console.log('isFavorite::', isFavorite)
  }, [isFavorite])

  return (
    <ModalBg modalStatus={modalStatus ? modalStatus : false}>
      <RecipeBg
        modalStatus={modalStatus ? modalStatus : false}
        onClick={() => offModal()}
      ></RecipeBg>
      <Modal
        animation={
          modalStatus ? "upSlide 1s forwards" : "downSlide 1s forwards"
        }
      >
        <Text fontSize="20px" align="center">
          {recipe?.RCP_NM} 레시피
          <Favorite onClickHandler={() => clickFavoriteRecipe(recipe?.RCP_NM!)} isFavorite={isFavorite}></Favorite>
        </Text>
        <Text fontSize="16px" align="left" marginTop="30px">
          재료 - {recipe?.RCP_PARTS_DTLS}
        </Text>
        <Text fontSize="16px" align="left" marginTop="15px">
          팁 - {recipe?.RCP_NA_TIP}
        </Text>
        <Text fontSize="14px" align="left" marginTop="20px">
          {menualKey?.map((key, idx) => {
            if (recipe && recipe[key as keyof RecipeRes] !== "") {
              return (
                <Text
                  key={`menual_${idx}`}
                  fontSize="15px"
                  align="left"
                  marginTop="15px"
                >
                  {recipe[key as keyof RecipeRes]} <br />
                </Text>
              );
            }
          })}
        </Text>
      </Modal>
    </ModalBg>
  );
};

export default RecipeModal;
