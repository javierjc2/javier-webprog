
import Button from '../../components/Button';


const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6
              sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="flex items-center justify-center">
                        <img
                            src="/src/assets/img/picture about.png"
                            alt="Profile Picture"
                            className="w-72 h-72 object-cover rounded-full border-4 border-black shadow-md"
                        />
                    </div>
                    <div>
                        <h1 className="max-w-xl text-3xl font-bold 
            leading-7 text-zinc-900 sm:text-4xl">
                            About Me
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 
            text-zinc-600 sm:text-base">
                            I’m a third-year college student pursuing a Bachelor of Science in
                            Information Technology, majoring in Mobile and Web Applications at
                            National University Manila. I build digital solutions—especially the ones
                            that work on the first try (and when they don’t, I debug until they do).
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back to Home
                            </Button>
                            <Button to="/articles">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section >

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6
             sm:px-6 sm:py-8 lg:px-8">

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className=" rounded-3xl border-2 border-zinc-900 bg-zinc-100
                     p-5">
                        <p className="text-2xl font-bold text-zinc-900">03</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase 
                         tracking[0.24em] text-zinc-500">
                            Years Learning IT
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 
                    p-5">
                        <p className="text-2xl font-bold text-zinc-900">Web & Mobile</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase
                            tracking-[0.24em] text-zinc-500">
                            Development Scope
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100
                    p-5">
                        <p className="text-2xl font-bold text-zinc-900">09</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase
                            tracking-[0.24em] text-zinc-500">
                            Projects Built
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100
                        p-5">
                        <p className="text-2xl font-bold text-zinc-900">Tools</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase
                                tracking-[0.24em] text-zinc-500">
                            Git, Figma, and Canva
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-
            6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Developer Journey
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                            Writing Code and Hoping It Works on First Try
                        </h2>
                        <div className="mt-6 space-y-4">
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Hi, I’m Jude — an I.T. developer who turns logic into reliable apps and transforms fixes into clean, scalable code.

                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    I build modern and interactive web applications while pretending I understand why my code suddenly works after three hours of debugging.
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Experience Block
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    • Developed responsive websites using React and Tailwind CSS
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    • Built academic systems and modern UI interfaces
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    • Experienced in frontend development
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Tech Stack
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Frontend: React, Tailwind CSS, JavaScript
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Backend: Node.js, Express
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Database: MongoDB, MySQL
                                </p>

                                <p className="mt-3 text-sm leading-16 text-zinc-600">
                                    Currently improving full-stack development and UI/UX design skills.
                                </p>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Visual Grid
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="flex aspect-square items-center justify-
                            center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src="src/assets/img/gpt.jpg"
                                    alt="ChatGPT"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-
                            center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src="src/assets/img/cat.jpg"
                                    alt="Crying Cat"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-
                            center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src="src/assets/img/workspace.jpg"
                                    alt="workspace"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-
                            center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src="src/assets/img/quote.jpg"
                                    alt="quote"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                        </div>
                        <Button className="mt-5">View Section</Button>
                    </div>
                </div>
            </section>
        </div>

    );
};
export default AboutPage;