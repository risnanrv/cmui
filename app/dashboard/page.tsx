"use client";
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced chart data with gradient
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'XP Earned',
        data: [650, 590, 800, 810, 560, 550, 400, 920, 1020, 1200, 1100, 1350],
        backgroundColor: (context: import('chart.js').ScriptableContext<'bar'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(68, 89, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(68, 89, 255, 0.2)');
          return gradient;
        },
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: '#4459ff',
        barThickness: 24,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: import('chart.js').TooltipItem<'bar'>) => {
            return ` ${context.parsed.y} XP`;
          }
        }
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: '#e2e8f0',
        },
        ticks: {
          color: '#64748b',
          padding: 8,
          font: {
            size: 11,
          },
          callback: (value: number) => {
            return value === 0 ? '0' : `${value / 1000}k`;
          }
        },
      },
      x: {
        type: 'category' as const,
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
  };

  // Enhanced ads with icons and better structure
  const ads = [
    {
      id: 1,
      title: 'DeFi Yield Aggregator',
      description: 'Earn up to 25% APY on your stablecoins with our optimized strategies',
      cta: 'Start Earning',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    },
    {
      id: 2,
      title: 'NFT Marketplace',
      description: 'Mint your collection with zero gas fees this week only',
      cta: 'Explore Now',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      bg: 'bg-gradient-to-br from-purple-100 to-pink-100',
    },
    {
      id: 3,
      title: 'Web3 Developer Tools',
      description: 'Build faster with our SDK suite and $500 in free credits',
      cta: 'Get Started',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      bg: 'bg-gradient-to-br from-cyan-100 to-blue-100',
    },
  ];

  // Auto-rotate ads every 5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [ads.length, isHovered]);

  // Manual ad navigation
  const goToAd = (index: number) => {
    setCurrentAdIndex(index);
  };

  const nextAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Crypto Monkey Dashboard</h1>
        <p className="text-gray-600">Your Web3 community hub</p>
      </header> */}

   

      {/* Top Row - Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Projects</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">27</h3>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4459ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Active Days Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Days</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">40</h3>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4459ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* XP Points Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">XP Points</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">9,800</h3>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4459ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* User Rank Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">User Rank</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">#12</h3>
              <p className="text-gray-500 text-xs mt-1">of 2,500 users</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4459ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Chart and Ad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Enhanced Performance Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Monthly Progress</h2>
              <p className="text-sm text-gray-500">Your XP earnings over the past year</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-indigo-50 text-[#4459ff] rounded-full flex items-center">
                <span className="w-2 h-2 bg-[#4459ff] rounded-full mr-2"></span>
                XP Points
              </button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">Projects</button>
            </div>
          </div>
          <div className="h-72">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>Last 12 months</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-[#4459ff] rounded-full mr-2"></span>
              +32% from last year
            </span>
          </div>
        </div>

        {/* Enhanced Ad Slider */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4459ff]/5 to-purple-100/20 rounded-xl -z-0"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Web3 Spotlight</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={prevAd}
                  className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                  aria-label="Previous ad"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextAd}
                  className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                  aria-label="Next ad"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="relative flex-1 min-h-[250px]">
              {ads.map((ad, index) => (
                <div 
                  key={ad.id}
                  className={`absolute inset-0 transition-all duration-500 flex flex-col ${index === currentAdIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  <div className={`${ad.bg} p-5 rounded-lg mb-4 flex-1 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{ad.title}</h3>
                        <p className="text-gray-600 mb-4">{ad.description}</p>
                      </div>
                      <div className="p-2 bg-white/50 rounded-lg">
                        {ad.icon}
                      </div>
                    </div>
                    <button className="mt-4 bg-[#4459ff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a4bd6] transition-colors shadow-sm hover:shadow-md w-full">
                      {ad.cta}
                    </button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#4459ff]/10 rounded-full blur-xl"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-100/30 rounded-full blur-lg"></div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToAd(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentAdIndex ? 'bg-[#4459ff] w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;