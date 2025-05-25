"use client"
import React, { useState } from 'react';
import { FiClock, FiCheckCircle, FiArrowRight, FiX, FiExternalLink, FiCheck } from 'react-icons/fi';
import { FaEthereum } from 'react-icons/fa';
import { SiOptimism, SiPolygon } from 'react-icons/si';

interface Task {
  id: string;
  title: string;
  description?: string;
  url: string;
  completed: boolean;
}

interface TestnetTask {
  testnetLogo: React.ReactNode;
  testnetName: string;
  taskCount: number;
  estimatedTime: string;
  category: string;
  completedTasks: number;
  tasks: Task[];
}

interface TaskCardProps {
  testnet: TestnetTask;
  onClick: () => void;
}

interface AdBannerProps {
  content: string;
}

interface TaskModalProps {
  testnet: TestnetTask;
  onClose: () => void;
}

const TestnetLogo = ({ name, size = 24 }: { name: string; size?: number }) => {
  const logoClass = "text-gray-800";
  
  switch(name.toLowerCase()) {
    // No official icons for these, fallback to Ethereum icon
    case 'scroll':
    case 'zksync era':
    case 'starknet':
    case 'arbitrum':
    case 'base':
    case 'linea':
      return <FaEthereum size={size} className={logoClass} />;
    case 'optimism':
      return <SiOptimism size={size} className={logoClass} />;
    case 'polygon zkevm':
      return <SiPolygon size={size} className={logoClass} />;
    default:
      return <FaEthereum size={size} className={logoClass} />;
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ testnet, onClick }) => {
  const progressPercentage = (testnet.completedTasks / testnet.taskCount) * 100;

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-1 group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            {testnet.testnetLogo}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{testnet.testnetName}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {testnet.category}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between text-sm mb-5">
        <div className="flex items-center text-gray-600">
          <FiCheckCircle className="mr-1.5 text-[#4459ff]" />
          <span className="font-medium">{testnet.taskCount}</span> Tasks
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="mr-1.5 text-[#4459ff]" />
          {testnet.estimatedTime}
        </div>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>{testnet.completedTasks}/{testnet.taskCount} Completed</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#4459ff] to-[#6a45ff] h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <button className="mt-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#4459ff] to-[#6a45ff] hover:from-[#3a4ce6] hover:to-[#5a3ae6] text-white py-2.5 px-4 rounded-xl text-sm font-medium transition-all group-hover:shadow-lg">
        <span>{testnet.completedTasks > 0 ? 'Continue' : 'Start'}</span>
        <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

const TaskModal: React.FC<TaskModalProps> = ({ testnet, onClose }) => {
  const progressPercentage = (testnet.completedTasks / testnet.taskCount) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-blue-50/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <TestnetLogo name={testnet.testnetName} size={32} />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-2xl text-gray-900">{testnet.testnetName}</h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {testnet.category}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-[#4459ff]">
                  {testnet.completedTasks}/{testnet.taskCount} Completed
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-2"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Progress Section */}
        <div className="px-6 pt-4 pb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <FiClock className="mr-2 text-[#4459ff]" />
              <span>Estimated time: {testnet.estimatedTime}</span>
            </div>
            <div className="text-sm font-medium text-[#4459ff]">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#4459ff] to-[#6a45ff] h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Task List */}
        <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {testnet.tasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-xl border ${task.completed ? 'border-green-100 bg-green-50' : 'border-gray-100 bg-gray-50'} transition-all`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    {task.completed ? (
                      <div className="mt-0.5 mr-3 p-1 bg-green-100 rounded-full">
                        <FiCheck className="text-green-600" size={16} />
                      </div>
                    ) : (
                      <div className="mt-0.5 mr-3 p-1 bg-gray-200 rounded-full">
                        <div className="w-4 h-4"></div>
                      </div>
                    )}
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>
                  <a 
                    href={task.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4459ff] hover:text-[#3a4ce6] transition-colors p-1 -mr-2"
                  >
                    <FiExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
          <button 
            className="ml-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4459ff] to-[#6a45ff] hover:from-[#3a4ce6] hover:to-[#5a3ae6] text-white transition-colors font-medium"
            onClick={() => {
              // Handle complete all action
            }}
          >
            Complete All
          </button>
        </div>
      </div>
    </div>
  );
};

const AdBanner: React.FC<AdBannerProps> = ({ content }) => {
  return (
    <div className="bg-gradient-to-br from-[#4459ff] to-[#6a45ff] text-white rounded-2xl p-5 flex flex-col items-center justify-center h-full overflow-hidden relative">
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-6 -mt-6"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
      
      <div className="relative z-10 text-center">
        
        <h3 className="font-bold text-lg mb-2">Ads</h3>
       
       
      </div>
    </div>
  );
};

const DailyTasksDashboard: React.FC = () => {
  const [selectedTestnet, setSelectedTestnet] = useState<TestnetTask | null>(null);

  const testnets: TestnetTask[] = [
    {
      testnetLogo: <TestnetLogo name="Scroll" />,
      testnetName: 'Scroll',
      taskCount: 3,
      estimatedTime: '15-20 mins',
      category: 'Layer 2',
      completedTasks: 1,
      tasks: [
        {
          id: 'scroll-1',
          title: 'Bridge ETH to Scroll',
          description: 'Bridge at least 0.01 ETH to Scroll testnet',
          url: 'https://scroll.io/bridge',
          completed: true
        },
        {
          id: 'scroll-2',
          title: 'Swap tokens on Scroll',
          description: 'Make at least one swap on Scroll testnet',
          url: 'https://scroll.io/swap',
          completed: false
        },
        {
          id: 'scroll-3',
          title: 'Mint test NFT',
          description: 'Mint a test NFT on Scroll testnet',
          url: 'https://scroll.io/nft',
          completed: false
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="zkSync Era" />,
      testnetName: 'zkSync Era',
      taskCount: 5,
      estimatedTime: '25-30 mins',
      category: 'Layer 2',
      completedTasks: 2,
      tasks: [
        {
          id: 'zksync-1',
          title: 'Bridge to zkSync',
          url: 'https://zksync.io/bridge',
          completed: true
        },
        {
          id: 'zksync-2',
          title: 'Swap tokens',
          url: 'https://zksync.io/swap',
          completed: true
        },
        {
          id: 'zksync-3',
          title: 'Add liquidity',
          url: 'https://zksync.io/liquidity',
          completed: false
        },
        {
          id: 'zksync-4',
          title: 'Mint NFT',
          url: 'https://zksync.io/nft',
          completed: false
        },
        {
          id: 'zksync-5',
          title: 'Vote in governance',
          url: 'https://zksync.io/governance',
          completed: false
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="Starknet" />,
      testnetName: 'Starknet',
      taskCount: 4,
      estimatedTime: '20-25 mins',
      category: 'ZK Rollup',
      completedTasks: 0,
      tasks: [
        {
          id: 'starknet-1',
          title: 'Bridge assets',
          url: 'https://starknet.io/bridge',
          completed: false
        },
        {
          id: 'starknet-2',
          title: 'Deploy contract',
          url: 'https://starknet.io/deploy',
          completed: false
        },
        {
          id: 'starknet-3',
          title: 'Interact with dApp',
          url: 'https://starknet.io/dapps',
          completed: false
        },
        {
          id: 'starknet-4',
          title: 'Complete quiz',
          url: 'https://starknet.io/learn',
          completed: false
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="Arbitrum" />,
      testnetName: 'Arbitrum',
      taskCount: 3,
      estimatedTime: '15-20 mins',
      category: 'Optimistic Rollup',
      completedTasks: 3,
      tasks: [
        {
          id: 'arbitrum-1',
          title: 'Bridge ETH',
          url: 'https://arbitrum.io/bridge',
          completed: true
        },
        {
          id: 'arbitrum-2',
          title: 'Swap tokens',
          url: 'https://arbitrum.io/swap',
          completed: true
        },
        {
          id: 'arbitrum-3',
          title: 'Stake tokens',
          url: 'https://arbitrum.io/stake',
          completed: true
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="Optimism" />,
      testnetName: 'Optimism',
      taskCount: 3,
      estimatedTime: '15-20 mins',
      category: 'Optimistic Rollup',
      completedTasks: 1,
      tasks: [
        {
          id: 'optimism-1',
          title: 'Bridge assets',
          url: 'https://optimism.io/bridge',
          completed: true
        },
        {
          id: 'optimism-2',
          title: 'Use a dApp',
          url: 'https://optimism.io/dapps',
          completed: false
        },
        {
          id: 'optimism-3',
          title: 'Vote on proposal',
          url: 'https://optimism.io/governance',
          completed: false
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="Polygon zkEVM" />,
      testnetName: 'Polygon zkEVM',
      taskCount: 2,
      estimatedTime: '10-15 mins',
      category: 'ZK Rollup',
      completedTasks: 0,
      tasks: [
        {
          id: 'polygon-1',
          title: 'Bridge to zkEVM',
          url: 'https://polygon.technology/bridge',
          completed: false
        },
        {
          id: 'polygon-2',
          title: 'Complete transaction',
          url: 'https://polygon.technology/dapps',
          completed: false
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="Base" />,
      testnetName: 'Base',
      taskCount: 3,
      estimatedTime: '15-20 mins',
      category: 'Optimistic Rollup',
      completedTasks: 0,
      tasks: [
        {
          id: 'base-1',
          title: 'Bridge to Base',
          url: 'https://base.org/bridge',
          completed: false
        },
        {
          id: 'base-2',
          title: 'Mint NFT',
          url: 'https://base.org/nft',
          completed: false
        },
        {
          id: 'base-3',
          title: 'Swap tokens',
          url: 'https://base.org/swap',
          completed: false
        }
      ]
    },
    {
      testnetLogo: <TestnetLogo name="Linea" />,
      testnetName: 'Linea',
      taskCount: 4,
      estimatedTime: '20-25 mins',
      category: 'ZK Rollup',
      completedTasks: 1,
      tasks: [
        {
          id: 'linea-1',
          title: 'Bridge assets',
          url: 'https://linea.build/bridge',
          completed: true
        },
        {
          id: 'linea-2',
          title: 'Interact with dApp',
          url: 'https://linea.build/dapps',
          completed: false
        },
        {
          id: 'linea-3',
          title: 'Complete quest',
          url: 'https://linea.build/quests',
          completed: false
        },
        {
          id: 'linea-4',
          title: 'Provide feedback',
          url: 'https://linea.build/feedback',
          completed: false
        }
      ]
    }
  ];

  const adContent = "Unlock premium testnet tasks with 2x rewards!";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-[#4459ff] to-[#6a45ff] bg-clip-text text-transparent">
          Daily Testnet Tasks
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete tasks across multiple testnets and earn <span className="font-medium text-[#4459ff]">Crypto Monkey</span> rewards
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content - cards grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {testnets.map((testnet, index) => (
              <TaskCard 
                key={index} 
                testnet={testnet}
                onClick={() => setSelectedTestnet(testnet)}
              />
            ))}
          </div>
        </div>
        
        {/* Ads section - compact width */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-6 h-full">
            <AdBanner content={adContent} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTestnet && (
        <TaskModal 
          testnet={selectedTestnet}
          onClose={() => setSelectedTestnet(null)}
        />
      )}
    </div>
  );
};

export default DailyTasksDashboard;