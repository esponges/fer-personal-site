import { publicProcedure, router } from "~/server/trpc/trpc";
export const projectsRouter = router({
  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
});
