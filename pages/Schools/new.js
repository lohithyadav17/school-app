import { useState } from "react";

export default function NewSchool() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/addSchool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New School</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="School Name" value={form.name} onChange={handleChange} required /><br />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} /><br />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} /><br />
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} /><br />
        <input type="text" name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} /><br />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
