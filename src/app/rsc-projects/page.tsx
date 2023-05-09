import { prisma } from '~/server/db/client';

const getProjects = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return projects;
};

export default async function RscProjectsPage() {
  const data = await getProjects();

  console.log(data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex max-w-3xl flex-grow flex-col items-center justify-center">
        <h1 className="text-center text-6xl font-bold">RSC Projects</h1>
      </main>
    </div>
  );
}
