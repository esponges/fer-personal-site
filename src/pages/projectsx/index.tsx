import Head from "next/head";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";

import { ProjectCard } from "~/components/molecules/projectCard";
import { PageHeader } from "~/components/atoms/pageHeader";
import { Container } from "~/components/organisms/container";

import { appRouter } from "~/server/trpc/router/_app";
import { createContext } from "~/server/trpc/context";
import { trpc } from "~/utils/trpc";

const ProjectsPage = () => {
  const { data: projects } = trpc.projects.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Projects | FerTostado</title>
        <meta
          name="description"
          content="This is a list of all the relevant projects I've worked on."
        />
      </Head>
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of projects I've worked on."
        />
        {projects?.map((project) => {
          return (
            <div key={project.name} className="my-5">
              <ProjectCard key={project.name} project={project} />
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default ProjectsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext({
      req: ctx.req as NextApiRequest,
      res: ctx.res as NextApiResponse,
    }),
    transformer: superjson,
  });

  // this will make the query run on the server
  // thus useQuery will have the data ready on the client
  await ssg.projects.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
