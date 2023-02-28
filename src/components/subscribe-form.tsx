import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
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

export default function SubscribeForm() {
  const [subscribed, setSubscribed] = useState('');
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
      setSubscribed(data.email);
    }
  };

  // Field doesn't turn red reliably when invalid
  // Show error in proper place - div
  // Decide landing page after opt in
  // Set up SiB emails in english

  return (
    <>
      {subscribed ? (
        <P>
          Thank you for subscribing {subscribed}. Please check your inbox to
          confirm your email.
        </P>
      ) : (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired={!subscribeRequestSchema.shape.email.isOptional()}
            isInvalid={!!errors.email}
          >
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

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
            <FormHelperText fontSize="xs">
              We’ll never share your email. Unsubscribe any time.{' '}
              <A href="https://www.sendinblue.com/legal/privacypolicy/">
                Privacy policy.
              </A>
            </FormHelperText>
          </FormControl>
          <input
            type="hidden"
            value={process.env.NEXT_PUBLIC_SUBSCRIBE_ID}
            {...register('subscribeId')}
          />
        </form>
      )}
    </>
  );
}