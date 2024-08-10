import styled from "styled-components";
import Wrapper from "../components/Wrapper";
import carrot from "../assets/icon/carrots.png";
import lettuce from "../assets/icon/lettuce.png";
import tomato from "../assets/icon/tomato.png";
import avocado from "../assets/icon/avocado.png";
import eggplant from "../assets/icon/eggplant.png";
import { useEffect, useState } from "react";
import Icon from "../components/Icon";

const FridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const FridgeTop = styled.div`
  position: relative;
  background-color: #9cc5a0;
  padding: 0 15px;
  border: 3px solid #333;
  border-radius: 25px 25px 5px 5px;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FridgeBottom = styled.div`
  background-color: #9cc5a0;
  border: 3px solid #333;
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
  @media (max-width: 400px) {
    font-size: 35px;
  }
`;

const Grib = styled.div`
  background-color: #bdbdbd;
  border: 3px solid #333;
  border-radius: 10px;
  width: 20px;
  height: 60px;
`;

const Home = () => {
  const [icons, setIcons] = useState([
    {
      src: carrot,
      alt: "carrot_icon",
      top: "20%",
      left: "10%",
      scale: 0,
    },
    {
      src: tomato,
      alt: "tomato_icon",
      top: "20%",
      left: "75%",
      scale: 0,
    },
    {
      src: eggplant,
      alt: "eggplant_icon",
      top: "60%",
      left: "70%",
      scale: 0,
    },
    {
      src: lettuce,
      alt: "lettuce_icon",
      top: "10%",
      left: "45%",
      scale: 0,
    },
    {
      src: avocado,
      alt: "avocado_icon",
      top: "60%",
      left: "15%",
      scale: 0,
    },
  ]);

  useEffect(() => {
    let seconds = 0;

    icons.forEach((icon, idx) => {
      seconds += 300;

      setTimeout(() => {
        if (idx > 1) {
          setIcons((prev) => {
            let newIcon = [...prev];
            newIcon[idx - 1].scale = 1;
            return newIcon;
          });
        }

        setIcons((prev) => {
          let newIcon = [...prev];
          newIcon[idx].scale = 1.5;
          return newIcon;
        });
      }, seconds);
    });
  }, []);

  return (
    <Wrapper>
      <FridgeContainer>
        <FridgeTop>
          {icons.map((icon) => {
            return (
              <Icon
                position={"absolute"}
                src={icon.src}
                alt={icon.alt}
                top={icon.top}
                left={icon.left}
                scale={icon.scale}
                width={"50px"}
                height={"50px"}
                $mediaWidth={"45px"}
                $mediaHeight={"45px"}
                $transitionDuration={"2s"}
              />
            );
          })}
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
