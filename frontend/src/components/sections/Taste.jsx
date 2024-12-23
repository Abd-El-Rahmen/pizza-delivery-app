import React from "react";
import prepp from "../../assets/prepp.png";
import prepp2 from "../../assets/prepp2.png";
import prepp3 from "../../assets/prepp3.png";

const preps = [
  {
    icon: prepp,
    title: "Prep",
    description: "Your pizza goes directly on the tray. No stone required.",
  },
  {
    icon: prepp2,
    title: "Insert",
    description:
      "Place the tray into the base skillet and secure it with the Heat Reflective Lid.",
  },
  {
    icon: prepp3,
    title: "Bake",
    description:
      "In 10 minutes you'll have an evenly cooked pizza with your toppings melted in harmony.",
  },
];

const Taste = () => {
  return (
    <div className="flex flex-col gap-3 my-8 items-center">
      <h3 className="text-2xl font-bold ">Taste The Best</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[800px] gap-4 text-center">
        {preps.map((prep, index) => (
          <div key={index} className="p-4">
            <img
              src={prep.icon}
              alt={prep.title}
              className="mx-auto w-20 h-20"
            />
            <h3 className="text-xl font-bold mt-4">{prep.title}</h3>
            <p className="text-gray-600">{prep.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taste;
