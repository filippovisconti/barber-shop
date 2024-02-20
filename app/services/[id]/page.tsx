export default function Page({ params }: { params: { id: string } }) {
  return <h1>My Page {params.id}</h1>;
}
