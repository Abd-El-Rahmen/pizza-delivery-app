import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-4 px-6 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-red-400">Food<span className="text-white">logo</span></h2>
          <nav className="mt-4 space-x-4">
            <a href='/'  className="text-gray-400 hover:text-white">Home</a>
            <a href='/cart'  className="text-gray-400 hover:text-white">Cart</a>
            <a href='/account'  className="text-gray-400 hover:text-white">Account</a>
          </nav>
          <p className="mt-4 text-gray-500">Food  © 2024</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-400">
              <MapPin className="w-5 h-5 text-red-400 mr-3" />
              Lorem ipsum dolor sit amet consectetur .
            </li>
            <li className="flex items-center text-gray-400">
              <Phone className="w-5 h-5 text-red-400 mr-3" />
              +1.555.555.5555
            </li>
            <li className="flex items-center text-gray-400">
              <Mail className="w-5 h-5 text-red-400 mr-3" />
              support@Food.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">About  Food</h3>
          <p className="text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>
          <div className="flex space-x-4">
            <a  className="cursor-pointer text-gray-400 hover:text-red-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a  className="cursor-pointer text-gray-400 hover:text-red-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a  className="cursor-pointer text-gray-400 hover:text-red-400">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
