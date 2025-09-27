import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Database, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Calendar,
  FileSpreadsheet,
  FileJson,
  Cloud,
  HardDrive,
  RefreshCw
} from "lucide-react";

interface DataManagementSectionProps {
  results: any[];
}

export const DataManagementSection = ({ results }: DataManagementSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleExport = (format: 'csv' | 'json' | 'xlsx') => {
    // Mock export functionality
    const data = results.map(result => ({
      imageName: result.imageName,
      animalType: result.animalType,
      breed: result.breed,
      overallScore: result.atcScore.overall,
      bodyLength: result.measurements.bodyLength,
      heightAtWithers: result.measurements.heightAtWithers,
      chestWidth: result.measurements.chestWidth,
      rumpAngle: result.measurements.rumpAngle,
      bodyWeight: result.measurements.bodyWeight,
      confidence: result.confidence,
      timestamp: new Date().toISOString()
    }));

    const filename = `atc_analysis_${new Date().toISOString().split('T')[0]}.${format}`;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const headers = Object.keys(data[0] || {});
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Overview */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management & Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{results.length}</div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {(results.length * 25).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Data Points</div>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {Math.round(results.length * 2.5)} MB
              </div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="search">Search Records</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by animal type, breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="date-filter">Filter by Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date-filter"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export & Sharing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-earth">
              <CardContent className="p-6">
                <FileSpreadsheet className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Excel Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive spreadsheet with all measurements and scores
                </p>
                <Button 
                  variant="professional" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleExport('xlsx')}
                  disabled={results.length === 0}
                >
                  Export XLSX
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-earth">
              <CardContent className="p-6">
                <FileSpreadsheet className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">CSV Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Raw data format compatible with statistical software
                </p>
                <Button 
                  variant="professional" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleExport('csv')}
                  disabled={results.length === 0}
                >
                  Export CSV
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-earth">
              <CardContent className="p-6">
                <FileJson className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">JSON Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Structured data for API integration and development
                </p>
                <Button 
                  variant="professional" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleExport('json')}
                  disabled={results.length === 0}
                >
                  Export JSON
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Integration Options */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">System Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Cloud className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Bharat Pashudhan App (BPA)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Auto-sync classification records with BPA system
                      </p>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4" />
                        Configure Sync
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-6 h-6 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold">Local Backup</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Secure offline data storage and backup options
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Backup Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Analysis History</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No analysis history available yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.slice(0, 5).map((result, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Database className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{result.imageName}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">{result.animalType}</Badge>
                        <Badge variant="secondary" className="text-xs">Score: {result.atcScore.overall}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};