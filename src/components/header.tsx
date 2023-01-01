import { Box, HStack, IconButton, LinkProps, Show } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { A } from './content';
import { FiMenu } from 'react-icons/fi';

type Tab = { name: string; href: string };
const tabs: Tab[] = [
  { name: 'Media', href: '/media' },
  { name: 'About', href: '/about' },
];

function NavItem({
  active,
  href,
  children,
  ...props
}: LinkProps & {
  active: boolean;
}): JSX.Element {
  return (
    <Box as="li">
      <A href={href} textDecoration={active ? 'underline' : ''} {...props}>
        {children}
      </A>
    </Box>
  );
}

export default function Header(): JSX.Element {
  const router = useRouter();

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
          <NavItem href="/" active={false} _hover={{ textDecoration: '' }}>
            Claus Höfele
          </NavItem>
          <Show above="md">
            <HStack spacing="1.5rem">
              {tabs.map((tab) => (
                <NavItem
                  key={tab.name}
                  href={tab.href}
                  active={router.asPath === tab.href}
                >
                  {tab.name}
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
