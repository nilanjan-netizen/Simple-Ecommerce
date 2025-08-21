"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-gradient-to-r from-yellow-50 via-red-50 to-yellow-50 text-gray-800 shadow-inner"
    >
      <div className="flex flex-col md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 gap-10 py-16 border-b border-red-200">
        
        {/* About / Description */}
        <div className="w-full md:w-1/3">
          <p className="mt-6 text-base md:text-lg leading-relaxed text-red-700">
            <span className="font-bold text-red-800">Our Cloud Kitchen</span> brings 
            delicious, freshly-cooked meals straight to your doorstep.  
            From classic Indian dishes to global flavors, we focus on quality, hygiene, and fast delivery.  
            Experience the taste of home, made with love and delivered with care.
          </p>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-red-700">
            <span className="font-bold text-red-800">আমাদের ক্লাউড কিচেন</span> আপনার দুয়ারে নিয়ে আসে সুস্বাদু, গরম-গরম খাবার।  
            ক্লাসিক ভারতীয় রান্না থেকে শুরু করে বিশ্বজুড়ে নানা স্বাদ, আমরা দিই মান, স্বাস্থ্যবিধি আর দ্রুত ডেলিভারির নিশ্চয়তা।  
            বাড়ির স্বাদ, ভালোবাসায় তৈরি আর যত্নে পৌঁছে দেওয়া – এটাই আমাদের প্রতিশ্রুতি।
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:items-center">
          <h2 className="font-semibold text-red-800 text-lg mb-5">Quick Links | দ্রুত লিঙ্ক</h2>
          <ul className="space-y-3 text-base">
            <li>
              <a className="hover:text-red-600 hover:underline transition-colors duration-300" href="/">🏠 Home | হোম</a>
            </li>
            <li>
              <a className="hover:text-red-600 hover:underline transition-colors duration-300" href="/products">🍴 Menu | মেনু</a>
            </li>
            <li>
              <a className="hover:text-red-600 hover:underline transition-colors duration-300" href="/checkout">🛒 Order Online | অনলাইনে অর্ডার</a>
            </li>
            <li>
              <a className="hover:text-red-600 hover:underline transition-colors duration-300" href="/Contact">📞 Contact Us | যোগাযোগ</a>
            </li>
            <li>
              <a className="hover:text-red-600 hover:underline transition-colors duration-300" href="/Admin">⚙️ Admin Panel | এডমিন</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:items-center">
          <h2 className="font-semibold text-red-800 text-lg mb-5">Get in Touch | যোগাযোগ করুন</h2>
          <div className="space-y-2 text-base">
            <p>📞 <span className="text-red-700 font-medium">+91-98765-43210</span></p>
            <p>✉️ <span className="text-red-700 font-medium">contact@ourcloudkitchen.in</span></p>
            <p>🏢 <span className="text-red-700 font-medium">45, Ramnagar, West Tripura, India</span></p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6 text-2xl text-red-700">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-600"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-500"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-600"><FaYoutube /></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-green-600"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="py-6 text-center text-sm md:text-base text-red-700 font-medium">
        © 2025 Our Cloud Kitchen | আমাদের ক্লাউড কিচেন. All Rights Reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
