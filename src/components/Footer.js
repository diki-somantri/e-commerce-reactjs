import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa"; //import icon

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto">
        <p className="text-center font-semibold text-white">
          &copy; Diki Somantri 2024. All Rights Reserved
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/diki-somantri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/diki-somantri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.instagram.com/diki_somantri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/diksom/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com/Diki_Somantri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
