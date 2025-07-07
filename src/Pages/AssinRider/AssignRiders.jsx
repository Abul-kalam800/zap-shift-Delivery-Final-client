import { useQuery } from "@tanstack/react-query";

import { FaUserPlus } from "react-icons/fa";
import useAxiouSecure from "../../hook/useAxiouSecure";

const AssignRiders = () => {
  const axiosSecure = useAxiouSecure();

  // Fetch parcels data
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "paid", "not-collected"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?PaymentStatus=Paid&DelivryStatus=not_collected"
      );
      return res.data;
    },
  });
  console.log(parcels);

  // Filter parcels with PaymentStatus 'paid' and DelivryStatus 'not collected'
  //   const filteredParcels = parcels.filter(
  //     (parcel) =>
  //       parcel.PaymentStatus === "paid" &&
  //       parcel.DelivryStatus === "not collected"
  //   );

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assign Riders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Delivery Address</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverContact}</td>
                <td>{parcel.receiverDistrict}</td>
                <td className="text-green-500">{parcel.PaymentStatus}</td>
                <td className="text-yellow-500">{parcel.DelivryStatus}</td>
                <td>
                  <button className="btn btn-sm btn-primary flex items-center gap-1">
                    <FaUserPlus /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRiders;
