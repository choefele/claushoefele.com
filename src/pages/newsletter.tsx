import React, { ChangeEvent } from 'react';
import Head from 'next/head';
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { H1, H2, P } from '../components/content';

function SubscribeForm() {
  const [email, setEmail] = React.useState('');

  return (
    <form>
      <FormControl isRequired>
        <InputGroup size="md">
          <Input
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            pr="7rem"
            type="email"
            placeholder="Your best email"
          />
          <InputRightElement width="7rem">
            <Button type="submit" size="sm">
              Subscribe
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default function Newsletter(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele - Newsletter</title>
      </Head>

      <main>
        <H1>Newsletter</H1>
        <SubscribeForm />
      </main>
    </>
  );
}
