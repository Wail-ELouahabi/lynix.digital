import AboutFounder from "../components/AboutFounder";

export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero / Intro */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          About <span className="text-green-400">Us</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          lynix.digital is a full-stack development studio building{" "}
          <span className="text-green-300">modern websites</span>,{" "}
          <span className="text-green-300">e-commerce platforms</span>,{" "}
          <span className="text-green-300">web apps</span>, and{" "}
          <span className="text-green-300">desktop software</span> for
          businesses and individuals. We take care of everything from idea,
          design and development to deployment and support.
        </p>
      </section>

      {/* 2 columns: Who we are / What we do */}
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#020617] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3 text-green-400">
            Who We Are
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            We are a small, focused team of full-stack developers passionate
            about clean code, performance and user experience. Our goal is to
            help you launch reliable digital products without stress, with clear
            communication and transparent timelines.
          </p>
        </div>

        <div className="bg-[#020617] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3 text-green-400">
            What We Do
          </h2>
          <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
            <li>Business websites & landing pages</li>
            <li>E-commerce stores with admin dashboards</li>
            <li>Custom web applications & SaaS dashboards</li>
            <li>Desktop apps for Windows (management, billing, POS…)</li>
            <li>API development, integrations & basic IT services</li>
          </ul>
        </div>
      </section>

      {/* Tech stack / tools */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Technologies We <span className="text-green-400">Love</span>
        </h2>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          {[
            "React.js",
            "Tailwind CSS",
            "Laravel / PHP",
            "Node.js APIs",
            "MySQL / SQL",
            "REST APIs",
            "Git & GitHub",
            "Deployment & Hosting",
          ].map((item) => (
            <div
              key={item}
              className="bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-center text-gray-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Why Clients <span className="text-green-400">Work With Us</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-[#020617] border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Full-Stack Mindset</h3>
            <p className="text-gray-300">
              We understand both frontend and backend, so we design solutions
              that are fast, secure and easy to maintain.
            </p>
          </div>

          <div className="bg-[#020617] border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Clean UI & UX</h3>
            <p className="text-gray-300">
              Modern, responsive interfaces that look professional on desktop,
              tablet and mobile.
            </p>
          </div>

          <div className="bg-[#020617] border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Flexible Collaboration</h3>
            <p className="text-gray-300">
              We can join your existing project, build from scratch, or help you
              refactor and improve what you already have.
            </p>
          </div>
        </div>
      </section>

      {/* 👤 Founder section */}
      <AboutFounder />

      {/* Call to action */}
      <section className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-2">
          Ready to start a{" "}
          <span className="text-green-400">new project</span>?
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Tell us what you want to build and we&apos;ll help you choose the best
          stack, architecture and roadmap.
        </p>
        <a
          href="/contact"
          className="inline-block bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-xl"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
}
