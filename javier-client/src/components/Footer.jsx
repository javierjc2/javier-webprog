import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="border-t-2 border-zinc-800 bg-zinc-950 px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 text-zinc-200 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-base font-bold text-white">
                        Jude Romulo Javier
                    </p>

                    <p className="mt-0.5 text-xs text-zinc-400">
                        Aspiring Web and Mobile Developer
                    </p>


                    <p className="text-xs text-zinc-300">
                        © 2026 <span className="font-semibold text-white">Rjavier</span>
                    </p>
                </div>

                <p className="flex gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">

                    <Link
                        to="/"
                        className="transition hover:text-white hover:underline"
                    >
                        Home
                    </Link>

                    <span>|</span>

                    <Link
                        to="/cart"
                        className="transition hover:text-white hover:underline"
                    >
                        Email
                    </Link>

                    <span>|</span>

                    <Link
                        to="/pickup"
                        className="transition hover:text-white hover:underline"
                    >
                        Github
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Footer;