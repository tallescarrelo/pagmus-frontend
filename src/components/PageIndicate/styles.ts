import styled from "styled-components";

type PropsPageIndicate = {
  mt?: number;
  mb?: number;
};

type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div<PropsPageIndicate>`
  display: flex;
  align-items: center;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "0")};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0")};
`;

export const SeparatorVertical = styled.div`
  width: 4px;
  height: 18px;
  border-radius: 2px;
  background:#44ADD4;
  margin-right: 8px;
`;

export const Label = styled.h3<PropsDark>`
  color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#334155")};
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0.01em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;