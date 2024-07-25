import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  LayoutDashboard,
  ScrollText,
  Info,
  Coins
} from 'lucide-react';
import { createContext, useState } from 'react';
import ProfileSideBar from './ProfileSideBar';
import Link from 'next/link';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen max-w-[250px]">
      <nav className="h-full w-full flex flex-col bg-white border-r shadow-sm ">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 mt-2">
          <Link href="/">
            <SidebarItem
              expanded={expanded}
              icon={<LayoutDashboard />}
              text="Dashboard"
            />
          </Link>
          <Link href="/all-recipes">
            <SidebarItem
              expanded={expanded}
              icon={<ScrollText />}
              text="All Recipes"
            />
          </Link>
          <Link href="/about">
            <SidebarItem expanded={expanded} icon={<Info />} text="About" />
          </Link>
        </ul>

          <ProfileSideBar expanded={expanded} />
      </nav>
    </aside>
  );
}

interface SideBarItemProp {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  expanded: boolean;
}

function SidebarItem({ icon, text, active, expanded }: SideBarItemProp) {
  return (
    <li
      className={`flex justify-center items-center py-3 px-3 my-1 mt-3
        font-medium rounded-md cursor-pointer
        transition-colors group transform duration-300
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 text-wrap'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span
        className={`overflow-hidden transition-all whitespace-nowrap ${
          expanded ? 'w-52 ml-6 px-2' : 'w-0'
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
