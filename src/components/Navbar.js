import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    const [showDropdown, setShowDropDown] = useState(false)
    return (
        <nav className="md:col-span-1 md:flex md:justify-between fixed w-full px-4 bg-white shadow-sm py-4">
            <div className="flex justify-between items-center">
                <NavLink to="/" className="text-lg font-bold italic">
                    Task
                </NavLink>
                <div className="px-4 cursor-pointer md:hidden" onClick={() => setShowDropDown(!showDropdown)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
            <div className={`my-2 ${showDropdown ? 'flex flex-col' : 'hidden'} md:block`}>
                <NavLink
                    to="/"
                    exact
                    activeClassName="border-b-2 border-grash"
                    className="mx-4 py-2 uppercase inline-block text-xs font-bold hover:border-b-2 hover:border-grash"
                >
                    Posts
                </NavLink>
                <NavLink
                    to="/profile"
                    exact
                    activeClassName="border-b-2 border-grash"
                    className="mx-4 py-2 uppercase inline-block text-xs font-bold hover:border-b-2 hover:border-grash"
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/allUsers"
                    exact
                    activeClassName="border-b-2 border-grash"
                    className="mx-4 py-2 uppercase inline-block text-xs font-bold hover:border-b-2 hover:border-grash"
                >
                    All Users
                </NavLink>
                <NavLink
                    to="/addPosts"
                    exact
                    activeClassName="border-b-2 border-grash"
                    className="mx-4 py-2 uppercase inline-block text-xs font-bold hover:border-b-2 hover:border-grash"
                >
                    Add Posts
                </NavLink>

            </div>
        </nav >
    );
};

export default Navbar;