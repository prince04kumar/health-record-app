import React from "react";

const ContactUs = () => {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 p-4 lg:p-12 min-h-screen"
      style={{ background: '../assets/background.webp', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Contact Form Section */}
      <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">CONTACT US</h2>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter a valid email address"
              className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <textarea
              rows="4"
              placeholder="Enter your message"
              className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 transition rounded-md"
          >
            SUBMIT
          </button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="w-full lg:w-1/3 bg-gray-800 text-white p-8 rounded-lg shadow-lg mt-8 lg:mt-0 lg:ml-8">
        <div className="space-y-6">
          {/* Call Us */}
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <span className="mr-2 text-orange-400">📞</span> CALL US
            </h3>
            <p>1 (234) 567-891, 1 (234) 987-654</p>
          </div>

          {/* Location */}
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <span className="mr-2 text-orange-400">📍</span> LOCATION
            </h3>
            <p>121 Rock Street, 21 Avenue, New York, NY 92103-9000</p>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <span className="mr-2 text-orange-400">🕒</span> BUSINESS HOURS
            </h3>
            <p>Mon - Fri: 10 am - 8 pm, Sat, Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
