const data = [
  {
    title: "Website Development",
    desc: "Modern, responsive and fast websites using React, Laravel, Tailwind CSS and more."
  },
  {
    title: "E-Commerce Solutions",
    desc: "Full online stores with payments, admin dashboards, product management and automation."
  },
  {
    title: "Desktop Applications",
    desc: "Custom desktop apps for Windows using Electron, Python, or .NET technologies."
  },
  {
    title: "Web Applications",
    desc: "Professional web tools, dashboards, SaaS applications and secure backend APIs."
  },
  {
    title: "UI / UX Design",
    desc: "Clean, modern and user-friendly interface designs for all platforms."
  },
  {
    title: "System & IT Services",
    desc: "Complete IT solutions, system configurations, installations and automation."
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Professional Services We Provide
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.title}
            className="bg-[#0f172a] border border-white/10 p-6 rounded-2xl hover:border-green-400/30 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-green-400">{item.title}</h3>
            <p className="mt-2 text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
