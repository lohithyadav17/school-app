import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("image", data.image[0]);

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ School added successfully!");
        reset();
      } else {
        setMessage("❌ " + result.error);
      }
    } catch (err) {
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">Add School</h1>

        {/* Name */}
        <input
          {...register("name", { required: "School name is required" })}
          placeholder="School Name"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Address */}
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="Address"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        {/* City */}
        <input
          {...register("city", { required: "City is required" })}
          placeholder="City"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        {/* State */}
        <input
          {...register("state", { required: "State is required" })}
          placeholder="State"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        {/* Contact */}
        <input
          type="number"
          {...register("contact", {
            required: "Contact is required",
            minLength: { value: 10, message: "Must be 10 digits" },
          })}
          placeholder="Contact Number"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

        {/* Email */}
        <input
          type="email"
          {...register("email_id", { required: "Valid email is required" })}
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.email_id && <p className="text-red-500">{errors.email_id.message}</p>}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
