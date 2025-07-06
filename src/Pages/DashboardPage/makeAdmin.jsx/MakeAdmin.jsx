import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import useAxiouSecure from "../../../hook/useAxiouSecure";
import useAxioes from "../../../hook/useAxioes";

const MakeAdmin = () => {
  const [search, setSearch] = useState("");

  const axiosSecure = useAxiouSecure();
  const axiosInstance = useAxioes();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/search?email=${search}`);
      return res.data;
    },
    enabled: !!search, // only fetch when search is not empty
  });

  const handleSearchChange = (e) => setSearch(e.target.value);

  const updateUserRole = async (email, newRole) => {
    try {
      const res = await axiosInstance.patch('/users/role',{email, role:newRole});
      if (res.data) {
        alert(res.data.newRole);
        refetch(); // Refresh user list
      }
      console.log(res.data.role)
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role");
    }
  };


  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered"
        />

        <button onClick={refetch} className="btn btn-primary">
          Search
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td
                className={`${
                  user.role == "admin" ? "bg-green-100 mb-2" : "bg-red-300"
                } `}
              >
                {user.role}
              </td>
              <td className="flex gap-2">
                {user.role == "admin" ? (
                  <button
                    onClick={() => updateUserRole(user.email, "user")}
                    className="btn btn-warning btn-sm"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => updateUserRole(user.email, "admin")}
                    className="btn btn-success btn-sm"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
