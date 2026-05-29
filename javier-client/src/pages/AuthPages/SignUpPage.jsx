import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-900 focus:shadow-sm';

const actionButtonClassName =
  'w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
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
            Create Account
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Join the platform and create your account to start
            exploring a clean and modern experience.
          </p>
        </div>
        <form className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="text-sm font-medium text-zinc-200">
                First Name
              </label>

              <input
                id="first-name"
                type="text"
                placeholder="Enter first name"
                autoComplete="given-name"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="text-sm font-medium text-zinc-200">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Enter last name"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-zinc-200">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-zinc-200">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              className={inputClasses}
            />
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>
          <Button
            type="submit"
            variant="primary"
            className={actionButtonClassName}>
            Create Account
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
              className={actionButtonClassName}>
              Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={actionButtonClassName}>
              Apple
            </Button>
          </div>
        </form>
        <div className="mt-8 border-t border-zinc-700 pt-6 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link
            to="/auth/signin"
            className="font-semibold text-white transition hover:text-zinc-200">
              Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;