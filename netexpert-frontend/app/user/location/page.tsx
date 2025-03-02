"use client";
import { getProvinces, updateUser, getUser } from "@/app/services/services";
import React, { useEffect, useState } from "react";

export default function LocationSelector() {
  interface Province {
    id: number;
    name: string;
  }
  const [selectedProvince, setSelectedProvince] = useState("");
  let [provinces, setProvinces] = useState<Province[]>([]);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getProvinces().then((data) => {
      if (data) {
        console.log(data);
        setProvinces(data);
      } else {
        console.log("Error fetching provinces");
      }
    });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setSelectedProvince(parsedUser.location.id);
      console.log("user", storedUser);
    }
  }, []);

  const handleSaveLocation = () => {
    updateUser(Number(selectedProvince)).then((data) => {
      if (data && user) {
        console.log(data);

        // Update user in local storage
        getUser(user.username)
          .then((user) => {
            if (user) {
              localStorage.setItem("user_id", user.id);
              localStorage.setItem("user", JSON.stringify(user));

              window.location.href = '/user';
            }
          })
      } else {
        console.log("Error updating user");
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-[60%] bg-black bg-[radial-gradient(ellipse_at_61.25%_46.98%,_rgba(129,236,255,0.40)_0%,_rgba(109,226,239,0.12)_79.36%,_rgba(255,255,255,0)_100%)] p-10 text-white flex flex-col items-center justify-center">
        <div className=" max-w-2xl">
          <h2 className="text-3xl font-bold text-[#C7EBEB]">NEW LOCATIONS</h2>
          <p className="mt-2 text-sm text-gray-300">
            Utilize our interactive map to pinpoint your exact location. This
            helps us provide you with tailored services and relevant
            information. It’s quick, easy, and designed with you in mind!
          </p>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Select a city</option>
              {provinces.map((province, index) => (
                <option key={index} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setSelectedProvince("")}
              className="px-6 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              disabled={!selectedProvince}
              onClick={handleSaveLocation}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Map */}
      <div className="w-[40%] relative">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Map_of_Vietnam_with_provinces.svg/800px-Map_of_Vietnam_with_provinces.svg.png"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-md shadow-md">
          Pin Location
        </button>
      </div>
    </div>
  );
}
