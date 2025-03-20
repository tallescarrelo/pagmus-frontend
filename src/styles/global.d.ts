import { createGlobalStyle } from 'styled-components'


export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        transition: all 1s;
        background: ${props => props.theme.colors.secondary};
    }

    body, button {
        font: 400 1rem sans-serif
    }

    a {
        text-decoration: none;
    }

`
