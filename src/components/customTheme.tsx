// theme.ts

// 1. import `extendTheme` function
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#0E041F')(props),
    },
  }),
};

// 3. extend the theme
const customTheme = extendTheme({ config, styles });

export default customTheme;
