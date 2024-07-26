import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProfileNavBar() {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-3" asChild>
        <img
          src={`https://ui-avatars.com/api/?background=random&name=${user?.name}`}
          alt=""
          className="w-10 h-10 rounded-xl"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="leading-4">
            <h4 className="font-semibold">{user?.name}</h4>
            <span className="text-xs text-gray-600">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={'/acount'}
            className="flex justify-center items-center w-full gap-5"
          >
            <User /> <span>Acount</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={'/acount'}
            className="flex justify-center items-center w-full gap-5"
          >
            <Settings /> <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await signOut()}>
          <Link
            href={'/acount'}
            className="flex justify-center items-center w-full gap-4"
          >
            <LogOut /> <span>Sign Out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
