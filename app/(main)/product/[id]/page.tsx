import { prisma } from "@/prisma/prisma-client";
import { ChoosePizzaForm, Container } from "@/shared/components/shared";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: +id } });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={[]}
        items={[]}
        onSubmit={function (itemId: number, ingredients: number[]): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Container>
  );
}
