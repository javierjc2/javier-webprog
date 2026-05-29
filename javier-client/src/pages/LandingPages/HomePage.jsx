import Button from '../../components/Button';

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 
      py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-
        center space-y-5">
                    <div>
                        <h1 className="max-w-xl text-3xl font-bold 
            leading-7 text-zinc-900 sm:text-4xl">
                            Jude Romulo Javier
                        </h1>

                        <p className="max-w-lg font-bold leading-12 text-zinc-900 sm:text-xl">
                            Mobile & Web Developer
                        </p>

                        <p className="mt-4 max-w-lg text-sm leading-7 
            text-zinc-600 sm:text-base">
                            I build responsive apps that look good, load fast, and don’t bite.
                            From UI polish to backend logic, I turn ideas into working features
                            using React, Node.js, MongoDB, and Tailwind CSS.
                        </p>
                        <div className="mt-6">
                            <Button to="/about" variant="primary">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src="/src/assets/img/picture about.png"
                            alt="Profile Picture"
                            className="w-72 h-72 object-cover rounded-full border-4 border-black shadow-md"
                        />
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 
      py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-
          900">
                        Tech Stack
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">MERN</p>
                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            MongoDB, Express.js, React, Node.js
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">FLUTTER</p>
                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Dart
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">HTML / CSS</p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">JAVASCRIPT</p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 
            py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        2024 - 2026
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Projects
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src="src/assets/img/Simple Product Catalog.png"
                                alt="Simple Product Catalog"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                            Product Catalog
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A simple and responsive product catalog platform showcasing
                            organized product listings, category filtering, and a clean
                            user-friendly browsing experience.
                        </p>
                        <p className="mt- text-sm leading-12 text-zinc-600">
                            Build using HTML, CSS, and Javascript
                        </p>
                        <Button className="mt-1" variant="primary">
                            View More
                        </Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src="src/assets/img/Bull Ex Mobile App.png"
                                alt="Simple Product Catalog"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                            Bull Ex Mobile Application
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            E-Commerce Mobile Application designed to deliver a smooth and seamless shopping experience with easy navigation,
                            user-friendly interfaces, and cart management.
                        </p>
                        <p className="mt- text-sm leading-12 text-zinc-600">
                            Build using Flutter
                        </p>
                        <Button className="mt-1" variant="primary">
                            View More
                        </Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src="src/assets/img/Bull Ex Web App.png"
                                alt="Simple Product Catalog"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                            Bull Ex Website Application
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A web-based shopping platform focused on providing convenient product discovery,
                            organized browsing, and a streamlined cart experience for online customers.
                        </p>
                        <p className="mt- text-sm leading-12 text-zinc-600">
                            Build using MERN
                        </p>
                        <Button className="mt-1" variant="primary">
                            View More
                        </Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;