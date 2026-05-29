import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10 text-white">
      <main className="w-full max-w-md">
        <Outlet />
      </main>
    </section>
  );
};

export default AuthLayout;