'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Play, CheckCircle, AlertCircle, Settings, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [lastProcessed, setLastProcessed] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const adminSession = sessionStorage.getItem('adminAuthenticated');
      if (adminSession !== 'true') {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV file.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      toast({
        title: "File selected",
        description: `Selected: ${selectedFile.name}`,
      });
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upload successful",
        description: "Health dataset uploaded successfully.",
      });

      // Start processing
      processData();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const processData = async () => {
    setIsProcessing(true);
    
    const steps = [
      'Validating data format...',
      'Running prediction analysis...',
      'Generating risk assessments...',
      'Creating forecast models...',
      'Updating dashboard data...',
      'Process completed!'
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setProcessingStep(steps[i]);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setLastProcessed(new Date().toLocaleString());
      toast({
        title: "Data processing complete",
        description: "New predictions and forecasts are now available on the dashboard.",
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Failed to process the data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const runPredictions = async () => {
    setProcessingStep('Running prediction models...');
    setIsProcessing(true);
    
    try {
      // Simulate API call to run predictions
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Predictions updated",
        description: "Risk predictions have been recalculated.",
      });
    } catch (error) {
      toast({
        title: "Prediction failed",
        description: "Failed to run prediction models.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const runForecasting = async () => {
    setProcessingStep('Generating forecasts...');
    setIsProcessing(true);
    
    try {
      // Simulate API call to run forecasting
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Forecasts updated",
        description: "Disease forecasts have been regenerated.",
      });
    } catch (error) {
      toast({
        title: "Forecasting failed",
        description: "Failed to generate forecasts.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-8 w-8 text-orange-600" />
            SwasthyaSaathi Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">Manage health data and AI model processing</p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Data Upload</TabsTrigger>
            <TabsTrigger value="processing">AI Processing</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Health Dataset
                  </CardTitle>
                  <CardDescription>
                    Upload a new CSV file containing health data for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">Select CSV File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                    {file && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <Button 
                    onClick={handleUpload} 
                    disabled={!file || isUploading || isProcessing}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {isUploading ? 'Uploading...' : 'Upload and Process'}
                  </Button>
                </CardContent>
              </Card>

              {/* Processing Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Processing Status
                  </CardTitle>
                  <CardDescription>
                    Current status of data processing and model updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isProcessing ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        <span className="text-sm font-medium">Processing...</span>
                      </div>
                      <p className="text-sm text-gray-600">{processingStep}</p>
                      <Progress value={undefined} className="animate-pulse" />
                    </div>
                  ) : lastProcessed ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Processing Complete</span>
                      </div>
                      <p className="text-xs text-gray-500">Last processed: {lastProcessed}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">No recent processing</span>
                      </div>
                      <p className="text-xs text-gray-500">Upload a dataset to begin processing</p>
                    </div>
                  )}

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      CSV should include columns: city, date, cases, population, water_quality, temperature
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="processing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manual Processing Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Processing</CardTitle>
                  <CardDescription>
                    Run individual AI models for predictions and forecasting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={runPredictions}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Risk Predictions
                  </Button>
                  
                  <Button 
                    onClick={runForecasting}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Generate Forecasts
                  </Button>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      These operations will update the dashboard data in real-time
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* System Information */}
              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>
                    Current system status and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Data Files</p>
                      <p className="font-medium">health_data.csv</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Update</p>
                      <p className="font-medium">{lastProcessed || 'Never'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Model Status</p>
                      <p className="font-medium text-green-600">Active</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Processing</p>
                      <p className="font-medium">
                        {isProcessing ? 'In Progress' : 'Idle'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system parameters and administrative options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Settings className="h-4 w-4" />
                    <AlertDescription>
                      System settings are configured for optimal performance. Contact system administrator for modifications.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Data Processing</h3>
                      <p className="text-sm text-gray-600">Automatic processing enabled</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Model Training</h3>
                      <p className="text-sm text-gray-600">Scheduled for off-peak hours</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Data Retention</h3>
                      <p className="text-sm text-gray-600">5 years historical data</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Backup Schedule</h3>
                      <p className="text-sm text-gray-600">Daily at 2:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}