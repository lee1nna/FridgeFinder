import styled from "styled-components";

const MenuWrapper = styled.div`
  /* background-color: #fff; */
  width: 100%;
  height: 100%;
`;

const Ul = styled.ul`
  padding: 10px;
  height: calc(100% - 20px);
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  gap: 15px;
`;

const Menu = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;
  height: 33%;
  border-radius: 20px;
  border: 2px solid #333;
  background-color: #fff;
  font-size: 18px;
`;

const Menus = () => {
  const menuList = [
    { id: 1, name: "레시피 추천받기" },
    { id: 2, name: "주간식단 추천받기" },
    { id: 3, name: "보관된 레시피 보기" },
  ];

  return (
    <MenuWrapper>
      <Ul>
        {menuList.map((menu, idx) => {
          return <Menu key={idx}>{menu.name}</Menu>;
        })}
      </Ul>
    </MenuWrapper>
  );
};

export default Menus;
