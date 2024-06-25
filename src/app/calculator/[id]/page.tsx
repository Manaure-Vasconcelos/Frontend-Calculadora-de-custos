import AddItems from '@/components/pages/AddItems';


export default function Calculator({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 w-full h-full flex flex-col justify-normal items-start">
      <header >
        <h1 className="text-xl font-bold p-4">Calculator</h1>
      </header>
      <main className="p-4 w-full h-full flex flex-col justify-normal items-start ">
        <AddItems id={params.id} />
      </main>
    </div>
  );
}
