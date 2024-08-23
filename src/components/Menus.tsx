import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const MenuWrapper = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;
  height: 33%;
  border-radius: 20px;
  /* border: 2px solid ${(props) => (props.isOpen ? "#fff" : "#d0d0d0")}; */
  background-color: #ff8c00;
  font-size: 18px;
`;

const StyledLink = styled(Link)<{ isOpen: boolean }>`
  cursor: ${(props) => (props.isOpen ? "pointer" : "default")};
  color: ${(props) => (props.isOpen ? "#fff" : "#cfcfcf")};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Menu = {
  id: number;
  name: string;
  isOpen: boolean;
  url: string;
};

const Menus = () => {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    console.log("isLoggedIn>>", isLoggedIn);
    if (isLoggedIn === null) {
      setMenuList([
        {
          id: 1,
          name: "로그인",
          isOpen: true,
          url: "/sign-in",
        },
        {
          id: 2,
          name: "회원가입",
          isOpen: true,
          url: "/sign-up",
        },
      ]);
    } else {
      setMenuList([
        {
          id: 1,
          name: "냉장고 재료로 레시피 추천받기",
          isOpen: true,
          url: "/recommend-menu",
        },
        {
          id: 2,
          name: "주간식단 추천받기",
          isOpen: true,
          url: "/recommend-diet",
        },
        {
          id: 3,
          name: "보관된 레시피 보기",
          isOpen: false,
          url: "/favorite-recipex",
        },
      ]);
    }
  }, []);

  return (
    <MenuWrapper>
      <MenuList>
        {menuList.map((menu) => {
          return (
            <MenuItem key={menu.id} isOpen={menu.isOpen}>
              <StyledLink to={menu.url} isOpen={menu.isOpen}>
                {menu.name}
                {!menu.isOpen && "(준비중)"}
              </StyledLink>
            </MenuItem>
          );
        })}
      </MenuList>
    </MenuWrapper>
  );
};

export default Menus;
