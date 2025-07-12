import React from "react";
import { Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">
              Plagiarism Detector
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground">
            <span
              className="hover:text-primary cursor-pointer transition-colors"
              onClick={() =>
                toast({
                  title:
                    "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })
              }
            >
              Privacy Policy
            </span>
            <span
              className="hover:text-primary cursor-pointer transition-colors"
              onClick={() =>
                toast({
                  title:
                    "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })
              }
            >
              Terms of Service
            </span>
            <span
              className="hover:text-primary cursor-pointer transition-colors"
              onClick={() =>
                toast({
                  title:
                    "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })
              }
            >
              Contact
            </span>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Plagiarism Detector. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
