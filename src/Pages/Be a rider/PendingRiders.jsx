import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiouSecure from "../../hook/useAxiouSecure";

const PendingRiders = () => {
  const [pendingRiders, setPendingRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiouSecure = useAxiouSecure();

  // Fetch pending riders from API
  //   useEffect(() => {
  //     axios.get('http://localhost:5000/api/riders')
  //       .then(response => setPendingRiders(response.data))
  //       .catch(error => console.error('Error fetching riders:', error));
  //   }, []);
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["pending-riders"],

    queryFn: async () => {
      const res = await axiouSecure.get("/pending");
      return res.data;
    },
  });
  // Modal open
  const handleView = (rider) => {
    setSelectedRider(rider);
    setIsModalOpen(true);
  };

  // Modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRider(null);
  };

  // Confirm Rider API
  const handleConfirm = (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm this rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiouSecure
          .patch(`/riders/${riderId}/status`, {
            status: "Active",
          })
          .then(() => {
            Swal.fire("Confirmed!", "Rider has been confirmed.", "success");
            riders.filter((rider) => rider._id !== riderId);
            refetch();
          })
          .catch(() => Swal.fire("Error", "Failed to confirm rider.", "error"));
      }
    });
  };

  // Reject Rider API
  const handleReject = (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiouSecure
          .patch(`/riders/${riderId}/status`, {
            status: "rejected",
          })

          .then(() => {
            Swal.fire("Rejected!", "Rider has been rejected.", "success");

            riders.filter((rider) => rider._id !== riderId);
            refetch();
          })
          .catch(() => Swal.fire("Error", "Failed to reject rider.", "error"));
      }
    });
  };

  // Delete Rider API
  const handleDelete = (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this rider?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/riders/${riderId}`)
          .then(() => {
            Swal.fire("Deleted!", "Rider has been deleted.", "success");
            setPendingRiders(
              pendingRiders.filter((rider) => rider._id !== riderId)
            );
          })
          .catch(() => Swal.fire("Error", "Failed to delete rider.", "error"));
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">NID</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td className="p-2 border">{rider.name}</td>
                <td className="p-2 border">{rider.email}</td>
                <td className="p-2 border">{rider.nid}</td>
                <td className="p-2 border">{rider.status}</td>
                <td className="p-2 border">{rider.contact}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleView(rider)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleConfirm(rider._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleReject(rider._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {isModalOpen && selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <p>
              <strong>Name:</strong> {selectedRider.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>NID:</strong> {selectedRider.nid}
            </p>
            <p>
              <strong>Service Center:</strong> {selectedRider.serviceCenter}
            </p>
            <p>
              <strong>Age:</strong> {selectedRider.age}
            </p>
            <p>
              <strong>Contact:</strong> {selectedRider.contact}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
