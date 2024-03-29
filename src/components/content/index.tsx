import { HTMLChakraProps, Alert, AlertProps, chakra } from '@chakra-ui/react';
import React from 'react';
import { Link, LinkProps } from '@chakra-ui/next-js';
import LinkedHeading from './linked-heading';

export function H1(props: HTMLChakraProps<'h1'>) {
  return <LinkedHeading apply="content.h1" heading={chakra.h1} {...props} />;
}

export function H2(props: HTMLChakraProps<'h2'>) {
  return <LinkedHeading apply="content.h2" heading={chakra.h2} {...props} />;
}

export function H3(props: HTMLChakraProps<'h3'>) {
  return <LinkedHeading apply="content.h3" heading={chakra.h3} {...props} />;
}

export function H4(props: HTMLChakraProps<'h4'>) {
  return <LinkedHeading apply="content.h4" heading={chakra.h4} {...props} />;
}

export function P(props: HTMLChakraProps<'p'>) {
  return <chakra.p apply="content.p" {...props} />;
}

export function A(props: HTMLChakraProps<'a'>) {
  return (
    // next/link is using type string || URL
    <Link
      href={props.href ?? ''}
      textDecoration="underline"
      apply="content.a"
      {...props}
    >
      {props.children}
    </Link>
  );
}

export function Ul(props: HTMLChakraProps<'ul'>) {
  return <chakra.ul apply="content.ul" {...props} />;
}

export function Ol(props: HTMLChakraProps<'ol'>) {
  return <chakra.ol apply="content.ol" {...props} />;
}

export function Li(props: HTMLChakraProps<'li'>) {
  return <chakra.li apply="content.li" {...props} />;
}

export function Blockquote(props: HTMLChakraProps<'blockquote'>) {
  return (
    <Alert
      mt="4"
      role="none"
      variant="left-accent"
      as="blockquote"
      display="block"
      rounded="4px"
      my="1.5rem"
      bg="gray.50"
      borderStartColor="gray.500"
      {...(props as AlertProps)}
    />
  );
}

export function Hr(props: HTMLChakraProps<'hr'>) {
  return <chakra.hr apply="content.hr" {...props} />;
}
