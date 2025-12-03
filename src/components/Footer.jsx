export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} lynix.digital — All Rights Reserved.
      </div>
    </footer>
  );
}
