import founderImg from "../assets/wail-founder.jpg";

export default function AboutFounder() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-[#020617] border border-white/10 rounded-2xl p-10 shadow-xl flex flex-col md:flex-row items-center gap-10">

        {/* IMAGE BOX */}
        <div className="relative flex-shrink-0">
          {/* Main round image */}
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.25)]">
            <img
              src={founderImg}
              alt="Wail Elouahabi"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Soft halo ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border border-yellow-400/20 blur-[2px] opacity-30"></div>
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div className="text-center md:text-left max-w-xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
            Founder & Full-Stack Developer
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Wail <span className="text-green-400">Elouahabi</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">
            I build modern digital solutions for 
            <span className="text-green-300">
              {" "}startups, clinics, local shops and brands
            </span>{" "}— including e-commerce stores, landing pages, dashboards and desktop software.
          </p>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-3">
            My focus is simple: 
            <span className="text-green-300"> clean UI, clean code, reliable delivery </span>
            and strong communication. I help clients turn their ideas into fast, secure and ready-to-scale software.
          </p>

          <p className="text-gray-400 text-xs italic">
            “Every project is a chance to build something useful, simple & ready to scale.”
             wailelouahabi999@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
