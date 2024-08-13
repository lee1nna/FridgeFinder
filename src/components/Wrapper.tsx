import styled from "styled-components";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  background-color: #f5f5dc;
  padding: 100px 20px;
`;

const Wrapper = ({ children }: WrapperProps) => {
  return <Wrap>{children}</Wrap>;
};

export default Wrapper;
