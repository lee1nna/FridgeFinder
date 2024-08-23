import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { StepButton } from "../pages/RecommendMenu";
import { FlexRow } from "./DietResultStep";
import { Input, QuestionText } from "./RecipeIngredientStep";
import Wrapper from "./Wrapper";

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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigation = useNavigate();

  const authContext = useContext(AuthContext)
  const {setUser} = authContext

  const changeEmailinput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePasswordinput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassowrd(e.target.value);
  };

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("로그인 성공:", user);
        setUser(user)
        navigation("/");
      })
      .catch((err: AuthError) => {
        console.log('로그인 실패:', err)
      
        if (err.code === "auth/invalid-credential") {
          alert("등록된 회원 정보가 아닙니다. 다시 입력해주세요.");
        } else if(err.code === "auth/invalid-email") {
          alert("등록된 이메일이 아닙니다. 다시 입력해주세요.")
        }
      });
  };

  return (
    <Wrapper>
      <QuestionText>로그인 후 <br/>
      냉장고 털기를 이용해보세요.</QuestionText>
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
          onClick={signInWithEmail}
        >
          로그인
        </StepButton>
      </FlexRow>
    </Wrapper>
  );
};

export default SignIn;
