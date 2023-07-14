export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Random Page</h1>
      <p>Params: {JSON.stringify(params)}</p>
    </div>
  );
}
