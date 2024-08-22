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

  const loadingIntervalFunc = () => {
    setScaleArr((prev) => {
      let idx = prev.findIndex((scale) => scale === 1.3);
      if (idx === 2) idx = -1;
      const newArray = [1, 1, 1];
      newArray[idx + 1] = 1.3;
      return newArray;
    });
  };

  useEffect(() => {
    loadingIntervalFunc();
    const intervalTimer = setInterval(loadingIntervalFunc, 300);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <LoadingWrap>
      <LoadingBarWrap>
        {scaleArr.map((scale, idx) => {
          return (
            <LoadingBar
              key={`tomato_${idx}`}
              src={tomato}
              scale={scale}
            ></LoadingBar>
          );
        })}
      </LoadingBarWrap>
    </LoadingWrap>
  );
};

export default Loading;
