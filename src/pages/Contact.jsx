import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Globe, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/90" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:pb-40">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:text-emerald-400 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </div>

          <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Get in touch with us for any questions, support, or feedback about our plagiarism detection service.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
              <div className="p-8">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/20">
                        <Phone className="h-7 w-7 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Phone</h3>
                      <p className="mt-2 text-lg text-slate-300">
                        <a href="tel:+2348085017786" className="hover:text-emerald-400 transition-colors">
                          +234 808 501 7786
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/20">
                        <Mail className="h-7 w-7 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Email</h3>
                      <p className="mt-2 text-lg text-slate-300">
                        <a href="mailto:mayoru24@gmail.com" className="hover:text-emerald-400 transition-colors">
                          mayoru24@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/20">
                        <Globe className="h-7 w-7 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Website</h3>
                      <p className="mt-2 text-lg text-slate-300">
                        <a 
                          href="https://mouaupd.vercel.app" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-emerald-400 transition-colors"
                        >
                          mouaupd.vercel.app
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-500/20">
                        <MapPin className="h-7 w-7 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Location</h3>
                      <p className="mt-2 text-lg text-slate-300">
                        Michael Okpara University of Agriculture, Umudike
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 