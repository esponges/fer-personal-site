import { PageHeader } from "~/components/atoms/pageHeader";
import { Container } from "~/components/organisms/container";
import Projects from "~/components/containers/projects";
import Link from "next/link";

export default async function ProjectsPage() {
  return (
    <>
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of projects I've worked on."
        />
        <Link href="/">
          <span className="text-center text-2xl font-bold text-blue-500 hover:text-blue-600">Check out my blog</span>
        </Link>
        {/* @ts-expect-error Server Component */}
        <Projects />
      </Container>
    </>
  );
}
