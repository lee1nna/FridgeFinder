import styled from "styled-components";
import { RecipeRes } from "../type/recipe";
import { useEffect, useState } from "react";

type RecipeModalProps = {
  recipe: RecipeRes | undefined;
  offModal: () => void;
};

const ModalBg = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const RecipeBg = styled(ModalBg)``;

const Modal = styled.div`
  position: relative;
  height: 75%;
  background-color: #ff833a;
  border-radius: 40px 40px 0px 0px;
  z-index: 2;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  animation: upSlide 1.2s forwards;
  @keyframes upSlide {
    from {
      bottom: -100%;
    }
    to {
      bottom: -25%;
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

const RecipeModal = ({ recipe, offModal }: RecipeModalProps) => {
  const [menualKey, setMenualKey] = useState<string[]>([]);
  const reg = /^MANUAL(0[1-9]|1[0-9]|20)$/;

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
  return (
    <ModalBg>
      <RecipeBg onClick={() => offModal()}></RecipeBg>
      <Modal>
        <Text fontSize="20px" align="center">
          {recipe?.RCP_NM} 레시피
        </Text>
        <Text fontSize="16px" align="left" marginTop="30px">
          재료 - {recipe?.RCP_PARTS_DTLS}
        </Text>
        <Text fontSize="16px" align="left" marginTop="15px">
          팁 - {recipe?.RCP_NA_TIP}
        </Text>
        <Text fontSize="14px" align="left" marginTop="20px">
          {menualKey?.map((key) => {
            if (recipe && recipe[key as keyof RecipeRes] !== "") {
              return (
                <Text fontSize="15px" align="left" marginTop="15px">
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
