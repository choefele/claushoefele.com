import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { A, P } from './content';
import {
  SubscribeRequestData,
  subscribeRequestSchema,
  subscribeEmail,
} from '../pages/api/subscribe';

export default function SubscribeForm({
  optedInEmail,
}: {
  optedInEmail?: string;
}) {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  let message: string | undefined;
  if (optedInEmail) {
    // User completed opt-in successfully
    message = `Welcome – you are on the list with ${optedInEmail}!`;
  } else if (subscribedEmail) {
    // User started opt-in process
    message = `Thank you for subscribing ${subscribedEmail}. Please check your inbox
    to confirm your email address.`;
  }

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeRequestData>({
    resolver: zodResolver(subscribeRequestSchema),
  });
  const onSubmit: SubmitHandler<SubscribeRequestData> = async (data) => {
    const result = await subscribeEmail(data);
    if (result.status >= 300) {
      setError('email', {
        type: 'custom',
        message: 'Error subscribing – please try again',
      });
    } else {
      setSubscribedEmail(data.email);
    }
  };

  return (
    <Flex alignItems="center" height="5.1rem">
      {message ? (
        <P my="0">{message}</P>
      ) : (
        <form noValidate style={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired={!subscribeRequestSchema.shape.email.isOptional()}
            isInvalid={!!errors.email}
          >
            <Box height="1.3rem" display="flex" alignItems="center">
              <FormErrorMessage fontSize="xs" my="0">
                {errors.email?.message}
              </FormErrorMessage>
            </Box>

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
            <Box height="1.3rem" display="flex" alignItems="center">
              <FormHelperText fontSize="xs" my="0">
                We’ll never share your email. Unsubscribe any time.{' '}
                <A href="https://www.sendinblue.com/legal/privacypolicy/">
                  Privacy policy.
                </A>
              </FormHelperText>
            </Box>
          </FormControl>
          <input
            type="hidden"
            value={process.env.NEXT_PUBLIC_SUBSCRIBE_ID_WEBSITE}
            {...register('subscribeId')}
          />
        </form>
      )}
    </Flex>
  );
}
