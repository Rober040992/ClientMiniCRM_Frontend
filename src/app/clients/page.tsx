export default async function ClientsPage() {
  const clientsList = await fetch("http://localhost:3000/api/v1/clients");
  const result = await clientsList.json();

  return (
    <>
      <h1 className="text-secondary">Client list</h1>
      <div>
        <ul>
          {result.map((client: { id: number; name: string; email: string }) => (
            <li key={client.id} className="container flex gap-8">
              <h3 className="text-accent">{client.name}</h3>
              <h3 className="text-muted">{client.email}</h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
