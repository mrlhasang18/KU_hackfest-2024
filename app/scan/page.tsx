"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";
import QRScanner from "@/components/qr-scanner";
import { Camera, StopCircle } from "lucide-react";
import { usePoints } from "../PointContext"; // Import the PointsProvider and usePoints


export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const { addPoints } = usePoints(); // Get addPoints function from context

  const handleScan = (decodedText: string) => {
    setIsScanning(false);
    
    // Validate QR code format (RecycSmart-{unique_id}-{waste_type})
    const qrRegex = /^RecycSmart-[\w\d]+-(?:recyclable|organic|electric|non-recyclable)$/;
    
    if (!qrRegex.test(decodedText)) {
      toast({
        variant: "destructive",
        title: "Invalid QR Code",
        description: "Please scan a valid RecycSmart QR code.",
      });
      return;
    }

    const wasteType = decodedText.split("-")[2];
    const points = {
      "recyclable": 20,
      "organic": 15,
      "electric": 10,
      "non-recyclable": 5,
    }[wasteType] || 0;

    // Add points to the total points
    addPoints(points);

    toast({
      title: "Success!",
      description: `You earned ${points} points for recycling ${wasteType} waste.`,
    });
  };

  const handleError = (error: string) => {
    toast({
      variant: "destructive",
      title: "Scanner Error",
      description: error,
    });
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">QR Code Scanner</h1>
          <p className="text-muted-foreground">
            Scan the QR code on your recycling bin to earn points
          </p>
        </div>

        <div className="space-y-4">
          {isScanning ? (
            <>
              <QRScanner
                onScan={handleScan}
                onError={handleError}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsScanning(false)}
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Scanning
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              onClick={() => setIsScanning(true)}
            >
              <Camera className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}