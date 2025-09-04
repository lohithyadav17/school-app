import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { city } = router.query;

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/getSchools`;
        
        // only add filter if city is chosen
        if (city && city.trim() !== "") {
          url += `?city=${encodeURIComponent(city)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [city]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading schools...</p>
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No schools found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {schools.map((school) => (
        <div
          key={school.id}
          className="bg-white rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-200"
        >
          <img
            src={school.image || "/school-placeholder.jpg"}
            alt={school.name}
            className="rounded-xl h-40 w-full object-cover mb-4"
          />

          <h2 className="text-lg font-bold text-gray-800">{school.name}</h2>
          <p className="text-gray-600 text-sm">{school.address}</p>
          <p className="text-gray-600 text-sm">
            {school.city}, {school.state}
          </p>
          <p className="text-gray-600 text-sm">{school.contact}</p>
          <p className="text-gray-600 text-sm">{school.email_id}</p>
        </div>
      ))}
    </div>
  );
}
