import React from 'react';
import Hero_img from '../assets/Images/hero_img.jpg'

const Hero = () => {
  return (
    <div
      className="rounded-3xl shadow-2xl p-8 text-center max-w-8xl mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-12 mb-8 border-4 border-blue-400 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #67e8f9, #3b82f6, #8b5cf6)'
      }}
    >
      {/* Hero Image */}
      <div className="mb-6">
        <img
          src={Hero_img}
          alt="Hero"
          className="w-48 h-40 object-cover rounded-lg mx-auto shadow-xl border-2 border-white/30"
        />
      </div>

      {/* Welcome Text - More Interesting */}
      <h2 className="text-4xl font-bold mb-4 tracking-wide">
        <span className="bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
          ✨ Welcome to ✨
        </span>
      </h2>

      {/* Main Title - Large Size */}
      <h1 className="text-6xl font-bold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
          Amazing Platform
        </span>
      </h1>

      {/* Tagline - Small Size */}
      <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
        Discover endless possibilities with innovative solutions
      </p>
    </div>
  );
};

export default Hero;