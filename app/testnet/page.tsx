// components/TestnetCardGrid.tsx
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { SiOptimism, SiPolygon, SiLine } from 'react-icons/si';
// The following icons are not available in 'react-icons/si', so we use generic icons as placeholders:
import { FaQuestionCircle } from 'react-icons/fa';

interface Testnet {
  name: string;
  description?: string;
  category?: string;
  logo: React.ReactNode;
}

const TestnetCard = ({ testnet }: { testnet: Testnet }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            {testnet.logo}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{testnet.name}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {testnet.category}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-5 line-clamp-2">
        {testnet.description}
      </p>
      
      <button className="mt-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#4459ff] to-[#6a45ff] hover:from-[#3a4ce6] hover:to-[#5a3ae6] text-white py-2 px-4 rounded-lg text-sm font-medium transition-all">
        <FaPlus size={12} />
        <span>Add to Tasks</span>
      </button>
    </div>
  );
};

const TestnetCardGrid = () => {
  const testnets = [
    {
      name: "Scroll",
      logo: <FaQuestionCircle size={24} className="text-gray-800" />
    },
    {
      name: "zkSync Era",
      description: "ZK-Rollup with full EVM compatibility",
      category: "Layer 2",
      logo: <FaQuestionCircle size={24} className="text-gray-800" />
    },
    {
      name: "Starknet",
      description: "Scalable Validity-Rollup for Ethereum",
      category: "ZK Rollup",
      logo: <FaQuestionCircle size={24} className="text-gray-800" />
    },
    {
      name: "Arbitrum",
      description: "Optimistic rollup for scaling Ethereum",
      category: "Layer 2",
      logo: <FaQuestionCircle size={24} className="text-gray-800" />
    },
    {
      name: "Optimism",
      description: "Low-cost optimistic rollup for Ethereum",
      category: "Layer 2",
      logo: <SiOptimism size={24} className="text-gray-800" />
    },
    {
      name: "Polygon zkEVM",
      description: "ZK-Rollup with EVM compatibility",
      category: "ZK Rollup",
      logo: <SiPolygon size={24} className="text-gray-800" />
    },
    {
      name: "Base",
      description: "Ethereum L2 incubated by Coinbase",
      category: "Layer 2",
      logo: <FaQuestionCircle size={24} className="text-gray-800" />
    },
    {
      name: "Linea",
      description: "ConsenSys zkEVM rollup for Ethereum",
      category: "ZK Rollup",
      logo: <SiLine size={24} className="text-gray-800" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {testnets.map((testnet, index) => (
          <TestnetCard key={index} testnet={testnet} />
        ))}
      </div>
    </div>
  );
};

export default TestnetCardGrid;