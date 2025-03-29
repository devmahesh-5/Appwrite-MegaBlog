import React, { useState, useEffect } from 'react'
import Container from '../container/Container';
import { Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    // Check if mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768); // Tailwind's md breakpoint
        };

        handleResize(); // Check on initial render
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className='py-3 shadow bg-white sticky top-0 z-50'>
            <Container>
                <nav className='flex items-center justify-between'>
                    {/* Logo/Brand */}
                    <div className='flex items-center'>
                        <Link to="/" onClick={closeMobileMenu}>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    {/* Desktop Navigation - shows on md screens and up */}
                    {!isMobileView && (
                        <ul className='flex ml-auto'>
                            {navItems.map((navItem) => (
                                navItem.active && (
                                    <li key={navItem.name}>
                                        <button
                                            onClick={() => navigate(navItem.slug)}
                                            className={`inline-block px-4 py-2 duration-200 hover:text-blue-300 ${
                                                location.pathname === navItem.slug ? "text-blue-500" : "text-black"
                                            }`}
                                        >
                                            {navItem.name}
                                        </button>
                                    </li>
                                )
                            ))}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    )}

                    {/* Mobile Navigation - shows on small screens */}
                    {isMobileView && (
                        <div className="relative">
                            {/* Hamburger Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-md text-gray-700 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>

                            {/* Mobile Menu Dropdown */}
                            {isMobileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <ul>
                                        {navItems.map((navItem) => (
                                            navItem.active && (
                                                <li key={navItem.name}>
                                                    <button
                                                        onClick={() => {
                                                            navigate(navItem.slug);
                                                            closeMobileMenu();
                                                        }}
                                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                                            location.pathname === navItem.slug ? "text-blue-500" : "text-gray-700"
                                                        }`}
                                                    >
                                                        {navItem.name}
                                                    </button>
                                                </li>
                                            )
                                        ))}
                                        {authStatus && (
                                            <li className="border-t border-gray-200">
                                                <div className="px-4 py-2">
                                                    <LogoutBtn className="w-full text-left" />
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </Container>
        </header>
    )
}

export default Header