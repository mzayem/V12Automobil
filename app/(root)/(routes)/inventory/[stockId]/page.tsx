interface inventoryRouteParams {
  params: {
    stockId: string;
  };
}

export default async function InventoryPage({ params }: inventoryRouteParams) {
  const { stockId } = await params;

  return <div>Inventory Page id : {stockId}</div>;
}
