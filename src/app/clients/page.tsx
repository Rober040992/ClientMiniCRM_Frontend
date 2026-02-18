import { Card } from "@/components/ui/card";

export default async function ClientsPage() {
  const clientsList = await fetch("http://localhost:3000/api/v1/clients");
  const result = await clientsList.json();

  type Client = { id: number; name: string; email: string };

  return (
    <>
      <h1 className="container text-primary  py-4 text-2xl">Client list</h1>
      <div>
        <ul className="container flex flex-col gap-4">
          {result.map(({ id, name, email }: Client) => (
            <Card key={id} className="flex gap-8">
              <h4 className="">Name: {name}</h4>
              <h4 className="">Email: {email}</h4>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
}
