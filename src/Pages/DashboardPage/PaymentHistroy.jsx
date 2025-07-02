import React from "react";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiouSecure from "../../hook/useAxiouSecure";

const PaymentHistroy = () => {
  const { user } = useAuth();
  const axiouSecure = useAxiouSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiouSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
  });
  console.log(payments);
  if (isLoading) {
    return <span>Loading......................</span>;
  }
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-gray-200">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>User Email</th>
            <th>Amount</th>

            <th>Created At</th>
            <th>Paid At</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.parcelId}</td>
              <td>{payment.userEmail}</td>
              <td>${payment.amount}</td>

              <td>{new Date(payment.created_At).toLocaleString()}</td>
              <td>{new Date(payment.paid_at_string).toLocaleString()}</td>
              <td>{payment.transjctionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistroy;
