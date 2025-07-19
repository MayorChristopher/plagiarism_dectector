import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, FileText, Lock, Zap, BarChart3 } from "lucide-react";

const featuresData = [
  {
    icon: Shield,
    title: "Advanced AI Detection",
    description: "State-of-the-art machine learning algorithms detect both direct copying and sophisticated paraphrasing."
  },
  {
    icon: Upload,
    title: "Multi-Format Support",
    description: "Upload documents in various formats including PDF, DOC, DOCX, TXT, and more."
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Comprehensive analysis with similarity percentages, source identification, and highlighted matches."
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your documents are encrypted and stored securely with enterprise-grade security measures."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds with our optimized processing pipeline and cloud infrastructure."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your usage, view history, and monitor plagiarism trends with detailed analytics."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Everything you need to ensure content originality and maintain academic integrity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="hover-lift"
            >
              <Card className="h-full bg-white border-slate-200 relative group">
                <CardHeader>
                  <div className="w-16 h-16 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                    <feature.icon className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                {/* Subtle highlight on hover */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 rounded-lg group-hover:border-slate-900/10" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;