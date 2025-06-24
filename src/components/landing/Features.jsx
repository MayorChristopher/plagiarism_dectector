import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Upload, FileText, Lock, Zap, BarChart3 } from 'lucide-react';

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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;