import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [cities, setCities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        const uniqueCities = [...new Set(data.map((s) => s.city))];
        setCities(uniqueCities);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 flex flex-col items-center justify-center text-white px-4">
      {/* Hero Section */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        FIND THE BEST SCHOOL FOR YOUR CHILD
      </h1>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search schools..."
          className="px-4 py-2 rounded-lg text-gray-800 border w-64 md:w-96"
        />
        <button className="bg-green-500 px-6 py-2 rounded-lg text-white hover:bg-green-600">
          Search
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Choose City */}
        <select
          className="px-4 py-3 rounded-lg text-gray-800"
          onChange={(e) => {
            if (e.target.value) {
              router.push(`/showSchools?city=${e.target.value}`);
            }
          }}
        >
          <option value="">Choose City</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
