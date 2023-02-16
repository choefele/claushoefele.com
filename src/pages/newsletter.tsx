import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { H1, H2, P } from '../components/content';

const schema = z.object({
  email: z.string().email(),
  subscribeId: z.string(),
});

function SubscribeForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) =>
    console.log(data);

  // Field doesn't turn red reliably when invalid
  // Send to API

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isRequired={!schema.shape.email.isOptional()}
        isInvalid={!!errors.email}
      >
        <InputGroup size="md">
          <Input
            id="email"
            type="email"
            placeholder="Your best email"
            aria-label="Email"
            pr="7rem"
            {...register('email')}
          />
          <InputRightElement width="7rem">
            <Button type="submit" size="sm" isLoading={isSubmitting}>
              Subscribe
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <input
        type="hidden"
        value={process.env.NEXT_PUBLIC_SUBSCRIBE_ID}
        {...register('subscribeId')}
      />
    </form>
  );
}

export default function Newsletter() {
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
