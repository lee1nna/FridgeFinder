import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { StepButton } from "../pages/RecommendMenu";
import { FlexRow } from "./DietResultStep";
import { QuestionText } from "./RecipeIngredientStep";
import Wrapper from "./Wrapper";
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
const Text = styled.div`
  color: #ff6161;
  position:relative;
  top: 30px;
  text-align: center;
  padding: 0 5px;
  font-size: 14px;
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigation = useNavigate();

  const authContext = useContext(AuthContext)
  const {setUser} = authContext;

  const [isPwError, setIsPwError] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const [pwErrorMsg, setPwErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [commonErrorMsg, setCommonErrorMsg] = useState('')

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("로그인 성공:", user);
        setUser(user)
        navigation("/");
      })
      .catch((err: AuthError) => {
        console.log(err.code)
        switch (err.code) {
          case "auth/invalid-credential" || "auth/user-not-found" || "auth/wrong-password":
            setIsPwError(false)
            setIsEmailError(false)
            setCommonErrorMsg("이메일 혹은 비밀번호가 일치하지 않습니다.")
            break;
          case "auth/network-request-failed":
            setIsPwError(false)
            setIsEmailError(false)
            setCommonErrorMsg("네트워크 연결에 실패 하였습니다.")
            break;
          case "auth/invalid-email":
            setIsPwError(false)
            setIsEmailError(true)
            setEmailErrorMsg("잘못된 이메일 형식입니다.")
            break;
          case "auth/internal-error":
            setIsPwError(false)
            setIsEmailError(false)
            setCommonErrorMsg("잘못된 요청입니다.")
            break;
          case "auth/too-many-requests":
            setIsPwError(false)
            setIsEmailError(false)
            setCommonErrorMsg("잠시 후 다시 시도해주세요.")
          break;
          default:
            setIsPwError(false)
            setIsEmailError(false)
            setCommonErrorMsg("로그인에 실패 하였습니다.")
            break;
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
            onChange={(e) => setEmail(e.target.value)}
            fontSize='16px'
            isError={isEmailError}
            errorMsg={emailErrorMsg}
          ></Input>
        </InputWrap>
        <InputWrap>
          <Label>비밀번호</Label>
          <Input
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
            fontSize='16px'
            isError={isPwError}
            errorMsg={pwErrorMsg}
            type={'password'}
          ></Input>
        </InputWrap>
        {
          commonErrorMsg && <Text>{commonErrorMsg}</Text>
        }
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
