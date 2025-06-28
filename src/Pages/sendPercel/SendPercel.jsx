import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import useAxiouSecure from "../../hook/useAxiouSecure";

const generateTrackingID = () => {
  return "TRK" + Date.now() + Math.floor(Math.random() * 1000);
};
const SendParcel = () => {
  const { user } = useAuth();
  const axiouSecure = useAxiouSecure();
  const warehouseData = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedSenderWarehouse, setSelectedSenderWarehouse] = useState("");
  const [selectedReceiverWarehouse, setSelectedReceiverWarehouse] =
    useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [deliveryType, setDeliveryType] = useState("");

  const parcelType = watch("parcelType");
  const weight = watch("weight");

  const senderDistricts = warehouseData.filter(
    (item) => item.region === selectedSenderWarehouse
  );
  const receiverDistricts = warehouseData.filter(
    (item) => item.region === selectedReceiverWarehouse
  );

  // Dynamic Delivery Type
  useEffect(() => {
    if (selectedSenderWarehouse && selectedReceiverWarehouse) {
      if (selectedSenderWarehouse === selectedReceiverWarehouse) {
        setDeliveryType("within");
      } else {
        setDeliveryType("outside");
      }
    }
  }, [selectedSenderWarehouse, selectedReceiverWarehouse]);

  // Calculate Price
  useEffect(() => {
    totalPrice();
  }, [parcelType, weight, deliveryType]);

  const totalPrice = () => {
    let price = 0;

    if (parcelType === "document") {
      price = deliveryType === "within" ? 60 : 80;
    } else if (parcelType === "non-document") {
      if (weight <= 3) {
        price = deliveryType === "within" ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        const extraCharge = extraWeight * 40;

        if (deliveryType === "within") {
          price = 110 + extraCharge;
        } else {
          price = 150 + extraCharge + 40; // Extra district charge
        }
      }
    }

    setCalculatedPrice(price);
  };
  //tracking id****************************************

  //on submit function _____________________________________________________************
  const loggedInEmail = user?.email;
  const onSubmit = (data) => {
    const createdAt = new Date().toISOString(); // ISO format, best for backend and future display

    const parcelData = {
      ...data,
      userEmail: loggedInEmail,
      cost: calculatedPrice,
      createdAt,
      trackingId: generateTrackingID(),
      status: "Pending",
      PaymentStatus: "unpaid", // Initial status
      DelivryStatus: "not collected",
    };

    console.log(parcelData); // Full data with both emails and time

    // Continue SweetAlert or API submission

    const result = Swal.fire({
      title: "Price Breakdown",
      html: `
  <div class="text-left">
    <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
    <p><strong>Weight:</strong> ${data.weight || "Document (Any weight)"}</p>
    <p><strong>Delivery Type:</strong> ${
      deliveryType === "within" ? "Within City" : "Outside City/District"
    }</p>
    <p><strong>Logged-in User Email:</strong> ${loggedInEmail}</p>
    <p><strong>Parcel Creator Email:</strong> ${data.creatorEmail}</p>
    <p><strong>Order Time:</strong> ${createdAt}</p>
    <p class="mt-2"><strong>Total Price:</strong> ৳${calculatedPrice}</p>
    <p>Do you want to proceed to payment?</p>
  </div>
`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Cancel",
    });
    axiouSecure.post("/parcels", parcelData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Order Created!",
          text: "Your parcel has been submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Order Cancelled",
          text: "You cancelled the order.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Send Parcel Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Parcel Details</h2>

          <div>
            <label className="label">Select Parcel Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="document"
                  {...register("parcelType", { required: true })}
                  className="radio radio-primary"
                />
                Document
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("parcelType", { required: true })}
                  className="radio radio-primary"
                />
                Non-Document
              </label>
            </div>
            {errors.parcelType && (
              <p className="text-red-500 text-sm">Parcel type is required.</p>
            )}
          </div>

          <div>
            <label className="label">Parcel Description</label>
            <input
              {...register("description", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter parcel description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required.</p>
            )}
          </div>

          {parcelType === "non-document" && (
            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                {...register("weight", { required: true, min: 0.1 })}
                className="input input-bordered w-full"
                placeholder="Enter weight"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">
                  Valid weight is required for non-documents.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sender & Receiver Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Sender Details</h2>

            <div>
              <label className="label">Sender Name</label>
              <input
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Name"
              />
              {errors.senderName && (
                <p className="text-red-500 text-sm">Sender name is required.</p>
              )}
            </div>

            <div>
              <label className="label">Sender Address</label>
              <input
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Address"
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm">
                  Sender address is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Sender Contact No</label>
              <input
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Contact No"
              />
              {errors.senderContact && (
                <p className="text-red-500 text-sm">
                  Sender contact number is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Pickup Instruction</label>
              <textarea
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full"
                placeholder="Enter pickup instructions (optional)"
              ></textarea>
            </div>

            <div>
              <label className="label">Sender Pickup Warehouse</label>
              <select
                {...register("senderWarehouse", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) => setSelectedSenderWarehouse(e.target.value)}
              >
                <option value="">Select Warehouse</option>
                {[...new Set(warehouseData.map((item) => item.region))].map(
                  (region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  )
                )}
              </select>
              {errors.senderWarehouse && (
                <p className="text-red-500 text-sm">
                  Sender pickup warehouse is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Your Region</label>
              <select
                {...register("senderDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Your Region</option>
                {senderDistricts.map((district) => (
                  <option key={district.id} value={district.district}>
                    {district.district}
                  </option>
                ))}
              </select>
              {errors.senderDistrict && (
                <p className="text-red-500 text-sm">Your region is required.</p>
              )}
            </div>
          </div>

          {/* Receiver Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Set Receiver</h2>

            <div>
              <label className="label">Receiver Name</label>
              <input
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm">
                  Receiver name is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Receiver Address</label>
              <input
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Address"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm">
                  Receiver address is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Receiver Contact No</label>
              <input
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Contact No"
              />
              {errors.receiverContact && (
                <p className="text-red-500 text-sm">
                  Receiver contact number is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Delivery Instruction</label>
              <textarea
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full"
                placeholder="Enter delivery instructions (optional)"
              ></textarea>
            </div>

            <div>
              <label className="label">Set Receiver Warehouse</label>
              <select
                {...register("receiverWarehouse", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) => setSelectedReceiverWarehouse(e.target.value)}
              >
                <option value="">Select Warehouse</option>
                {[...new Set(warehouseData.map((item) => item.region))].map(
                  (region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  )
                )}
              </select>
              {errors.receiverWarehouse && (
                <p className="text-red-500 text-sm">
                  Receiver warehouse is required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Set Receiver Region</label>
              <select
                {...register("receiverDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver Region</option>
                {receiverDistricts.map((district) => (
                  <option key={district.id} value={district.district}>
                    {district.district}
                  </option>
                ))}
              </select>
              {errors.receiverDistrict && (
                <p className="text-red-500 text-sm">
                  Receiver region is required.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-8">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
