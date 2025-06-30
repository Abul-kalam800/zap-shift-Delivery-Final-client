import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hook/useAuth';
import useAxiouSecure from '../../hook/useAxiouSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


const Myparcel = () => {
    const {user}= useAuth();
    const navigation = useNavigate();
    const  axiouSecure = useAxiouSecure()
    const {data:parcels=[],refetch}=useQuery({
        queryKey:['my-parcel',user.email],
        queryFn: async()=>{
            const res= await axiouSecure.get(`/parcels?email=${user.email}`)
            return res.data

        }
    })
    console.log(parcels)

   const handleDelete = async (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
               axiouSecure.delete(`/parcels/${id}`)
               .then(res=>{
                console.log(res.data)
                if(res.data.deletdCount){
                    
                    Swal.fire(
                        'Deleted!',
                        'Your parcel has been deleted.',
                        'success'
                    );
                }

                refetch();
               })
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete parcel.', 'error');
            }
        }
    });
};

  const handlePay = (parcel) => {
       console.log('payment ')
        // You can link to your payment gateway here
        navigation(`/dashboard/payment/${parcel}`)
    };

    const handleView = (parcel) => {
        alert(`Viewing parcel details for Tracking ID: ${parcel.trackingId}`);
        // You can navigate to a details page here
    };

    return (

        <div className="overflow-x-auto p-4">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Document Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td className="capitalize">{parcel.parcelType}</td>
                            <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                            <td>৳{parcel.cost}</td>
                            <td className={parcel.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}>
                                {parcel.paymentStatus || 'Unpaid'}
                            </td>
                            <td className="flex gap-2">
                                <button onClick={() => handleView(parcel)} className="btn btn-sm btn-info">View</button>
                                <button onClick={() => handlePay(parcel._id)} className="btn btn-sm btn-success">Pay</button>
                                <button onClick={() => handleDelete(parcel._id)} className="btn btn-sm btn-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Myparcel;