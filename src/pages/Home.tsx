import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userApi";
import type { IUser } from "../types/userTypes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchData = async () => {
  //     try {
  //       const res = await getUsers();
  //       if (isMounted) {
  //         setUsers(res.data.data || res.data);
  //       }
  //     } catch {
  //       toast.error("Error fetching users");
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data.data || res.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unexpected error");
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("User deleted");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl">
        {/* Add User Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">User List</h1>
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            + Add User
          </button>
        </div>

        {/* Users */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">{user.address}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/edit/${user._id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user._id!)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
