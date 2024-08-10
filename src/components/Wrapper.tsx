import styled from "styled-components";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrap = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #f5f5dc;
  padding: 20px;
`;

const Wrapper = ({ children }: WrapperProps) => {
  return <Wrap>{children}</Wrap>;
};

export default Wrapper;
