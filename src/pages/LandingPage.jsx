import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import AuthDialog from "@/components/landing/AuthDialog";
import DemoModal from "@/components/landing/DemoModal";

const LandingPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (authMode === "signin") {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(
          formData.email,
          formData.password,
          formData.fullName
        );
      }

      if (result.success) {
        setIsAuthOpen(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>
          Plagiarism Detector - Advanced AI-Powered Plagiarism Detection
        </title>
        <meta
          name="description"
          content="Detect plagiarism with cutting-edge AI technology. Secure document analysis, detailed reports, and comprehensive plagiarism checking for academic and professional use."
        />
      </Helmet>

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Hero onDemoClick={() => setIsDemoOpen(true)} />
            <Features />
            {/* <Testimonials /> */}
            <CTA />
          </main>
          <Footer />
        </div>
        <AuthDialog
          authMode={authMode}
          setAuthMode={setAuthMode}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Dialog>
      <DemoModal isOpen={isDemoOpen} setIsOpen={setIsDemoOpen} />
    </>
  );
};

export default LandingPage;
