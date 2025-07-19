import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-slate-50" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Ready to ensure your work's originality?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of students and educators who trust our AI-powered plagiarism detection to maintain academic integrity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <DialogTrigger asChild>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto"
                size="lg"
              >
                Get Started Now <ArrowRight className="ml-2 h-4 w-4 text-white" />
              </Button>
            </DialogTrigger>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
