import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/icons/check_circle_outline2x.png";
import { RoundedButton } from "./styles";

interface PropsButton {
  darkMode?: boolean;
}

const ButtonGroup: React.FC<PropsButton> = ({ darkMode }) => {
  const navigate = useNavigate();

  const buttons = [
    { label: "API", active: false },
    { label: "SMS", active: false },
    { label: "Pixel", active: false },
    { label: "Rastreio", active: false },
    { label: "Integrações", active: true, path: "/integration" }, 
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
          <img 
            src={checkIcon} 
            alt="check icon" 
            style={{ width: 16, height: 16, marginLeft: 8 }}
          />
        </RoundedButton>
      ))}
    </div>
  );
};

export default ButtonGroup;
