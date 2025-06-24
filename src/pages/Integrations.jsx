import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Library, Brush, Wind, Component, Code, Database, Framer, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const integrationsList = [
  {
    name: "Vite",
    description: "Next-generation frontend tooling for a faster and leaner development experience.",
    icon: Library,
  },
  {
    name: "React",
    description: "A JavaScript library for building user interfaces with a component-based architecture.",
    icon: Code,
  },
  {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building custom designs.",
    icon: Wind,
  },
  {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    icon: Component,
  },
  {
    name: "Framer Motion",
    description: "A production-ready motion library for React to create fluid animations.",
    icon: Framer,
  },
  {
    name: "Lucide React",
    description: "A simple and beautiful icon library, a fork of Feather Icons.",
    icon: Brush,
  },
  {
    name: "React Router",
    description: "The standard library for routing in React applications.",
    icon: LinkIcon,
  },
  {
    name: "Supabase (Recommended)",
    description: "The open source Firebase alternative for database, auth, and storage.",
    icon: Database,
  }
];

const Integrations = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Integrations - PlagiarismGuard</title>
        <meta name="description" content="Discover the powerful technologies and integrations used to build the PlagiarismGuard platform." />
      </Helmet>
      <div className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-7 w-7 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Technology Stack</h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Our Core Technologies</h2>
            <p className="text-muted-foreground">
              This platform is built with a modern, scalable, and efficient technology stack. Below is a list of the core integrations and libraries that power PlagiarismGuard. You can use this as a reference for your own integrations during deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationsList.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-grow">
                    <CardTitle>{item.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Integrations;