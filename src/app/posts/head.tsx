import DefaultTags from "../default-tags";

export default function Head() {
  return (
    <>
      <DefaultTags title="Posts | FerTostado" />
      <meta
        name="description"
        content="This is a list of all the posts I've written on dev.to."
      />
    </>
  );
}
