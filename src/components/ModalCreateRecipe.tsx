import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "@/lib/axiosConfig";
import Modal from "react-bootstrap/Modal";

interface Props {
  isModalOpen: boolean;
  onRequestClose: () => void;
}

interface RecipeRequest {
  title: string;
  describe?: string;
}

export default function ModalCreateRecipe({
  isModalOpen,
  onRequestClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeRequest>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post(
      "https://backend-calculadora-de-custo.onrender.com/recipes",
      data
    );

    if (res.status === 201) {
      onRequestClose();
      router.push("/calculator");
    }
  });

  return (
    <Modal
      show={isModalOpen}
      onHide={onRequestClose}
      onBackdropClick={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <main
        className="fixed inset-0 bg-black bg-opacity-75"
        onClick={onRequestClose}
      ></main>
      <div
        className="bg-slate-600 rounded-lg p-6 shadow-lg absolute w-80 z-10 "
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <span className="flex justify-between items-center">
          <h2 className="text-xl mb-3">Create New Recipe</h2>
          <button className="rounded-lg mb-4 mr-2" onClick={onRequestClose}>
            X
          </button>
        </span>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label htmlFor="title" className="text-white block text-sm text-left">
            Title:
          </label>
          <input
            type="text"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
            className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
          />

          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}

          <label
            htmlFor="describe"
            className="text-white block text-sm text-left"
          >
            Describe:
          </label>
          <input
            type="text"
            {...register("describe", {
              required: false,
            })}
            className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
}