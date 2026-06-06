import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser, loginUser } from '../../services/UserService';

const inputClasses =
    'mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-900 focus:shadow-sm';
const actionBtnCls = 'w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]';

// Enhancement 3: SignUp hits the real API, then auto-logs in
const SignUpPage = () => {
    const navigate = useNavigate();
    const [form,    setForm]    = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error,   setError]   = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);
        try {
            // Create the user (defaults: role=editor, isActive=true, age/gender/etc required by API)
            await createUser({
                firstName:     form.firstName.trim(),
                lastName:      form.lastName.trim(),
                email:         form.email.trim().toLowerCase(),
                password:      form.password,
                role:          'editor',
                gender:        'other',
                age:           '0',
                contactNumber: '00000000000',
                username:      form.email.trim().toLowerCase().split('@')[0].replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000),
                address:       'N/A',
                isActive:      true,
            });

            // Auto-login after signup
            const { data } = await loginUser({ email: form.email.trim(), password: form.password });
            localStorage.setItem('token',     data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('type',      data.type);
            localStorage.setItem('userId',    data.userId);

            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Sign up failed. Please try again.');
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
                    Create Account
                </h1>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Join the platform. You can update your full profile from the dashboard.
                </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                {error && (
                    <div className="rounded-xl border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="rounded-xl border border-green-800 bg-green-950/60 px-4 py-3 text-sm text-green-300">
                        Account created! Redirecting to dashboard…
                    </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="text-sm font-medium text-zinc-200">First Name</label>
                        <input id="first-name" name="firstName" type="text" placeholder="Enter first name"
                            autoComplete="given-name" value={form.firstName}
                            onChange={handleChange} className={inputClasses} required
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="text-sm font-medium text-zinc-200">Last Name</label>
                        <input id="last-name" name="lastName" type="text" placeholder="Enter last name"
                            autoComplete="family-name" value={form.lastName}
                            onChange={handleChange} className={inputClasses} required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="signup-email" className="text-sm font-medium text-zinc-200">Email Address</label>
                    <input id="signup-email" name="email" type="email" placeholder="Enter your email"
                        autoComplete="email" value={form.email}
                        onChange={handleChange} className={inputClasses} required
                    />
                </div>

                <div>
                    <label htmlFor="signup-password" className="text-sm font-medium text-zinc-200">Password</label>
                    <input id="signup-password" name="password" type="password"
                        placeholder="Create a password (min. 8 characters)"
                        autoComplete="new-password" value={form.password}
                        onChange={handleChange} className={inputClasses} required
                    />
                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                        Use a secure password with letters, numbers, and symbols.
                    </p>
                </div>

                <Button type="submit" variant="primary" className={actionBtnCls} disabled={loading || success}>
                    {loading ? 'Creating account…' : 'Create Account'}
                </Button>

            </form>

            <div className="mt-8 border-t border-zinc-700 pt-6 text-center text-sm text-zinc-400">
                Already have an account?{' '}
                <Link to="/auth/signin" className="font-semibold text-white transition hover:text-zinc-200">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;
