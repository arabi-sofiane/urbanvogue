import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Instagram, Send, Check } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 3000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif text-black font-semibold uppercase tracking-wider">
            Get in Touch
          </h1>
          <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
            We're here to assist you with inquiries, styling advice, or feedback. Reach out to our
            concierge team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Concierge Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-gray-100 p-8 space-y-8 bg-[#FAFAFA]">
              <h3 className="text-xl font-serif text-black uppercase tracking-wider font-semibold border-b border-gray-100 pb-4">
                Concierge
              </h3>

              <div className="space-y-6 text-sm">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-neutral-100/50 rounded-none text-gray-900 shrink-0">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5 select-none">Email</p>
                    <a href="mailto:concierge@urbanvogue.com" className="text-gray-800 font-medium hover:text-black transition">
                      concierge@urbanvogue.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-neutral-100/50 rounded-none text-gray-900 shrink-0">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5 select-none">Phone</p>
                    <a href="tel:+18005550199" className="text-gray-800 font-medium hover:text-black transition">
                      +1 (800) 555-0199
                    </a>
                    <p className="text-xs text-gray-400 font-light mt-0.5">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                {/* Flagship Studio */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-neutral-100/50 rounded-none text-gray-900 shrink-0">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5 select-none font-sans">Flagship Studio</p>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      120 Fashion Ave, Suite 400 <br /> New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="border border-gray-100 p-8 space-y-4 bg-white">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 select-none">Follow Us</h4>
              <div className="flex space-x-3.5">
                <a
                  href="#"
                  className="p-3.5 border border-gray-200 text-gray-700 hover:text-white hover:bg-black transition rounded-none flex items-center justify-center cursor-pointer"
                >
                  <Globe className="h-4.5 w-4.5" />
                </a>
                <a
                  href="#"
                  className="p-3.5 border border-gray-200 text-gray-700 hover:text-white hover:bg-black transition rounded-none flex items-center justify-center cursor-pointer"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Send Message Form */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-8 sm:p-10">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif uppercase tracking-widest text-[#15803d] font-semibold">Message Received</h3>
                <p className="text-xs text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting the concierge. We have verified your request and one of our dedicated associates will respond within 24 business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <h3 className="text-2xl font-serif text-black uppercase tracking-wider font-semibold">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 select-none">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-black rounded-none transition"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 select-none">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-black rounded-none transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 select-none">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-black rounded-none transition"
                  />
                </div>

                {/* Subject Dropdown */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 select-none">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none bg-white focus:border-black rounded-none transition cursor-pointer"
                  >
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Styling Advice">Product Styling Advice</option>
                    <option value="Sizing Advice">Sizing & Fit</option>
                    <option value="Feedback / Press">Press Inquiries</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 select-none">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-black rounded-none transition resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-neutral-900 transition h-12 w-full sm:w-auto px-8 py-3 text-xs font-semibold tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2"
                >
                  Submit Inquiry <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
