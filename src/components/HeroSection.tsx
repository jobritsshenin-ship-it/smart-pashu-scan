import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, FileImage, Brain, Database } from "lucide-react";
import heroImage from "@/assets/hero-livestock.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
            AI-Driven Animal Type 
            <span className="block text-primary-glow">Classification Software</span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
            Revolutionizing cattle and buffalo evaluation through computer vision, 
            AI-powered trait extraction, and automated scientific scoring.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="text-lg">
              <Camera className="w-5 h-5" />
              Start Analysis
            </Button>
            <Button variant="professional" size="lg" className="text-lg">
              <Database className="w-5 h-5" />
              View Data
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <FileImage className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">Image Analysis</h3>
                <p className="text-sm opacity-90">Advanced computer vision for precise trait extraction</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">AI Classification</h3>
                <p className="text-sm opacity-90">Automated ATC scoring with scientific accuracy</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Database className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">Data Management</h3>
                <p className="text-sm opacity-90">Secure storage and comprehensive export options</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Camera className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">Field Ready</h3>
                <p className="text-sm opacity-90">Mobile interface with offline capabilities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};