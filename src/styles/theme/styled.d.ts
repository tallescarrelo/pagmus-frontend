import 'styled-components'


declare module 'styled-components' {
    export interface DefaultTheme {
        title: string
        colors: {
            primary: string
            background: string
            header: string
            statusBackground: string
            statusBorder: string
            border: string
            secondary: string
            button: string
            text: string
            textButton: string
            value: string
            trBackground: string
            trBorder: string
            thColor: string
            headerBackground: string
            headerBorder: string
            notifyBackground: string
            secondaryGray: string
            blackLight: string
        }
    }
}