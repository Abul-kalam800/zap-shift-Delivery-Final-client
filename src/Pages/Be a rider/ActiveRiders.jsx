import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiouSecure from '../../hook/useAxiouSecure';


const ActiveRiders = () => {
  const axiouSecure = useAxiouSecure();

  // Fetch active riders using TanStack Query
  const { data: activeRiders = [], isLoading, refetch } = useQuery({
    queryKey: ['riders','active'],
    queryFn: async () => {
      const response = await  axiouSecure.get('/riders/active');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="p-6 text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Active Riders</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">NID</th>
              <th className="p-2 border">Service Center</th>
              <th className="p-2 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {activeRiders.length > 0 ? (
              activeRiders.map((rider) => (
                <tr key={rider._id}>
                  <td className="p-2 border">{rider.name}</td>
                  <td className="p-2 border">{rider.email}</td>
                  <td className="p-2 border">{rider.nid}</td>
                  <td className="p-2 border">{rider.status}</td>
                  <td className="p-2 border">{rider.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No active riders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
