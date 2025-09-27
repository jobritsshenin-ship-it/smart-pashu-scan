import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ImageUploadSection } from "@/components/ImageUploadSection";
import { AnalysisSection } from "@/components/AnalysisSection";
import { ResultsSection } from "@/components/ResultsSection";
import { DataManagementSection } from "@/components/DataManagementSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState('upload');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const handleImagesUploaded = (images: File[]) => {
    setUploadedImages(prev => [...prev, ...images]);
  };

  const handleAnalysisComplete = (results: any[]) => {
    setAnalysisResults(results);
    setActiveSection('results');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'upload':
        return <ImageUploadSection onImagesUploaded={handleImagesUploaded} />;
      case 'analysis':
        return (
          <AnalysisSection 
            images={uploadedImages} 
            onAnalysisComplete={handleAnalysisComplete} 
          />
        );
      case 'results':
        return <ResultsSection results={analysisResults} />;
      case 'data':
        return <DataManagementSection results={analysisResults} />;
      default:
        return <ImageUploadSection onImagesUploaded={handleImagesUploaded} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Only show when no images uploaded */}
      {uploadedImages.length === 0 && <HeroSection />}
      
      {/* Main Application */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <NavigationHeader 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <main>
          {renderActiveSection()}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="font-bold text-lg mb-2">ATC Classification System</h3>
              <p className="text-primary-foreground/80">
                Advanced AI-powered livestock evaluation for scientific research
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-primary-foreground/60">
                © 2024 Animal Type Classification Software. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
