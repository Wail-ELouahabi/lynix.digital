// src/components/Features.jsx
const data = [
  {
    title: "Medical Website (Doctors & Clinics)",
    desc: "Modern clinic websites built with React + Tailwind: fast, responsive, and designed to build patient trust.",
  },
  {
    title: "Medical Dashboard UI",
    desc: "Admin dashboard UI for clinics: appointments, patients, statistics, and settings (front-end ready for backend).",
  },
  {
    title: "Full Medical Solution",
    desc: "Complete package: medical website + dashboard UI with consistent branding and professional design.",
  },
  {
    title: "Redesign & UI Upgrade",
    desc: "Transform an old clinic website into a modern, mobile-first experience with better structure and speed.",
  },
  {
    title: "UI / UX for Medical Brands",
    desc: "Clean UI/UX optimized for clinics: strong calls-to-action, booking flow, and easy navigation.",
  },
  {
    title: "Deployment & Support",
    desc: "Launch help + small updates: deployment, bug fixes, performance improvements, and ongoing support if needed.",
  },
];

export default function Features() {
  const goToPricing = () => {
    const pricing = document.getElementById("project-pricing");
    if (pricing) {
      pricing.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">
        Medical Services We Provide
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.title}
            onClick={goToPricing}
            className="bg-[#0f172a] border border-white/10 p-6 rounded-2xl hover:border-green-400/30 hover:bg-white/5 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-green-400">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">{item.desc}</p>

            <p className="mt-4 text-xs text-gray-400">
              Click to view pricing →
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
