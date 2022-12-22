import { Box, Divider, HStack, IconButton, Link, Show } from '@chakra-ui/react';
import { A } from './content';
import NextLink from 'next/link';
import { FiMenu } from 'react-icons/fi';

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box as="li">
      <A href={href}>{children}</A>
    </Box>
  );
}

export default function Header(): JSX.Element {
  return (
    <Box as="header" py="1rem">
      <Box as="nav">
        <HStack
          as="ul"
          justify="space-between"
          fontSize="md"
          fontWeight="bold"
          listStyleType="none"
          height="3rem"
        >
          <NavItem href="/">Claus Höfele</NavItem>
          <Show above="md">
            <HStack spacing="1.5rem">
              {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                <NavItem key={item} href="#">
                  {item}
                </NavItem>
              ))}
            </HStack>
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
