export default async function ClientsPage() {
  const clientsList = await fetch("http://localhost:3000/api/v1/clients");
  const result = await clientsList.json();

  type Client = { id: number; name: string; email: string };

  return (
    <>
      <h1 className="text-secondary">Client list</h1>
      <div>
        <ul>
          {result.map(({ id, name, email }: Client) => (
            <li key={id} className="container flex gap-8">
              <h3 className="text-accent">{name}</h3>
              <h3 className="text-muted">{email}</h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
