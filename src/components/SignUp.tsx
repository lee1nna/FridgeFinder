import styled from "styled-components";
import { QuestionText } from "./RecipeIngredientStep";
import Wrapper from "./Wrapper";
import { StepButton } from "../pages/RecommendMenu";
import { FlexRow } from "./DietResultStep";
import { ChangeEvent, useState } from "react";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

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
  const [isPwError, setIsPwError] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const navigation = useNavigate();
  

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
        console.log(err)
        if(err.code === "auth/weak-password") {
          setIsPwError(true)
        } else {
          setIsPwError(false)
        }

        if (err.code === "auth/email-already-in-use") {
          setIsEmailError(true)
        } else {
          setIsEmailError(false)
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
            onChange={(e) => setEmail(e.target.value)}
            fontSize='16px'
            isError={isEmailError}
            errorMsg={"이미 등록된 이메일입니다. 다른 이메일을 입력해주세요."}
          ></Input>
        </InputWrap>
        <InputWrap>
          <Label>비밀번호</Label>
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassowrd(e.target.value)}
            fontSize='16px'
            isError={isPwError}
            errorMsg={'비밀번호는 6자 이상이여야 합니다.'}
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
