import { publicProcedure, router } from "~/server/trpc/trpc";
export const projectsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany(
      // get images and libs
      {
        include: {
          images: true,
          libs: true,
        },
        orderBy: {
          relevance: "desc",
        },
      },
    );
  }),
});
