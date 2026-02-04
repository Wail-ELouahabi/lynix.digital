export default function TrustLine() {
  return (
    <div className="relative w-full overflow-hidden bg-black/30 border-b border-white/10">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-semibold text-green-400 tracking-wide"
          >
            +350 Clients Validated • Trusted by Clinics & Barber Shops
          </span>
        ))}
      </div>
    </div>
  );
}
