import { PageSkeleton } from '~/components/atoms/pageSkeleton';
import { Container } from '~/components/organisms/container';

export default function Loading() {
  return (
    <Container>
      <PageSkeleton />
    </Container>
  );
}
