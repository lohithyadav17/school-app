import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getSchools`
        );
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);*/ 
  useEffect(() => {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  const fetchSchools = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getSchools`
      );
      const data = await res.json();
      console.log("Fetched schools:", data); // 👈 debug log
      setSchools(data);
    } catch (err) {
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchSchools();
}, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading schools...
      </div>
    );
  }

  if (!schools.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">No Schools Found</h1>
        <p className="mt-2 text-gray-500">Add some schools first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Schools List
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-200"
          >
            {/* Image */}
            <img
              src={school.image || "/school-placeholder.jpg"}
              alt={school.name}
              className="rounded-xl h-40 w-full object-cover mb-4"
            />

            {/* Info */}
            <h2 className="text-lg font-bold text-gray-800">{school.name}</h2>
            <p className="text-gray-600 text-sm">{school.address}</p>
            <p className="text-gray-600 text-sm">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
