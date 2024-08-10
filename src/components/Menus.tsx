import styled from "styled-components";

const MenuWrapper = styled.div`
  /* background-color: #fff; */
  width: 100%;
  height: 100%;
`;

const MenuList = styled.ul`
  padding: 10px;
  height: calc(100% - 20px);
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  gap: 15px;
`;

const MenuItem = styled.li<{ isOpen: boolean }>`
  cursor: ${(props) => (props.isOpen ? "pointer" : "default")};
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;
  height: 33%;
  border-radius: 20px;
  border: 2px solid ${(props) => (props.isOpen ? "#333" : "#d0d0d0")};
  background-color: #fff;
  font-size: 18px;
  color: ${(props) => (props.isOpen ? "#333" : "#cfcfcf")};
`;

type Menu = {
  id: number;
  name: string;
  isOpen: boolean;
};

const Menus = () => {
  const menuList: Menu[] = [
    { id: 1, name: "냉장고 재료로 레시피 추천받기", isOpen: true },
    { id: 2, name: "주간식단 추천받기", isOpen: true },
    { id: 3, name: "보관된 레시피 보기", isOpen: false },
  ];

  return (
    <MenuWrapper>
      <MenuList>
        {menuList.map((menu) => {
          return (
            <MenuItem key={menu.id} isOpen={menu.isOpen}>
              {menu.name}
              {!menu.isOpen && "(준비중)"}
            </MenuItem>
          );
        })}
      </MenuList>
    </MenuWrapper>
  );
};

export default Menus;
