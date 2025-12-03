export default function QuickContactButtons() {
  const PHONE = "+212651189916"; // 🔥 بدّل لرقم ديالك
  const WHATSAPP_MESSAGE = "Salam, bghit ntwasel m3ak 3la projet!";

  const whatsappUrl = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;
  const callUrl = `tel:${PHONE}`;

  return (
    <>
      {/* Call Button */}
      <a
        href={callUrl}
        className="fixed bottom-24 right-5 bg-[#0f172a] border border-white/10 hover:bg-[#020617] text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-110 z-50 flex items-center gap-2"
      >
        <span className="text-lg">📞</span>
        <span className="text-sm font-medium hidden sm:inline">Call Us</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-50"
      >
        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.551 4.169 1.595 5.977L0 24l6.26-1.557A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.601 17.175c-.249.699-1.455 1.331-2.011 1.383-.547.05-1.242.07-2.006-.127-.462-.116-1.056-.343-1.822-.673-3.207-1.389-5.297-4.625-5.46-4.843-.155-.218-1.302-1.733-1.302-3.31 0-1.577.823-2.357 1.115-2.678.291-.32.629-.399.84-.399.21 0 .42.002.606.011.195.01.455-.073.713.543.249.6.84 2.07.914 2.222.073.155.122.34.024.557-.097.218-.146.34-.292.53-.146.19-.31.425-.441.572-.146.155-.298.324-.128.636.169.31.75 1.238 1.613 2.003 1.11.99 2.04 1.3 2.35 1.447.31.146.49.122.667-.073.175-.195.77-.898.975-1.205.205-.31.415-.257.703-.155.291.097 1.84.868 2.155 1.024.31.155.517.232.594.364.073.132.073.699-.176 1.398z" />
        </svg>
      </a>
    </>
  );
}
