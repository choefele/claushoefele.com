import { Button, ButtonProps, Icon, chakra } from '@chakra-ui/react';
import { A } from '../components/content';
import { FaLinkedin } from 'react-icons/fa';

export default function LinkedInButton(props: ButtonProps) {
  return (
    <Button colorScheme={'linkedin'} {...props}>
      <A href="https://www.linkedin.com/in/claushoefele/">
        <chakra.span display="inline-flex" alignItems="center">
          {props.children} Linked{' '}
          <Icon as={FaLinkedin} mb="0.250rem" boxSize="1.5rem" />
        </chakra.span>
      </A>
    </Button>
  );
}
