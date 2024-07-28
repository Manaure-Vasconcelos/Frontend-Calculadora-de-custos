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
          className="rounded-full p-0 w-7 h-7 hover:bg-primary"
          variant={'secondary'}
        >
          <Edit size={20} />
        </Button>
      )}

      {isEditing && (
        <div className="flex justify-evenly gap-2">
          <Button
            className="rounded-full p-0 w-7 h-7 hover:bg-destructive/90 text-black"
            onClick={toggle}
            variant={'destructive'}
          >
            <CircleX size={20} />
          </Button>
          <Button
            onClick={toggle}
            className="rounded-full p-0 w-7 h-7 bg-primary hover:bg-primary/90 text-black"
          >
            <Save size={20} />
          </Button>
        </div>
      )}
    </>
  );
}
