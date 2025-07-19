import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';

const Hero = ({ onDemoClick }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Students studying together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Ensure Academic Integrity with AI-Powered Plagiarism Detection
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Our advanced AI technology helps you maintain academic honesty by detecting similarities across billions of sources, ensuring your work remains original and properly cited.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <DialogTrigger asChild>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                size="lg"
              >
                Get Started
              </Button>
            </DialogTrigger>
            <Button
              variant="outline"
              onClick={() => navigate('/contact')}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              size="lg"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
