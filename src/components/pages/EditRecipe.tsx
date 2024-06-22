import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosConfig';
import ModalDefault from '../ui/ModalDefault';
import { Table } from 'react-bootstrap';
import Format from '@/lib/formatNumber';

interface Ingredient {
  id: number;
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
  realAmount: number;
}

export interface Recipe {
  id: number;
  title: string;
  describe?: string;
  userId: string;
  valuePartial: number;
  createdAt: Date;
  updatedA: Date;
  ingredients: Ingredient[];
}

interface Props {
  isModalOpen: boolean;
  data: Recipe | null;
  onRequestClose: () => void;
}

/* interface RecipeRequest {
  title?: string;
  describe?: string;
  ingredient: {
    id: number;
    name: string;
    usedWeight: number
    marketPrice: number
    grossWeight: number
  }
}
 */
export default function EditRecipe({
  isModalOpen,
  onRequestClose,
  data
}: Props) {
  const handleEditItem = (data: any) => {
    console.log(data);
  };

  return (
    <ModalDefault
      isModalOpen={isModalOpen}
      onRequestClose={onRequestClose}
      onBackdropClick={onRequestClose}
    >
      <main
        className="fixed inset-0 bg-black bg-opacity-75"
        onClick={onRequestClose}
      ></main>
      <div
        className="bg-slate-600 rounded-lg p-6 shadow-lg absolute w-1/2 z-10 "
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <span className="flex justify-between items-center">
          {data && (
            <>
              <h2 className="text-xl m-3">{data.title}</h2>
              <h2 className="text-xl m-3">{data.describe}</h2>
              <h2 className="text-xl m-3">
                Custo: {Format(data.valuePartial)}
              </h2>
            </>
          )}

          <button className="rounded-lg mb-4 mr-2" onClick={onRequestClose}>
            X
          </button>
        </span>

        <div className="p-4 m-2 bg-slate-700 rounded-lg">
          <Table striped bordered hover className="w-full table-fixed">
            <thead>
              <tr className="border-b-2">
                <th className="w-1/4 p-2">Name</th>
                <th className="w-1/4 p-2">Used Weight</th>
                <th className="w-1/4 p-2">Market Price</th>
                <th className="w-1/4 p-2">Gross Weight</th>
                <th className="w-1/4 p-2">Real Amount</th>
                <th className="w-1/4 p-2"></th>
              </tr>
            </thead>

            {data?.ingredients.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="w-full text-center py-4">
                    Adicione um ingrediente para exibi-lo
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.ingredients?.map((ingredient) => (
                  <tr key={ingredient.id}>
                    <th className="w-1/4 py-2 text-left">{ingredient.name}</th>
                    <th className="w-1/4 py-2">{ingredient.usedWeight}</th>
                    <th className="w-1/4 py-2">{ingredient.marketPrice}</th>
                    <th className="w-1/4 py-2">{ingredient.grossWeight}</th>
                    <th className="w-1/4 py-2">
                      {Format(ingredient.realAmount)}
                    </th>
                    <th className="w-1/4 py-2 pr-2 text-right">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                        onClick={() => handleEditItem(ingredient?.id)}
                      >
                        Edit
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </div>
      </div>
    </ModalDefault>
  );
}
