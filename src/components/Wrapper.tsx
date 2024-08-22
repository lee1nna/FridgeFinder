import styled from "styled-components";

type WrapperProps = {
  children: React.ReactNode;
  position?: string;
};

const Wrap = styled.div<{ position?: string }>`
  position: ${(props) => (props.position ? props.position : "relative")};
  width: 100%;
  max-width: 400px;
  background-color: #f5f5dc;
  padding: 60px 20px;
  box-sizing: border-box;
`;

const Wrapper = ({ children, position }: WrapperProps) => {
  return <Wrap position={position}>{children}</Wrap>;
};

export default Wrapper;
