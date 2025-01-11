import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1E6E92] text-white py-10 rounded-3xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold">Health Record</h2>
          <p className="mt-2">
            Leading the Way in Medical Excellence, Trusted Care.
          </p>
        </div>

        {/* Important Links Section */}
        <div>
          <h3 className="font-bold text-lg">Important Links</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:underline">Appointment</a></li>
            <li><a href="#" className="hover:underline">Doctors</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="font-bold text-lg">Contact Us</h3>
          <p className="mt-4">Call: (+254) 717 783 146</p>
          <p>Email: healthrecord@gmail.com</p>
          <p>Address: 0123 Some place, Some country</p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-bold text-lg">Newsletter</h3>
          <div className="flex flex-col items-start mt-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="rounded-lg p-2 w-full text-gray-700"
            />
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-blue-400 pt-4 flex flex-col items-center">
        <p>© 2024 Health Record  All Rights Reserved by ------</p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="hover:text-gray-300"> {/* LinkedIn icon */}
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="hover:text-gray-300"> {/* Facebook icon */}
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-gray-300"> {/* Instagram icon */}
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
