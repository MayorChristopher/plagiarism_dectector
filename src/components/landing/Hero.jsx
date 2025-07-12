import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

const Hero = ({ onDemoClick }) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              AI-Powered Plagiarism Detection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Protect your content integrity with advanced machine learning
              algorithms that detect both direct copying and sophisticated
              paraphrasing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <DialogTrigger asChild>
              <Button size="lg">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
