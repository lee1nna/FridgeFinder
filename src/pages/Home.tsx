import styled from "styled-components";
import Wrapper from "../components/Wrapper";
import carrot from "../assets/icon/carrots.png";
import lettuce from "../assets/icon/lettuce.png";
import tomato from "../assets/icon/tomato.png";
import avocado from "../assets/icon/avocado.png";
import eggplant from "../assets/icon/eggplant.png";
import { useEffect, useState } from "react";

const FridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const FridgeTop = styled.div`
  position: relative;
  background-color: #e1a696;
  padding: 0 15px;
  border: 5px solid #333;
  border-radius: 25px 25px 5px 5px;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FridgeBottom = styled.div`
  background-color: #e1a696;
  border: 5px solid #333;
  border-radius: 5px 5px 25px 25px;
  height: 60%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  position: relative;
  display: block;
  margin: 0;
  text-align: center;
  font-size: 45px;
  color: #fff;
  @media only screen and (max-width: 400px) {
    font-size: 35px;
  }
`;

const Grib = styled.div`
  background-color: #bdbdbd;
  border: 5px solid #333;
  border-radius: 10px;
  width: 20px;
  height: 60px;
`;

const Icon = styled.img<{
  top: string;
  left: string;
  transitionDuration: string;
  scale?: number;
}>`
  position: absolute;
  width: 50px;
  height: 50px;
  object-fit: cover;
  top: ${(prop) => prop.top};
  left: ${(prop) => prop.left};
  transition-duration: ${(prop) => prop.transitionDuration};
  transform: scale(${(prop) => (prop.scale ? prop.scale : 0)});
  @media only screen and (max-width: 400px) {
    width: 45px;
    height: 45px;
  }
`;

const Home = () => {
  const [carrotScale, setCarrotScale] = useState(0);
  const [eggPlantScale, setEggPlantScale] = useState(0);
  const [tomatoScale, setTomatoScale] = useState(0);
  const [lettuceScale, setLettuceScale] = useState(0);
  const [avocadoScale, setAvocadoScale] = useState(0);

  useEffect(() => {
    setCarrotScale(1.5);
    setTimeout(() => {
      setCarrotScale(1);
      setTomatoScale(1.5);
    }, 300);
    setTimeout(() => {
      setTomatoScale(1);
      setEggPlantScale(1.5);
    }, 600);
    setTimeout(() => {
      setEggPlantScale(1);
      setLettuceScale(1.5);
    }, 900);
    setTimeout(() => {
      setLettuceScale(1);
      setAvocadoScale(1.5);
    }, 1200);
    setTimeout(() => {
      setAvocadoScale(1);
    }, 1500);
  }, []);

  return (
    <Wrapper>
      <FridgeContainer>
        <FridgeTop>
          <Icon
            src={carrot}
            alt="carrot_icon"
            top={"20%"}
            left={"10%"}
            transitionDuration={"0.3s"}
            scale={carrotScale}
          ></Icon>
          <Icon
            src={eggplant}
            alt="eggplant_icon"
            top={"60%"}
            left={"70%"}
            transitionDuration={"0.3s"}
            scale={eggPlantScale}
          ></Icon>
          <Icon
            src={avocado}
            alt="avocado_icon"
            top={"60%"}
            left={"15%"}
            transitionDuration={"0.3s"}
            scale={avocadoScale}
          ></Icon>
          <Icon
            src={lettuce}
            alt="lettuce_icon"
            top={"10%"}
            left={"45%"}
            transitionDuration={"0.3s"}
            scale={lettuceScale}
          ></Icon>
          <Icon
            src={tomato}
            alt="tomato_icon"
            top={"20%"}
            left={"75%"}
            transitionDuration={"0.3s"}
            scale={tomatoScale}
          ></Icon>
          <Text>냉장고 털기</Text>
        </FridgeTop>
        <FridgeBottom>
          <Grib />
        </FridgeBottom>
      </FridgeContainer>
    </Wrapper>
  );
};

export default Home;
