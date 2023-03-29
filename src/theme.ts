import { extendTheme } from '@chakra-ui/react';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Chakra UI docs theme: https://github.com/chakra-ui/chakra-ui-docs/blob/main/theme.ts
// MDX Components: https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/components/mdx-components/mdx-components.tsx

const customTheme = extendTheme({
  config: {},
  semanticTokens: {
    colors: {
      accent: { default: 'teal.500', _dark: 'teal.300' },
      fg: { default: 'gray.700', _dark: 'gray.100' },
    },
  },
  fonts: {
    heading: `${inter.style.fontFamily}, sans-serif`,
    body: `${inter.style.fontFamily}, sans-serif`,
  },
  styles: {
    global: {
      body: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        color: 'fg',
      },
    },
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: '-0.015em',
      lineHeight: '1.24',
      fontSize: { base: '2rem', md: '3.5rem' },
    },
    'heading-2': {
      fontFamily: 'heading',
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: '-0.015em',
      lineHeight: '1.24',
      fontSize: { base: '1.75rem', md: '2.75rem' },
    },
    caps: {
      textTransform: 'uppercase',
      fontSize: 'sm',
      letterSpacing: 'widest',
      fontWeight: 'bold',
    },
  },
  content: {
    h1: {
      mt: '2rem',
      mb: '.25rem',
      lineHeight: 1.2,
      fontWeight: 'bold',
      fontSize: '1.875rem',
      letterSpacing: '-.025em',
    },
    h2: {
      mt: '3rem',
      mb: '0.5rem',
      lineHeight: 1.3,
      fontWeight: 'semibold',
      fontSize: '1.5rem',
      letterSpacing: '-.025em',
      '& + h3': {
        mt: '1.5rem',
      },
      'blockquote &:first-child': {
        mt: 0,
      },
    },
    h3: {
      mt: '3rem',
      // mb: "0.5rem",
      lineHeight: 1.25,
      fontWeight: 'semibold',
      fontSize: '1.25rem',
      letterSpacing: '-.025em',
      'blockquote &:first-child': {
        mt: 0,
      },
    },
    h4: {
      mt: '3rem',
      lineHeight: 1.375,
      fontWeight: 'semibold',
      fontSize: '1.125rem',
      'blockquote &:first-child': {
        mt: 0,
      },
    },
    a: {
      fontWeight: 'semibold',
    },
    p: {
      mt: '1.25rem',
      lineHeight: 1.7,
      'blockquote &:first-child': {
        mt: 0,
      },
    },
    hr: {
      my: '4rem',
    },
    ul: {
      mt: '0.5rem',
      ml: '1.25rem',
      'blockquote &': { mt: 0 },
      '& > * + *': {
        mt: '0.25rem',
      },
    },
    ol: {
      mt: '0.5rem',
      ml: '1.50rem',
      'blockquote &': { mt: 0 },
      '& > * + *': {
        mt: '0.25rem',
      },
    },
    code: {
      rounded: 'sm',
      px: '1',
      fontSize: '0.875em',
      py: '2px',
      lineHeight: 'normal',
    },
  },
});

export default customTheme;
