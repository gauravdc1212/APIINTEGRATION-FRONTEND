import React, { useState } from "react";
import { createUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { FormType } from "../types/userTypes";

const AddUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(form);
      toast.success("User added");
      navigate("/");
    } catch {
      toast.error("Error adding user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <button onClick={() => navigate("/")} className="text-blue-500 mb-4">
          ← Back
        </button>

        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button className="bg-green-500 hover:bg-green-600 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
