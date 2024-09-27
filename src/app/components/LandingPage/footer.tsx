import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-eisha text-white mt-20 py-8 w-full">
      <div className="container mx-auto w-full flex flex-col items-center space-y-6">
        {/* Links */}
        <div className="space-x-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/portfolio" className="hover:underline">Portfolio</a>
          <a href="/PrivacyPolicy" className="hover:underline">Privacy Policy</a>
          <a href="/careers" className="hover:underline">Careers</a>
          <a href="/about-us" className="hover:underline">About Us</a>
          <a href="/blogs" className="hover:underline">Blogs</a>
          <a href="/contact-us" className="hover:underline">Contact Us</a>
        </div>

       
        <div className="text-center">
          <p>info@skynova.com</p>
          <p>+92 90078601| I-8/4, Islamabad, Pakistan</p>
        </div>

        
        <div className="space-x-4 flex justify-center">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="hover:text-gray-300" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-gray-300" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="hover:text-gray-300" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-gray-300" />
          </a>
        </div>
      </div>

      <div className="border-t border-white mt-8 pt-4 text-center">
        <p>Copyright © 2024 skynova. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
