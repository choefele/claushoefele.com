import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Link,
  Show,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiMenu } from 'react-icons/fi';

export default function Navigation(): JSX.Element {
  return (
    <Box as="header" boxShadow="sm">
      <Box as="nav">
        <HStack as="ul" justify="space-between">
          <Button as="li" variant="link" fontSize="xl">
            <Link as={NextLink} href="/">
              Claus Höfele
            </Link>
          </Button>
          <Show above="md">
            <ButtonGroup variant="ghost" spacing="8">
              {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                <Button as="li" key={item}>
                  <Link as={NextLink} href="#">
                    {item}
                  </Link>
                </Button>
              ))}
            </ButtonGroup>
          </Show>
          <Show below="md">
            <IconButton
              variant="ghost"
              icon={<FiMenu fontSize="1.5rem" />}
              aria-label="Open Menu"
            />
          </Show>
        </HStack>
      </Box>
    </Box>
  );
}
