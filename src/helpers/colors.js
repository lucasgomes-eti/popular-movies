export const colors = {
    white: '#FFF',
    black: '#212121',

    background: (isInDarkMode) => { return isInDarkMode ? colors.black : colors.white },
    colorOnSurface: (isInDarkMode) => { return isInDarkMode ? colors.white : colors.black }
}