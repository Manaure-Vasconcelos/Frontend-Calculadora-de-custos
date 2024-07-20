import { Menu, LogOut, Settings, User } from 'lucide-react';
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from 'flowbite-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

function MenuProfile() {
  const { signOut} = useAuth()

  return ( 
    <Dropdown
          label="Menu"
          dismissOnClick={false}
          renderTrigger={() => <Menu size={20} />}
          placement="top"
          size="sm"
        >
          <DropdownItem icon={User} as={Link} href="/acount">
            Acount
          </DropdownItem>
          <DropdownItem icon={Settings} onClick={() => {}}>
            Settings
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={LogOut} onClick={async () => await signOut()}>
            Sign out
          </DropdownItem>
        </Dropdown>
   );
}

export default MenuProfile;