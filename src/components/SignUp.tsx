import styled from "styled-components";
import { Input, QuestionText } from "./RecipeIngredientStep";
import Wrapper from "./Wrapper";
import { StepButton } from "../pages/RecommendMenu";
import { FlexRow } from "./DietResultStep";
import { ChangeEvent, useState } from "react";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignUpForm = styled.div`
  margin-top: 50px;
`;
const InputWrap = styled.div`
  margin-top: 30px;
`;
const Label = styled.div`
  margin-bottom: 10px;
  padding: 0 5px;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigation = useNavigate();

  const changeEmailinput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePasswordinput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassowrd(e.target.value);
  };

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("회원가입 성공:", user);
        alert(
          "회원가입을 축하합니다! 로그인 후 냉장고 털기 기능을 이용해보세요."
        );
        navigation("/sign-in");
      })
      .catch((err: AuthError) => {
        if (err.code === "auth/email-already-in-use") {
          alert("이미 등록된 이메일입니다. 다른 이메일을 입력해주세요.");
        }
      });
  };

  return (
    <Wrapper>
      <QuestionText>
        회원가입을 위해 <br />
        정보를 입력해주세요
      </QuestionText>
      <SignUpForm>
        <InputWrap>
          <Label>이메일</Label>
          <Input
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeEmailinput(e)}
          ></Input>
        </InputWrap>
        <InputWrap>
          <Label>비밀번호</Label>
          <Input
            value={password}
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changePasswordinput(e)
            }
          ></Input>
        </InputWrap>
      </SignUpForm>
      <FlexRow>
        <StepButton
          backgroundColor={"#007144"}
          disabled={!email || !password}
          style={{ marginTop: "70px", padding: "0 20px" }}
          onClick={signUpWithEmail}
        >
          회원가입
        </StepButton>
      </FlexRow>
    </Wrapper>
  );
};

export default SignUp;
