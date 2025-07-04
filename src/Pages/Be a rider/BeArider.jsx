import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import rider from "../../../src/assets/agent-pending.png";
import { useLoaderData } from "react-router";
import useAxiouSecure from "../../hook/useAxiouSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth(); // Get name and email from your auth system
  const serviceCenter = useLoaderData();
    const axiouSecure = useAxiouSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const riderData ={
        email: user.email,
        status:'pending',
        created_At:new Date().toISOString(),
        nid:data.nid,
        contact:data.contact,

    }
    // Add API submission here
 axiouSecure.post('/riders',riderData)
 .then(res=>{
  if(res.data.insertedId){

     Swal.fire({
    icon: 'success',
    title: 'Application Submitted!',
    text: 'Thank you for applying as a rider.',
    confirmButtonText: 'OK',
  });
  console.log(res.data)
  }
 })
    
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Be a Rider</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name (Read Only) */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name")}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              {...register("email")}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* NID */}
          <div>
            <label className="block mb-1 font-medium">NID Number</label>
            <input
              type="text"
              {...register("nid", { required: "NID is required" })}
              placeholder="Enter your NID number"
              className="w-full p-2 border rounded"
            />
            {errors.nid && (
              <p className="text-red-500 text-sm">{errors.nid.message}</p>
            )}
          </div>

          {/* Warehouse Selection */}
          <div>
            <label className="block mb-1 font-medium">
              Preferred Warehouse
            </label>
            <select
              {...register("warehouse", {
                required: "Warehouse selection is required",
              })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Service Center</option>
              {serviceCenter.map((center) => (
                <option key={center.id} value={center.district}>
                  {center.district}
                </option>
              ))}
            </select>
            {errors.warehouse && (
              <p className="text-red-500 text-sm">{errors.warehouse.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Minimum age is 18" },
              })}
              placeholder="Enter your age"
              className="w-full p-2 border rounded"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="block mb-1 font-medium">Region</label>
            <select
              {...register("region", { required: "Region is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Service Center</option>
              {serviceCenter.map((center) => (
                <option key={center.id} value={center.region}>
                  {center.region}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm">{errors.region.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input
              type="text"
              {...register("contact", {
                required: "Contact number is required",
              })}
              placeholder="Enter your contact number"
              className="w-full p-2 border rounded"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Rider Image Section */}
      <div className="flex justify-center items-center">
        <img
          src={rider}
          alt="Rider"
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default BeARider;
