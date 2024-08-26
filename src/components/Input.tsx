import { ChangeEvent } from "react";
import { styled } from "styled-components";

type InputProp = React.InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    fontSize: string;
    isError: boolean;
    errorMsg?: string;
    marginBottom?: string;
    marginTop?: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Text = styled.div`
  color: #ff6161;
  margin: 5px 0 0 0;
  padding: 0 5px;
  font-size: 14px;
`;

const InputStyle = styled.input<InputProp>`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  font-size: ${props => props.fontSize};
  padding: 20px;
  margin-bottom: ${props => props.marginBottom? props.marginBottom : 0};
  margin-top: ${props => props.marginTop? props.marginTop : 0}
`;

const Input = (props:InputProp) => {
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e)
    }

    return (
        <>
            <InputStyle {...props} onChange={onChangeValue}></InputStyle>
            {
                props.isError && <Text>
                {props.errorMsg}
                </Text>
            }
        </>
    )
}

export default Input