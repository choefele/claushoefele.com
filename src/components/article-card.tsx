import { Card, CardBody, Image, Stack, Text } from '@chakra-ui/react';
import { H2 } from './content';
import { PostMetadata } from '../load-content-data';

export default function ArticleCard({
  title,
  subtitle,
  description,
  image,
}: PostMetadata) {
  return (
    <Card height="100%" variant="outline">
      <Image
        src={image?.url}
        alt={image?.alt}
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      />
      <CardBody>
        <Stack>
          <H2 mt="0">{title}</H2>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
