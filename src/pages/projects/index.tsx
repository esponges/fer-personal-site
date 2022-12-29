import { PageHeader } from "~/components/atoms/pageHeader"
import { Carousel } from "~/components/molecules/carousel";
import { Container } from "~/components/organisms/container"
import { PROJECTS } from "~/utils/constants";

const ProjectsPage = () => {

  return (
    <Container>
      <PageHeader
        title="Projects"
        description="A collection of projects I've worked on."
      />
      <Carousel 
        elements={PROJECTS[0].images}
      />
    </Container>
  )
}

export default ProjectsPage;
