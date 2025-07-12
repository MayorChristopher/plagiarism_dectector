import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who trust Plagiarism Detector for
            their content integrity needs.
          </p>
          <DialogTrigger asChild>
            <Button size="lg">Start Your Free Trial Today</Button>
          </DialogTrigger>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
