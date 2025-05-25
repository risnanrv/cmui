"use client";

import { FiLayers, FiCalendar, FiCpu, FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: "Project Management",
      description:
        "Track all your Web3 projects in one central dashboard with real-time updates and analytics.",
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: "Daily Activities",
      description:
        "Automated tracking and smart reminders for your essential Web3 tasks and interactions.",
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "Testnet Integration",
      description:
        "Seamless connection to multiple testnets with one-click deployment and monitoring.",
    },
    {
      icon: <FiBookOpen className="w-6 h-6" />,
      title: "Educational Hub",
      description:
        "Curated Web3 tutorials, developer resources, and interactive learning modules.",
    },
  ];

  return (
    <section className="bg-[#eff6ff] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xl md:text-md font-bold text-black mb-4">
            From Chaos to Control - Web3 Made Easy{" "}
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-[#4459ff] mb-4">
            Why Choose Crypto Monkey?
          </h1>
          <p className="text-sm text-gray-600">
            Our platform simplifies web3 management with powerful tools and
            features
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-lg bg-[#4459ff]/10 flex items-center justify-center mb-4">
                <div className="text-[#4459ff]">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 right-0 -z-10 flex justify-center">
          <div className="w-64 h-64 rounded-full bg-[#4459ff]/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
