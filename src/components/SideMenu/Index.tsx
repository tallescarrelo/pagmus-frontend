import React, { useState } from "react";
import { MenuContainer, MenuItem, MenuLabel, ArrowIcon } from "./styles";

const SideMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    { label: "Loja Virtual" },
    { label: "Checkout" },
    { label: "Ads" },
    { label: "Custo" },
    { label: "Gateway" },
    { label: "Infoproduto" },
  ];

  const handleClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <MenuContainer>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => handleClick(item.label)}
          className={activeItem === item.label ? "active" : ""}
        >
          <MenuLabel>{item.label}</MenuLabel>
          <ArrowIcon>&gt;</ArrowIcon>
        </MenuItem>
      ))}
    </MenuContainer>
  );
};

export default SideMenu;
