import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import tomato from "../assets/icon/tomato.png";

const LoadingWrap = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 1;
  width: 100%;
  max-width: 440px;
`;

const LoadingBarWrap = styled.div`
  display: flex;
  background-color: #f5f5dc;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const LoadingBar = styled.img<{ scale: number }>`
  width: 30px;
  height: 30px;
  scale: ${(props) => props.scale};
`;

const Loading = () => {
  const [scaleArr, setScaleArr] = useState([1, 1, 1]);

  const index = useRef(0);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setScaleArr((prev) => {
        console.log(index.current);
        const newArray = [1, 1, 1];
        newArray[index.current] = 1.3;

        return newArray;
      });

      index.current = (index.current + 1) % 3;
    }, 300);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <LoadingWrap>
      <LoadingBarWrap>
        {scaleArr.map((scale) => {
          return <LoadingBar src={tomato} scale={scale}></LoadingBar>;
        })}
      </LoadingBarWrap>
    </LoadingWrap>
  );
};

export default Loading;
