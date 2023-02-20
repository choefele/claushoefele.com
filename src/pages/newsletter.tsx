import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  SubscribeFormData,
  subscribeFormSchema,
  subscribeEmail,
} from './api/subscribe';

function SubscribeForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
  });
  const onSubmit: SubmitHandler<SubscribeFormData> = async (data) => {
    const result = await subscribeEmail(data);
    console.log(result);
  };

  // Field doesn't turn red reliably when invalid
  // Send to API
  // - useState to remember success; render confirm like https://monicalent.com
  // - protect API with zod like https://giancarlobuomprisco.com/next/protect-next-api-zod
  // - wrap client state in custom hook

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isRequired={!subscribeFormSchema.shape.email.isOptional()}
        isInvalid={!!errors.email}
      >
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>

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
            <Button
              type="submit"
              size="sm"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Subscribe
            </Button>
          </InputRightElement>
        </InputGroup>
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
