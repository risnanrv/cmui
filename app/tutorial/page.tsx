"use client"
import React, { useState, useEffect } from 'react';
import { FiPlay, FiClock, FiYoutube } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Tutorial {
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
}

const TutorialPage = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample YouTube video IDs - replace with your actual video URLs
  const youtubeVideoIds = [
   'E4EwcXUfxVI', '2Y1BS4YFKho', 'VJrEhgantsM', 'JOWTIaVpojQ', '1Izqvx6_u9g', 'HS7_6M00CK8'

  ];

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const fetchedTutorials = await Promise.all(
          youtubeVideoIds.map(async (id) => {
            const response = await fetch(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
            );
            const data = await response.json();
            
            // Extract duration would require YouTube API v3 (needs API key)
            // For demo, we'll use a placeholder
            return {
              url: `https://www.youtube.com/watch?v=${id}`,
              title: data.title,
              thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
              duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` // Placeholder
            };
          })
        );
        setTutorials(fetchedTutorials);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, []);

  // For production, you would need:
  // 1. YouTube Data API v3 key for duration
  // 2. Server-side implementation to avoid exposing API key
  // 3. Proper error handling

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-3"
        >
          Web3 Tutorials
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Learn with our curated collection of YouTube tutorials
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tutorials.map((tutorial, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md group">
            {/* Thumbnail with play icon overlay */}
            <div className="relative">
              <img 
                src={tutorial.thumbnail} 
                alt={tutorial.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${tutorial.url.split('v=')[1]}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-[#4459ff] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiPlay className="text-white" size={20} />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                <FiClock className="mr-1" size={12} />
                {tutorial.duration}
              </span>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{tutorial.title}</h3>
              
              <a
                href={tutorial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#4459ff] to-[#6a45ff] hover:from-[#3a4ce6] hover:to-[#5a3ae6] text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
              >
                <FiYoutube size={16} />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TutorialPage;