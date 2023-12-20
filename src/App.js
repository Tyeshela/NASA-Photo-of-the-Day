import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPhotoOfTheDay = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      if (!response.ok) {
        throw new Error('Failed to fetch photo');
      }
      const data = await response.json();
      setPhotoData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotoOfTheDay();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(to right, #6dd5ed, #2193b0)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-4xl w-full p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          NASA Photo of the Day
        </motion.h1>
        {loading ? (
          <motion.p
            className="text-lg text-center"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Loading...
          </motion.p>
        ) : (
          photoData && (
            <>
              <motion.img
                src={photoData.url}
                alt={photoData.title}
                className="rounded-lg shadow-lg mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">{photoData.title}</h2>
                <p className="text-gray-700">{photoData.explanation}</p>
              </motion.div>
            </>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default App;
