import { HTMLChakraProps, ChakraComponent, As, chakra } from '@chakra-ui/react';
import React from 'react';

export default function LinkedHeading({
  heading: Heading,
  ...props
}: HTMLChakraProps<As> & { heading: ChakraComponent<As> }) {
  return (
    <Heading data-group="" css={{ scrollMarginBlock: '6.875rem' }} {...props}>
      {props.children}
      {props.id && (
        <chakra.a
          aria-label="anchor"
          color="teal.500"
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: 'outline' }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </Heading>
  );
}
