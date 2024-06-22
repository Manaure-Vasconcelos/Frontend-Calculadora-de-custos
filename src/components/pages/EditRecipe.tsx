import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosConfig';
import ModalDefault from '../ui/ModalDefault';

interface Props {
  isModalOpen: boolean;
  onRequestClose: () => void;
}

/* interface RecipeRequest {
  title?: string;
  describe?: string;
  ingredient: {
    id: number;
    name: string;
    usedWeight: number
    marketprice: number
    grossWeight: number
  }
}
 */
export default function EditRecipe({ isModalOpen, onRequestClose }: Props) {
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
        className="bg-slate-600 rounded-lg p-6 shadow-lg absolute w-80 z-10 "
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        Aqui irá uma table
      </div>
    </ModalDefault>
  );
}
