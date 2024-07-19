import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  LayoutDashboard,
  ScrollText,
  Info,
  Coins
} from 'lucide-react';
import { useContext, createContext, useState } from 'react';
import ProfileSideBar from './ProfileSideBar'

interface SideBarContextProp {
  expanded: boolean;
}

const SidebarContext = createContext({} as SideBarContextProp);

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen max-w-[300px]">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
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

        <ul className="flex-1 px-3 mt-2">
          <SidebarItem
            expanded={expanded}
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active
          />
          <SidebarItem
            expanded={expanded}
            icon={<ScrollText size={20} />}
            text="All Recipes"
          />
          <SidebarItem
            expanded={expanded}
            icon={<Coins size={20} />}
            text="Fixed Costs"
          />
          <SidebarItem
            expanded={expanded}
            icon={<Info size={20} />}
            text="About"
          />
        </ul>

        <ProfileSideBar expanded={expanded}/>
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
    /* className="flex items-center px-5 py-3 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" */
    <li
      className={`
        relative flex items-center py-3 px-5 my-1 mt-3
        font-medium rounded-md cursor-pointer
        transition-colors group transform duration-300
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 text-wrap'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all whitespace-nowrap ${
          expanded ? 'w-52 ml-6 px-2 py-1' : 'w-0'
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

/* import Link from 'next/link';
import ProfileSideBar from './ProfileSideBar';

export default function SideBar() {
  return (
    <>
      <aside className="flex flex-col w-60 min-h-screen px-4 py-8 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700">
        <Link href="/">
          <img
            className="w-auto ml-3 h-6 sm:h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-8">
          <nav>
            <Link
              className="flex items-center px-5 py-3 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            <Link
              className="flex items-center px-5 py-3 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/all-recipes"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                />
              </svg>
              <span className="mx-4 font-medium">All Recipes</span>
            </Link>

            <Link
              className="flex items-center px-5 py-3 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/fixed-costs"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
              <span className="mx-4 font-medium">Fixed Costs</span>
            </Link>

            <Link
              className="flex items-center px-5 py-3 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="/about"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="mx-4 font-medium">About</span>
            </Link>
          </nav>

          <span className="border rounded-lg shadow-md">
            <ProfileSideBar />
          </span>
        </div>
      </aside>
    </>
  );
}
 */
