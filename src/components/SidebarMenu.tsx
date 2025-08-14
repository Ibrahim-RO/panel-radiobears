import { useState } from 'react'
import { NavLink } from 'react-router-dom'

type SiteBarSubMenuProps = {
    title: string
    section: string
    urlsInformation: {
        name: string;
        to: string;
    }[]
}

export const SideBarSubMenu = ({ title, section, urlsInformation }: SiteBarSubMenuProps) => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(prev => (prev === menu ? null : menu));
    };

    return (
        <>
            <li>
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

            </li>

        </>
    )
}
