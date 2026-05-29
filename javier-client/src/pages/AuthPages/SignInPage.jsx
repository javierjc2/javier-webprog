import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
    'mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-900 focus:shadow-sm';

const actionButtonClassName =
    'w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
    return (
        <>
            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-sm sm:p-10">

                <div className="flex items-center justify-between gap-4 text-sm">
                    <Link
                        to="/"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-xl text-white transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                        title="Back to Home"
                    >
                        ←
                    </Link>
                </div>

                <div className="mt-6">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Welcome Back
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        Sign in to continue exploring your personalized experience
                        and access your account securely.
                    </p>
                </div>

                <form className="mt-8 space-y-5">

                    <div>
                        <label
                            htmlFor="signin-email"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Email Address
                        </label>

                        <input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signin-password"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Password
                        </label>

                        <input
                            id="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className={inputClasses}
                        />

                        <p className="mt-2 text-xs leading-5 text-zinc-500">
                            Use at least 8 characters including numbers and symbols.
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                        
                        <label className="flex items-center gap-2 text-zinc-300">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-zinc-600 accent-zinc-500"
                            />

                            <span>Remember me</span>
                        </label>

                        <button
                            type="button"
                            className="font-medium text-zinc-200 transition hover:text-white"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className={actionButtonClassName}
                    >
                        Log In
                    </Button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-700"></div>
                        </div>

                        <div className="relative flex justify-center">
                            <span className="bg-zinc-950 px-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                                or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">

                        <Button
                            type="button"
                            variant="secondary"
                            className={actionButtonClassName}
                        >
                            Google
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            className={actionButtonClassName}
                        >
                            Apple
                        </Button>

                    </div>

                </form>

                <div className="mt-8 border-t border-zinc-700 pt-6 text-center text-sm text-zinc-400">
                    No account yet?{' '}

                    <Link
                        to="/auth/signup"
                        className="font-semibold text-white transition hover:text-zinc-200"
                    >
                        Sign Up
                    </Link>
                </div>

            </div>
        </>
    );
};

export default SignInPage;