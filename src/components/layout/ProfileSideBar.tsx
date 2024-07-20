import { useAuth } from '@/context/AuthContext';
import MenuProfile from '../MenuProfile';

export default function ProfileSideBar({ expanded }: { expanded: boolean }) {
  const { user} = useAuth();

  return (
    <div className="border-t flex justify-center items-center p-3">
      <img
        src={`https://ui-avatars.com/api/?background=random&name=${user?.name}`}
        alt=""
        className="w-10 h-10 rounded-md"
      />
      <div
        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
      >
        <div className="leading-4">
          <h4 className="font-semibold">{user?.name}</h4>
          <span className="text-xs text-gray-600">{user?.email}</span>
        </div>

        <div className="cursor-pointer hover:scale-105">
        <MenuProfile />
        </div>
      </div>
    </div>
  );
}
