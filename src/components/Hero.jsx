import { Link } from "react-router-dom";

export default function Hero() {
  const handleScrollToPricing = () => {
    const section = document.getElementById("project-pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-slate-950 text-white"
    >
      {/* big background glow across hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80
        bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.25),_transparent_65%)]"
      />

      {/* dark vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0)_0,_rgba(15,23,42,1)_75%)]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT TEXT */}
        <div className="max-w-xl text-center lg:text-left space-y-6">
          <p className="uppercase tracking-[0.3em] text-xs text-emerald-300/70">
            lynix.digital
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Complete <span className="text-green-400">Digital Solutions</span>
            <br />
            For Web, Mobile & Desktop
          </h1>

          <p className="mt-2 text-gray-300 text-sm md:text-base">
            We build websites, e-commerce stores, mobile apps, desktop apps and
            custom software &mdash; with clean UI/UX and fast delivery.
          </p>

          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={handleScrollToPricing}
              className="bg-green-500 hover:bg-green-600 text-black px-7 py-3 rounded-full font-medium shadow-lg shadow-emerald-500/40 text-sm md:text-base transition"
            >
              Start a Project
            </button>

            <Link
              to="/services"
              className="border border-emerald-400/60 px-7 py-3 rounded-full text-emerald-200 hover:bg-emerald-400/10 text-sm md:text-base transition"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* RIGHT 3D GLOBE + MOTION */}
        <div className="relative w-full lg:flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end">
          {/* main green aura behind everything */}
          <div className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,_rgba(34,197,94,0.55),_transparent_65%)] blur-3xl opacity-90" />

          <div className="hero-globe-orbit relative w-72 sm:w-80 md:w-[420px]">
            {/* soft inner glow card */}
            <div className="absolute inset-0 rounded-[999px] bg-gradient-to-br from-emerald-500/35 via-emerald-400/5 to-transparent blur-3xl opacity-80" />

            {/* Globe image */}
            <img
              src="/images/globe-3d.png"
              alt="Lynix.digital 3D globe illustration"
              className="hero-globe relative w-full h-auto rounded-full select-none"
            />

            {/* small orbiting dots for extra motion */}
            <span className="hero-dot dot-1" />
            <span className="hero-dot dot-2" />
            <span className="hero-dot dot-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
