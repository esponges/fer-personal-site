
import { Suspense } from 'react';
import { Container } from '~/components/organisms/container';
import { PageHeader } from '~/components/atoms/pageHeader';
import { PageSkeleton } from '~/components/atoms/pageSkeleton';
import Posts from '~/components/containers/posts';

export default async function PostsPage() {

  return (
    <>
      <Container>
        <PageHeader
          title="Posts"
          description="I love to write about things I'm learning. 
            Blogging is a great way to improve and share knowledge.
            And who knows, maybe one day it might help me to write a book!"
        />
        <Suspense fallback={<PageSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <Posts />
        </Suspense>
      </Container>
    </>
  );
}
