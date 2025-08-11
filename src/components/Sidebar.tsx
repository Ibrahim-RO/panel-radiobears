import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";


export const SideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative">
      {/* Botón toggle para abrir/cerrar sidebar */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        {isSidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        )}
      </button>

      {/* Overlay en móviles */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out bg-[#2e1302] overflow-y-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4">
          <div className="flex items-center gap-2">
            <img src="https://framerusercontent.com/images/G86SEp0QCremiXNsbHp2o3BdYQA.png?scale-down-to=512" alt="Logo" className="w-45" />
          </div>
          <ul className="space-y-2 font-medium text-white mt-3">


          </ul>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="w-full h-12 bg-[#2e1302] hidden md:block"></div>
      <div className="py-4 px-8 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};
