// src/pages/Contact.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔽 ila jiti mn /contact?plan=E-Commerce%20Store n3ammro message automatiquement
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");

    if (plan) {
      setForm((prev) => ({
        ...prev,
        message:
          `Hi, I'm interested in the "${plan}" package from lynix.digital.\n\n` +
          "Here are some details about my project:\n" +
          "- Type of business:\n" +
          "- Features I need:\n" +
          "- Budget range:\n" +
          "- Deadline:\n",
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const SERVICE_ID = "service_8iocry7";
    const TEMPLATE_ID = "template_cjefr56"; // 👈 bqina 3la nafss template
    const PUBLIC_KEY = "7EiGj34YeR7MOjDsM";

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("error");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <main id="contact" className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
        Contact <span className="text-green-400">Us</span>
      </h1>

      <p className="text-center text-gray-300 mb-10 max-w-xl mx-auto text-sm md:text-base">
        Tell us about your project (web, desktop, e-commerce, system...) and we&apos;ll
        get back to you very soon.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4 bg-[#020617] border border-white/10 rounded-2xl p-6 md:p-8"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-[#0b1120] border border-white/10 
                       outline-none focus:border-green-400"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-[#0b1120] border border-white/10 
                       outline-none focus:border-green-400"
            placeholder="you@gmail.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-[#0b1120] border border-white/10 
                       outline-none focus:border-green-400"
            placeholder="+212 651-189916"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-3 py-2 rounded-xl bg-[#0b1120] border border-white/10 
                       outline-none focus:border-green-400 resize-none"
            placeholder="Describe your project, budget, deadline..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 
                     disabled:cursor-not-allowed text-black py-3 rounded-xl 
                     font-semibold transition-colors"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* Status Messages */}
        {status === "success" && (
          <p className="text-center text-sm text-green-400 mt-2">
            ✅ Message sent successfully! Check your inbox.
          </p>
        )}

        {status === "error" && (
          <p className="text-center text-sm text-red-400 mt-2">
            ❌ Error sending message. Please try again.
          </p>
        )}
      </form>
    </main>
  );
}
