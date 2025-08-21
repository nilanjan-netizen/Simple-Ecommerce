"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Contact() {
  const [method, setMethod] = useState<"email" | "whatsapp" | null>(null);
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("Name");
    const email = formData.get("Email");
    const message = formData.get("Message");

    if (method === "email") {
      try {
        formData.append("access_key", "2d3dfd01-c449-4a98-bb14-ca21d713f85f"); // ✅ your key
        formData.append("to", "nilanjanpaul123@gmail.com"); // ✅ replace with your email
        formData.append("subject", `New message from ${name}`);
        formData.append("from_name", name as string);
        formData.append("from_email", email as string);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          toast.success("📧 Email sent successfully!");
          form.reset();
        } else {
          toast.error(`❌ Email sending failed: ${data.message}`);
        }
      } catch (err) {
        toast.error("⚠️ Something went wrong!");
        console.error(err);
      }
    }

    if (method === "whatsapp") {
      const phoneNumber = "1234567890"; // ✅ replace with your number
      const whatsappMessage = `Hello, I am ${name}. My email is ${email}. Message: ${message}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
      toast.success("✅ WhatsApp message opened!");
      form.reset();
    }

    setResult("");
  };

  return (
    <motion.div
      className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📩 Contact Us</h2>

      {/* Step 1: Choose Option */}
      {!method && (
        <div className="space-y-4">
          <button
            onClick={() => setMethod("email")}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Connect via Email 📧
          </button>
          <button
            onClick={() => setMethod("whatsapp")}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
          >
            Connect via WhatsApp 💬
          </button>
        </div>
      )}

      {/* Step 2: Show Form */}
      {method && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="Name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            name="Email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <textarea
            name="Message"
            placeholder="Your Message"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-400 transform hover:scale-105 transition-all duration-300"
          >
            {method === "email" ? "Send Email 📧" : "Send via WhatsApp 💬"}
          </button>

          <button
            type="button"
            onClick={() => setMethod(null)}
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 mt-2"
          >
            ⬅️ Back
          </button>
        </form>
      )}

      {result && <p className="mt-3 text-gray-600">{result}</p>}
    </motion.div>
  );
}
