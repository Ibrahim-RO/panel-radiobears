import { NavLink } from 'react-router-dom'

type SiteBarSubMenuProps = {
    title: string
    section: string
    urlsInformation: {
        name: string;
        to: string;
    }[]
}

export const SideBarSubMenu = ({ urlsInformation }: SiteBarSubMenuProps) => {

    return (
        <>
            {urlsInformation.map((information, idx) => (
                <li key={idx}>
                    <NavLink
                        to={information.to}
                        className={({ isActive }) => `block p-2 rounded-lg hover:bg-gray-700 ${isActive ? 'underline' : 'text-white'}`}
                    >
                        {information.name}
                    </NavLink>
                </li>
            ))}
        </>
    )
}
