
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DecorativeSVGProps, SVGVariant } from "../decorative/types";
import DecorativeSVG from "../DecorativeSVG";

interface DecorativeShowcaseProps {
  className?: string;
}

export function DecorativeShowcase({ className = "" }: DecorativeShowcaseProps) {
  const [selectedVariant, setSelectedVariant] = useState<SVGVariant>('circuit');
  const [animated, setAnimated] = useState(true);
  const [color, setColor] = useState('#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState('#EC4899');
  const [size, setSize] = useState(200);

  // All available SVG variants
  const variants: SVGVariant[] = [
    'circuit', 
    'waves', 
    'constellation', 
    'abstract', 
    'geometric',
    'bubble',
    'dots',
    'grid'
  ];

  // Reset to default settings
  const resetSettings = () => {
    setColor('#8B5CF6');
    setSecondaryColor('#EC4899');
    setAnimated(true);
    setSize(200);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-gradient">Decorative SVG Library</CardTitle>
        <CardDescription>
          Explore and customize our decorative SVG components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {variants.map((variant) => (
                <Button 
                  key={variant} 
                  variant={selectedVariant === variant ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVariant(variant)}
                  className="capitalize"
                >
                  {variant}
                </Button>
              ))}
            </div>
            
            <div className="border rounded-xl p-6 flex items-center justify-center bg-muted/10">
              <div style={{ width: `${size}px`, maxWidth: '100%' }}>
                <DecorativeSVG
                  variant={selectedVariant}
                  animated={animated}
                  color={color}
                  secondaryColor={secondaryColor}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-md border" 
                      style={{ backgroundColor: color }}
                    />
                    <Input 
                      id="primaryColor" 
                      type="text" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-md border" 
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <Input 
                      id="secondaryColor" 
                      type="text" 
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Size: {size}px</Label>
                <Slider
                  id="size"
                  min={100}
                  max={500}
                  step={10}
                  value={[size]}
                  onValueChange={(value) => setSize(value[0])}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="animated" 
                  checked={animated}
                  onCheckedChange={setAnimated}
                />
                <Label htmlFor="animated">Animated</Label>
              </div>
              
              <Button onClick={resetSettings} variant="outline" size="sm">
                Reset Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
