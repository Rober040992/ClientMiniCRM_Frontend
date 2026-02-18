import { Card } from "@/components/ui/card";

export default async function ClientsPage() {
  const clientsList = await fetch("http://localhost:3000/api/v1/clients");
  const result = await clientsList.json();

  type Client = { id: number; name: string; email: string };

  return (
    <>
      <h1 className="text-primary">Client list</h1>
      <div>
        <ul className="flex flex-col gap-4">
          {result.map(({ id, name, email }: Client) => (
            <Card key={id} className="container flex gap-8">
              <h4 className="">{name}</h4>
              <h4 className="">{email}</h4>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
}
