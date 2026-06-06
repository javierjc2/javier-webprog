import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaNewspaper } from "react-icons/fa";

const staticLinks = [
    { label: <FaHome />, to: "/" },
    { label: <FaUser />, to: "/about" },
    { label: <FaNewspaper />, to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
    [
        "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md",
        "transition-all duration-100 transform",
        isActive
            ? "text-white bg-zinc-800 shadow-[0_0_10px_rgba(0,0,0,0.6)] scale-105"
            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 hover:shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:scale-105",
    ].join(" ");

const NavBar = () => {
    const navigate  = useNavigate();
    const firstName = localStorage.getItem('firstName');
    const token     = localStorage.getItem('token');
    const isLoggedIn = token && firstName;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('type');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-800 bg-zinc-950/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <NavLink to="/" className="flex items-center gap-3">
                    <div className="space-y-0.5">
                        <img
                            src="/src/assets/img/logo.png"
                            alt="C&R Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                </NavLink>

                <nav className="hidden items-center md:flex">
                    {staticLinks.map((link, index) => (
                        <div key={link.to} className="flex items-center">
                            <NavLink
                                to={link.to}
                                end={link.to === '/'}
                                className={navLinkClassName}
                            >
                                {link.label}
                            </NavLink>
                            <span className="mx-6 h-5 w-[1.5px] bg-zinc-700"></span>
                        </div>
                    ))}

                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-zinc-300">
                                Hi, <span className="font-semibold text-white">{firstName}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-100"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <NavLink to="/auth/signin" className={navLinkClassName}>
                                Sign In
                            </NavLink>
                            <span className="mx-6 h-5 w-[1.5px] bg-zinc-700"></span>
                            <NavLink to="/auth/signup" className={navLinkClassName}>
                                Sign Up
                            </NavLink>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;