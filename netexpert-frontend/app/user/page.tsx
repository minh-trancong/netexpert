"use client";
import React, { useState, useEffect } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.username,
        email: parsedUser.email,
        location: parsedUser.location.name,
        password: parsedUser.password,
      });
      console.log("user", storedUser);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditLocation = () => {
    window.location.href = '/user/location';
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-black text-white p-6 flex items-center">
        <div className="w-14 h-14 bg-gray-700 rounded-full mr-4"></div>
        <div>
          <h2 className="text-lg font-semibold">
            {user?.username || "John Doe"}
          </h2>
          <span className="text-gray-400 text-sm">User</span>
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="max-w-3xl w-full text-center">
          <h2 className="text-4xl font-bold mb-4">Edit Profile</h2>
          <p className="text-gray-500">Update your personal information</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div>
              <label htmlFor="name" className="block text-left mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 ring-[1px] rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 ring-[1px] rounded-md"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-left mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter your saved location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 ring-[1px] rounded-md"
                disabled
              />

              <div className="mt-4 flex ">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleEditLocation()}>
                  Change Location
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-left mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 ring-[1px] rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 flex justify-center space-x-4">
            <button className="px-6 py-2 border border-gray-400 rounded-md" onClick={() => window.location.href='/'}>
              Cancel
            </button>
            <button className="px-6 py-2 bg-black text-white rounded-md">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:underline">
            Contact Us
          </a>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
