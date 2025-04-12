import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiGrid42 } from "react-icons/ci";
import { FaMap, FaUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import Element from './elements';
import { useDispatch } from 'react-redux';
import { HideMenu } from '../reduxToolkit/sliceMenu';
import { AppContext } from '../context/AuthContext';

export const Menu = () => {
    const [activeLink, setActiveLink] = useState('');
    const { clearToken, userData } = useContext(AppContext); // Access userData from AppContext

    const location = useLocation();
    const Dispatch = useDispatch();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleLogout = () => {
        clearToken(); // Clear the token and user data
        // Optionally, navigate the user to a login page
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    const handleClick = () => {
        Dispatch(HideMenu(false))
    }

    return (
        <div className="flex flex-col h-screen justify-between">
            <div>
                <div className="flex justify-center items-center border-b-2 border-solid border-green-500 h-[64px]">
                    <img src="https://tracktom.pcs-agri.com/assets/images/logo-png.png" className="w-[170px]" alt="Logo" />
                </div>
                <ul className='flex flex-col justify-between ' onClick={handleClick}>

                    <Link to={'/accueil'}
                        className={`hover:bg-blanc ${activeLink === '/' && 'bg-blanc'}`}
                        onClick={() => handleLinkClick('/accueil')}
                    >
                        <Element contenu="Tableau de bord" icon={<CiGrid42 />} clas={`${activeLink === '/' && 'text-green4'}`} />
                    </Link>
                    <Link to={'/farmes'}
                        className={`hover:bg-blanc ${activeLink === '/farmes' && 'bg-blanc'}`}
                        onClick={() => handleLinkClick('/farmes')}
                    >
                        <Element contenu="Fermes" icon={<FaMap />} clas={`${activeLink === '/farmes' && 'text-green4'}`} />
                    </Link>
                    <Link to={'/serres'}
                        className={`hover:bg-blanc ${activeLink === '/serres' && 'bg-blanc'}`}
                        onClick={() => handleLinkClick('/serres')}
                    >
                        <Element contenu="Serres" icon={<FaMap />} clas={`${activeLink === '/serres' && 'text-green4'}`} />
                    </Link>
                    {/* Conditionally render 'Gestion des clients' if the user is superAdmin */}
                    {userData?.type === 'superAdmin' && (
                        <Link to={'/staff'}
                            className={`hover:bg-blanc ${activeLink === '/staff' || activeLink === '/staff/create' ? 'bg-blanc':''}`}
                            onClick={() => handleLinkClick('/staff')}
                        >
                            <Element contenu="Gestion des clients" icon={<FaUser />} clas={`${activeLink === '/staff' || activeLink === '/staff/create' ? 'text-green4':''}`} />
                        </Link>
                    )}
                </ul>
            </div>

            <div>
                <ul onClick={handleClick}>
                    <Link to="/signIn" onClick={handleLogout}>
                        <Element contenu="Se déconnecter" icon={<IoLogOutOutline />} />
                    </Link>

                    <Link to="/profile">
                        <div className="border-t border-white">
                            <Element contenu="Profile" icon={<FaUser />} />
                        </div>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Menu;

