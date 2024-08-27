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

const Text = styled.div`
  color: #ff6161;
  margin: 5px 0 0 0;
  padding: 0 5px;
  position:relative;
  top: 30px;
  text-align: center;
  font-size: 14px;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [isPwError, setIsPwError] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const [pwErrorMsg, setPwErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [commonErrorMsg, setCommonErrorMsg] = useState('')
  const navigation = useNavigate();

  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setIsPwError(false)
        setIsEmailError(false)
        setCommonErrorMsg('')
        alert(
          "회원가입을 축하합니다! 로그인 후 냉장고 털기 기능을 이용해보세요."
        );
        navigation("/sign-in");
      })
      .catch((err: AuthError) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setIsPwError(false)
            setIsEmailError(true)
            setEmailErrorMsg("이미 사용 중인 이메일입니다.")
            break;
          case "auth/weak-password":
            setIsPwError(true)
            setIsEmailError(false)
            setPwErrorMsg("비밀번호는 6글자 이상이어야 합니다.")
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
            setCommonErrorMsg("회원가입에 실패 하였습니다.")
            break;
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
            errorMsg={isEmailError? emailErrorMsg:''}
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
            errorMsg={isPwError? pwErrorMsg:''}
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
          onClick={signUpWithEmail}
        >
          회원가입
        </StepButton>
      </FlexRow>
    </Wrapper>
  );
};

export default SignUp;
