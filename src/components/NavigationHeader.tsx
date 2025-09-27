import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, BarChart3, Database, Settings, Upload } from "lucide-react";

interface NavigationHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const NavigationHeader = ({ activeSection, onSectionChange }: NavigationHeaderProps) => {
  const sections = [
    { id: 'upload', name: 'Image Upload', icon: Upload },
    { id: 'analysis', name: 'Analysis', icon: Camera },
    { id: 'results', name: 'Results', icon: BarChart3 },
    { id: 'data', name: 'Data Management', icon: Database },
  ];

  return (
    <Card className="shadow-medium">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">ATC Analysis Platform</h2>
            <p className="text-muted-foreground">Professional livestock evaluation and classification system</p>
          </div>
          
          <nav className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(section.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {section.name}
                </Button>
              );
            })}
            <Button variant="ghost">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </nav>
        </div>
      </CardContent>
    </Card>
  );
};