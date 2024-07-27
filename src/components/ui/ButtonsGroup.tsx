import { Button } from './button';
import { CircleX, Edit, Save } from 'lucide-react';

interface ButtonsGroupProps {
  isEditing: boolean;
  toggle: () => void;
}

export default function ButtonsGroup({ isEditing, toggle }: ButtonsGroupProps) {
  return (
    <>
      {!isEditing && (
        <Button
          onClick={toggle}
          className="rounded-full p-0 w-7 h-7 hover:bg-blue-500"
          variant={'secondary'}
        >
          <Edit size={18} />
        </Button>
      )}

      {isEditing && (
        <div className="flex justify-evenly gap-2">
          <Button
            className="rounded-full p-0 w-7 h-7 bg-red-500 hover:bg-red-600"
            onClick={toggle}
          >
            <CircleX size={18} />
          </Button>
          <Button
            onClick={toggle}
            className="rounded-full p-0 w-7 h-7 bg-green-500 hover:bg-green-600"
          >
            <Save size={18} />
          </Button>
        </div>
      )}
    </>
  );
}
