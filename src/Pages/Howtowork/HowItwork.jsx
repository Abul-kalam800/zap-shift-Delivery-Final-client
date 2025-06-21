import React from "react";

const HowItwork = () => {
  const steps = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time..",
      icon: "📅",
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: "🛠️",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: "✅",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className=" bg-white shadow-lg p-6 hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-500">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItwork;
