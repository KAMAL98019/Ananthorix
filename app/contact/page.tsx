"use client";

import { useState } from "react";
import FadeIn from "../components/FadeIn";
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone } from "lucide-react";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");

      // Reset error state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-[#030b1a] py-20 px-4 sm:px-6 lg:px-10 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#187BDD] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3b82f6] rounded-full blur-[200px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 pt-10">

        {/* Header section */}
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center">
          <span className="text-[#A6C8FF] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-[0_0_8px_rgba(166,200,255,0.6)] block">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Let's Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#187BDD]">Future</span>
          </h1>
          <p className="text-[#C1C6D5] text-base sm:text-lg leading-relaxed">
            Whether you have a specific project in mind or simply want to explore how our cutting-edge technologies can accelerate your growth, we're ready to listen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Contact Information */}
          <FadeIn direction="right" delay={200} className="flex flex-col space-y-12">

            {/* Contact Details Cards */}
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-[#07152D] border border-white/5 shadow-xl hover:border-white/10 transition-colors">
                <div className="flex shrink-0 items-center justify-center w-14 h-14 rounded-full bg-[#187BDD]/10 text-[#187BDD]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                  <a href="mailto:hello@anantorix.com" className="text-[#C1C6D5] hover:text-[#A6C8FF] transition-colors">hello@anantorix.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-[#07152D] border border-white/5 shadow-xl hover:border-white/10 transition-colors">
                <div className="flex shrink-0 items-center justify-center w-14 h-14 rounded-full bg-[#187BDD]/10 text-[#187BDD]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Headquarters</h3>
                  <p className="text-[#C1C6D5]">123 Innovation Drive, Tech District<br />San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-[#07152D] border border-white/5 shadow-xl hover:border-white/10 transition-colors">
                <div className="flex shrink-0 items-center justify-center w-14 h-14 rounded-full bg-[#187BDD]/10 text-[#187BDD]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                  <a href="tel:+18001234567" className="text-[#C1C6D5] hover:text-[#A6C8FF] transition-colors">+1 (800) 123-4567</a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Contact Form */}
          <FadeIn direction="left" delay={400}>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#07152D] border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Form background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#187BDD] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 relative z-10">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-[#A6C8FF]">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0b1a30] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#187BDD] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-[#A6C8FF]">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0b1a30] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#187BDD] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-[#A6C8FF]">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#0b1a30] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#187BDD] focus:border-transparent transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-[#A6C8FF]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full px-5 py-3.5 rounded-xl bg-[#0b1a30] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#187BDD] focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button & Status */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="group flex items-center justify-center w-full gap-2 px-8 py-4 rounded-xl bg-[#187BDD] hover:bg-[#156bbb] text-white font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(24,123,221,0.3)]"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : status === "success" ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    )}
                  </button>

                  {/* Error State */}
                  {status === "error" && (
                    <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">
                        There was an error sending your message. Please try again or email us directly.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
