import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
    'mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-900 focus:shadow-sm';
const actionBtnCls = 'w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');
    const [error,    setError]    = useState('');
    const [loading,  setLoading]  = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await loginUser({ email: email.trim(), password });
            localStorage.setItem('token',     data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('type',      data.type);
            localStorage.setItem('userId',    data.userId);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-sm sm:p-10">

            <div className="flex items-center gap-4">
                <Link to="/"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-xl text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
                    title="Back to Home"
                >←</Link>
            </div>

            <div className="mt-6">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Welcome Back
                </h1>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Sign in to continue to your dashboard.
                </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                {error && (
                    <div className="rounded-xl border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="signin-email" className="text-sm font-medium text-zinc-200">
                        Email Address
                    </label>
                    <input id="signin-email" type="email" placeholder="Enter your email"
                        autoComplete="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses} required
                    />
                </div>

                <div>
                    <label htmlFor="signin-password" className="text-sm font-medium text-zinc-200">
                        Password
                    </label>
                    <input id="signin-password" type="password" placeholder="Enter your password"
                        autoComplete="current-password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClasses} required
                    />
                </div>

                <Button type="submit" variant="primary" className={actionBtnCls} disabled={loading}>
                    {loading ? 'Signing in…' : 'Log In'}
                </Button>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-700" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-zinc-950 px-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                            test accounts
                        </span>
                    </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-xs text-zinc-400 space-y-1">
                    <p><span className="text-zinc-300 font-semibold">Admin:</span> alicia.reyes@javier.dev / Alicia123!</p>
                    <p><span className="text-zinc-300 font-semibold">Editor:</span> bianca.cruz@javier.dev / Bianca123! <span className="text-red-400">(inactive)</span></p>
                    <p className="text-zinc-600">Viewer accounts are blocked from login.</p>
                </div>

            </form>

            <div className="mt-8 border-t border-zinc-700 pt-6 text-center text-sm text-zinc-400">
                No account yet?{' '}
                <Link to="/auth/signup" className="font-semibold text-white transition hover:text-zinc-200">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;
