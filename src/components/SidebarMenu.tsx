import { useState } from 'react'
import { NavLink } from 'react-router-dom'

type SiteBarSubMenuProps = {
    title: string
    section: string
    urlsInformation: {
        name: string;
        to?: string;
    }[]
}

export const SiteBarSubMenu = ({ title, section, urlsInformation }: SiteBarSubMenuProps) => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(prev => (prev === menu ? null : menu));
    };

    return (
        <>
            <li>
                <p className="text-gray-400 text-base mt-3 px-2 py-1">{title}</p>
                <button
                    type="button"
                    onClick={() => toggleSubmenu("mi-cuenta")}
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
                >
                    <span className="flex-1 text-left">{section}</span>
                    <svg
                        className={`w-3 h-3 transition-transform ${openSubmenu === "mi-cuenta" ? "rotate-180" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                <ul
                    className={`${openSubmenu === "mi-cuenta" ? "block" : "hidden"
                        } py-2 space-y-2 pl-6`}
                >
                    {urlsInformation.map((information, idx) => (
                        <li key={idx}>
                            <NavLink 
                                to={information.to}
                                end={information.to === '/admin'} 
                                className={( {isActive} ) => `block p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'underline' : 'text-white'}` }
                            >
                                {information.name}
                            </NavLink>
                        </li>
                    ))}


                </ul>
            </li>

        </>
    )
}
