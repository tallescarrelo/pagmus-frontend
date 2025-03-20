import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/icons/check_circle_outline2x.png";
import gearIcon from "../../assets/icons/settings.png";
import { RoundedButton } from "./styles";

interface PropsButton {
  darkMode?: boolean;
}

const IntegrationButtonGroup: React.FC<PropsButton> = ({ darkMode }) => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Shopify", path: "/shopify", active: false, icon: checkIcon },
    { label: "Shopee", path: "/shopee", active: false, icon: checkIcon },
    { label: "AliExpress", path: "/aliexpress", active: false, icon: checkIcon },
    { label: "Reviews", path: "/reviews", active: false, icon: checkIcon },
    { label: "Sync produtos", path: "/sync-produtos", active: false, icon: checkIcon },
    { label: "Gateway pagamentos", path: "/gateway-pagamentos", active: false, icon: checkIcon },
    { label: "Integrações", path: "/integration", active: true, icon: gearIcon },
  ];

  const handleButtonClick = (button) => {
    if (button.path) {
      navigate(button.path);
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {buttons.map((button, index) => (
        <RoundedButton
          key={index}
          
          active={button.active}
          onClick={() => handleButtonClick(button)}
        >
          {button.label}
          <img src={button.icon} alt="icon" />
        </RoundedButton>
      ))}
    </div>
  );
};

export default IntegrationButtonGroup;
