import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Download, 
  Eye, 
  Ruler, 
  Scale, 
  Award,
  TrendingUp,
  FileText 
} from "lucide-react";

interface ResultsSectionProps {
  results: any[];
}

export const ResultsSection = ({ results }: ResultsSectionProps) => {
  if (results.length === 0) {
    return (
      <Card className="shadow-medium">
        <CardContent className="p-12 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Analysis Results Yet</h3>
          <p className="text-muted-foreground">
            Upload images and run analysis to see detailed ATC classification results here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      {/* Results Overview */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analysis Results Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{results.length}</div>
              <div className="text-sm text-muted-foreground">Animals Analyzed</div>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {Math.round(results.reduce((acc, r) => acc + r.atcScore.overall, 0) / results.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. ATC Score</div>
            </div>
            <div className="text-center p-4 bg-warning/5 rounded-lg">
              <div className="text-2xl font-bold text-warning">
                {Math.round(results.reduce((acc, r) => acc + r.confidence, 0) / results.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg. Confidence</div>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {new Set(results.map(r => r.animalType)).size}
              </div>
              <div className="text-sm text-muted-foreground">Animal Types</div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline">
              <Eye className="w-4 h-4" />
              View Report
            </Button>
            <Button variant="professional">
              <Download className="w-4 h-4" />
              Export Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Results */}
      {results.map((result, index) => (
        <Card key={result.imageId} className="shadow-soft">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{result.imageName}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{result.animalType}</Badge>
                  <Badge variant="secondary">{result.breed}</Badge>
                  <Badge variant={getScoreBadgeVariant(result.confidence)}>
                    {result.confidence}% Confidence
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{result.atcScore.overall}</div>
                <div className="text-sm text-muted-foreground">Overall ATC Score</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Body Measurements */}
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-4">
                  <Ruler className="w-4 h-4" />
                  Body Measurements
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Body Length</span>
                    <span className="font-mono">{result.measurements.bodyLength} cm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Height at Withers</span>
                    <span className="font-mono">{result.measurements.heightAtWithers} cm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chest Width</span>
                    <span className="font-mono">{result.measurements.chestWidth} cm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rump Angle</span>
                    <span className="font-mono">{result.measurements.rumpAngle}°</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Est. Body Weight</span>
                    <span className="font-mono">{result.measurements.bodyWeight} kg</span>
                  </div>
                </div>
              </div>

              {/* ATC Scores Breakdown */}
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4" />
                  ATC Score Breakdown
                </h4>
                <div className="space-y-3">
                  {Object.entries(result.atcScore).map(([category, score]) => {
                    if (category === 'overall') return null;
                    const numericScore = score as number;
                    const formattedCategory = category
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase());
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{formattedCategory}</span>
                          <span className="font-mono text-sm">{numericScore}/100</span>
                        </div>
                        <Progress 
                          value={numericScore} 
                          className={`h-2 ${getScoreColor(numericScore)}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4" />
                Generate Report
              </Button>
              <Button variant="ghost" size="sm">
                <TrendingUp className="w-4 h-4" />
                Compare
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};