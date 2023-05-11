export default function DefaultTags({ title = "Fer Tostado's Personal site" }: { title?: string}) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link
        rel="shortcut icon"
        href="/favicon.ico"
      />
      <title>{title}</title>
      <link
        rel="icon"
        href="/favicon.ico"
      />
    </>
  );
}
