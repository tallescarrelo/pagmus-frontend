import fonts from "google-fonts";
import { createGlobalStyle } from "styled-components";

fonts.add({
  Roboto: ["700", "500", "400"],
  Comme: ["700", "400"],
  Knockout_Wide: ["500"],
  Inter: ["700", "500", "400"],
  Nunito: ["700", "500", "400"],
});

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #FAFAFA;
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
    font-family:  sans-serif;
    font-weight: 400;
}

a {
        text-decoration: none;
    }

    h1, h2,h3,p,span {
        font-family: 'Inter', sans-serif;
    }
`;
