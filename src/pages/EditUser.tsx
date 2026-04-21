// import { useEffect, useState } from "react";
// import { getUserById, updateUser } from "../api/userApi";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import type { FormType } from "../types/userTypes";

// const EditUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState<FormType>({
//     name: "",
//     email: "",
//     address: "",
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await getUserById(id!);
//       setForm(res.data);
//     };
//     fetchUser();
//   }, [id]);

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await updateUser(id!, form);
//       toast.success("User updated");
//       navigate("/");
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate("/")} className="mb-4 text-blue-500">
//         ← Back
//       </button>

//       <form onSubmit={handleUpdate} className="flex flex-col gap-3">
//         <input
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />

//         <button className="bg-blue-500 text-white p-2">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditUser;

import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { FormType } from "../types/userTypes";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id!);

        // safer handling
        const userData = res.data.data || res.data;

        setForm({
          name: userData.name || "",
          email: userData.email || "",
          address: userData.address || "",
        });

      } catch {
        toast.error("Failed to load user");
      }
    };

    if (id) fetchUser();
  }, [id]);

  // Reusable handler (Type-safe)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user
  
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateUser(id!, form);
      toast.success("User updated successfully");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 mb-4 hover:underline"
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          Edit User
        </h2>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
          >
            {loading ? "Updating..." : "Update User"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditUser;