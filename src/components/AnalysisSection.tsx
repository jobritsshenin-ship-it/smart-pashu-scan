import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, CheckCircle, AlertCircle, Ruler, Scale } from "lucide-react";

interface AnalysisProps {
  images: File[];
  onAnalysisComplete: (results: any[]) => void;
}

export const AnalysisSection = ({ images, onAnalysisComplete }: AnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const analysisSteps = [
    { name: 'Image Preprocessing', duration: 2000 },
    { name: 'Feature Detection', duration: 3000 },
    { name: 'Body Measurement Extraction', duration: 4000 },
    { name: 'AI Classification', duration: 3000 },
    { name: 'Score Calculation', duration: 2000 },
  ];

  const startAnalysis = async () => {
    if (images.length === 0) return;

    setIsAnalyzing(true);
    setProgress(0);
    
    const results: any[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      // Simulate analysis steps
      for (let stepIndex = 0; stepIndex < analysisSteps.length; stepIndex++) {
        const step = analysisSteps[stepIndex];
        setCurrentStep(`Processing ${image.name}: ${step.name}`);
        
        await new Promise(resolve => setTimeout(resolve, step.duration));
        
        const stepProgress = ((i * analysisSteps.length + stepIndex + 1) / (images.length * analysisSteps.length)) * 100;
        setProgress(stepProgress);
      }

      // Mock analysis result
      const mockResult = {
        imageId: i,
        imageName: image.name,
        animalType: Math.random() > 0.5 ? 'Cattle' : 'Buffalo',
        breed: ['Holstein', 'Jersey', 'Brahman', 'Murrah', 'Nili-Ravi'][Math.floor(Math.random() * 5)],
        measurements: {
          bodyLength: Math.round(145 + Math.random() * 30),
          heightAtWithers: Math.round(125 + Math.random() * 25),
          chestWidth: Math.round(45 + Math.random() * 15),
          rumpAngle: Math.round(15 + Math.random() * 20),
          bodyWeight: Math.round(450 + Math.random() * 200),
        },
        atcScore: {
          overall: Math.round(65 + Math.random() * 30),
          bodyConformation: Math.round(60 + Math.random() * 35),
          dairyCharacter: Math.round(55 + Math.random() * 40),
          mammarySystem: Math.round(50 + Math.random() * 45),
          locomotion: Math.round(70 + Math.random() * 25),
        },
        confidence: Math.round(85 + Math.random() * 10),
        status: 'completed'
      };

      results.push(mockResult);
    }

    setAnalysisResults(results);
    onAnalysisComplete(results);
    setIsAnalyzing(false);
    setCurrentStep('Analysis Complete');
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Controls */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Ready for Analysis</h3>
              <p className="text-muted-foreground">
                {images.length} image(s) loaded • Advanced computer vision model active
              </p>
            </div>
            <Button 
              variant="hero" 
              size="lg"
              disabled={images.length === 0 || isAnalyzing}
              onClick={startAnalysis}
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>

          {/* Progress Display */}
          {isAnalyzing && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Processing Progress</span>
                    <span className="text-sm font-mono">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Brain className="w-4 h-4 animate-pulse" />
                    {currentStep}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-earth">
              <CardContent className="p-4 text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">Body Measurements</h4>
                <p className="text-xs text-muted-foreground mt-1">Precise morphometric analysis</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-earth">
              <CardContent className="p-4 text-center">
                <Scale className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">ATC Scoring</h4>
                <p className="text-xs text-muted-foreground mt-1">Standardized classification</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-earth">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-success" />
                <h4 className="font-semibold text-sm">Quality Assurance</h4>
                <p className="text-xs text-muted-foreground mt-1">Multi-point validation</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-earth">
              <CardContent className="p-4 text-center">
                <Brain className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">AI Confidence</h4>
                <p className="text-xs text-muted-foreground mt-1">Statistical reliability</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Results Summary */}
          {analysisResults.length > 0 && (
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-success">Analysis Complete</h4>
                    <p className="text-sm text-muted-foreground">
                      Successfully analyzed {analysisResults.length} animal(s) with average confidence of{' '}
                      {Math.round(analysisResults.reduce((acc, r) => acc + r.confidence, 0) / analysisResults.length)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};