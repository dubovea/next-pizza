import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/shared/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтры */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Завтрак"
                items={[
                  {
                    id: 1,
                    name: "Пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF438E93884BFEBFE79D11095AE2D4.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 2,
                    name: "Пицца 2",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF438E93884BFEBFE79D11095AE2D4.avif",
                    items: [
                      {
                        price: 3550,
                      },
                    ],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Обед"
                items={[
                  {
                    id: 1,
                    name: "Пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF438E93884BFEBFE79D11095AE2D4.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 2,
                    name: "Пицца 2",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF438E93884BFEBFE79D11095AE2D4.avif",
                    items: [
                      {
                        price: 3550,
                      },
                    ],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
