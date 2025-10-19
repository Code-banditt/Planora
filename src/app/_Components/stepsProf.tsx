"use client";

export default function ProFeatures() {
  const features = [
    {
      title: "Track Appointments",
      description:
        "View upcoming bookings in real-time and keep your schedule organized.",
    },
    {
      title: "Manage Clients",
      description:
        "Access client details, notes, and service history instantly.",
    },
    {
      title: "Grow Your Business",
      description:
        "Monitor analytics and insights to improve your services and reach more clients.",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-2xl text-gray-900 font-bold mb-10">
        Your Dashboard Tools
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl text-black font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
