import styled from "styled-components";

const QuestionText = styled.h3`
  line-height: 25px;
`;
const WarningText = styled.h5`
  color: #ff6161;
  margin: 5px 0 0 0;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  font-size: 20px;
  padding: 20px;
`;

const Step2 = () => {
  return (
    <>
      <QuestionText>
        사용 할 냉장고의 메인 재료를 <br /> 입력해주세요.
        <WarningText>
          재료명에 오타가 있을 경우 <br /> 정확한 추천이 어려울 수 있습니다 🥲
        </WarningText>
      </QuestionText>
      <Input></Input>
    </>
  );
};

export default Step2;
