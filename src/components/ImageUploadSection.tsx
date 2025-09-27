import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, X, Camera, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadSectionProps {
  onImagesUploaded: (images: File[]) => void;
}

export const ImageUploadSection = ({ onImagesUploaded }: ImageUploadSectionProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        toast({
          title: "File too large",
          description: `${file.name} exceeds 20MB limit`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      onImagesUploaded(validFiles);
      toast({
        title: "Images uploaded successfully",
        description: `${validFiles.length} image(s) ready for analysis`,
      });
    }
  }, [onImagesUploaded, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Image Upload & Capture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileImage className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload Cattle/Buffalo Images</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop images here or click to select files
            </p>
            <Button 
              variant="professional"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Upload className="w-4 h-4" />
              Select Images
            </Button>
            <Input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {/* Image Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-accent/50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 text-primary">Image Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear side profile view preferred</li>
                  <li>• Animal should be standing naturally</li>
                  <li>• Good lighting and minimal shadows</li>
                  <li>• High resolution (minimum 1024px)</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-success/10">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 text-success">Optimal Conditions</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Neutral background</li>
                  <li>• Full body visible</li>
                  <li>• Multiple angle shots</li>
                  <li>• Recent photographs</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Uploaded Images ({uploadedFiles.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs truncate max-w-full">
                        {file.name}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};