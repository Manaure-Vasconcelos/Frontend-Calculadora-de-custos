interface Recipe {
  id: string;
  title: string;
  ingredients: any[];
  valuePartial: number;
}

export default function Calculator({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-xl font-bold p-4">Calculator</h1>
        <div>
          <h1>{params.id}</h1>
          {/* Render the rest of the recipe details */}
        </div>
      <ul className="flex-row">
        <li>Form and List ingredients</li>
        <li>Costs Unit</li>
        <li>Profit margin</li>
      </ul>
    </div>
  );
}
