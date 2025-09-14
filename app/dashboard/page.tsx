'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, MapPin, RefreshCw, Activity, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PredictionData {
  city: string;
  year: number | null;
  risk_level: 'Low' | 'Medium' | 'High';
  probability: number;              // 0..1
  population_affected: number;      // optional in CSV; adapter sets 0 if missing
}

interface ForecastData {
  city: string;
  target: string;                   // disease/metric name
  year: number | null;
  step: number;                     // 1..HORIZON for spacing
  predicted_cases: number;
  confidence_interval: number;      // 0 if not provided
}

export default function Dashboard() {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [forecasts, setForecasts] = useState<ForecastData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [predictionsResponse, forecastsResponse] = await Promise.all([
        fetch('/api/data?type=predictions', { cache: 'no-store' }),
        fetch('/api/data?type=forecasts', { cache: 'no-store' }),
      ]);

      const [predictionsResult, forecastsResult] = await Promise.all([
        predictionsResponse.json(),
        forecastsResponse.json(),
      ]);

      if (predictionsResult?.data) setPredictions(predictionsResult.data);
      if (forecastsResult?.data) setForecasts(forecastsResult.data);
    } catch {
      toast({
        title: 'Error loading data',
        description: 'Failed to load dashboard data from CSV files.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    toast({ title: 'Refreshing data', description: 'Loading latest predictions and forecasts...' });
    await loadData();
    toast({ title: 'Data refreshed', description: 'Dashboard updated with latest data.' });
  };

  // Filters (safe: avoid .toString() on possibly undefined)
  const filteredPredictions = predictions.filter(
    (p) =>
      (selectedCity === 'all' || p.city === selectedCity) &&
      (selectedYear === 'all' || (p.year != null && String(p.year) === selectedYear)),
  );

  const filteredForecasts = forecasts.filter(
    (f) =>
      (selectedCity === 'all' || f.city === selectedCity) &&
      (selectedYear === 'all' || (f.year != null && String(f.year) === selectedYear)),
  );

  // Unique cities & years (merge from both sources)
  const cities = Array.from(
    new Set([
      ...predictions.map((p) => p.city).filter(Boolean),
      ...forecasts.map((f) => f.city).filter(Boolean),
    ]),
  );

  const years = Array.from(
    new Set([
      ...predictions.map((p) => p.year).filter((y): y is number => y != null),
      ...forecasts.map((f) => f.year).filter((y): y is number => y != null),
    ]),
  ).sort((a, b) => a - b);

  // Risk distribution
  const riskDistribution = [
    { name: 'Low Risk', value: filteredPredictions.filter((p) => p.risk_level === 'Low').length, color: '#10B981' },
    { name: 'Medium Risk', value: filteredPredictions.filter((p) => p.risk_level === 'Medium').length, color: '#F59E0B' },
    { name: 'High Risk', value: filteredPredictions.filter((p) => p.risk_level === 'High').length, color: '#EF4444' },
  ];

  // Forecast chart data (numeric X spreads points)
  const forecastChartData = filteredForecasts.map((f) => ({
    x: f.step,
    cases: f.predicted_cases,
    city: f.city,
    target: f.target,
    confidence: f.confidence_interval,
  }));

// Aggregate risk counts per city for the Risk Levels by City chart
const cityRiskAgg = Object.values(
  filteredPredictions.reduce((acc: any, p) => {
    const city = p.city || "Unknown";
    if (!acc[city]) {
      acc[city] = { city, Low: 0, Medium: 0, High: 0 };
    }
    const level = p.risk_level || "Medium";
    if (acc[city][level] !== undefined) {
      acc[city][level] += 1;
    }
    return acc;
  }, {})
);


  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="h-8 w-8 text-orange-600" />
                Health Monitoring Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Real-time insights and predictions for water-borne diseases</p>
            </div>
            <Button onClick={refreshData} className="bg-orange-600 hover:bg-orange-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Data Filters
            </CardTitle>
            <CardDescription>Filter data by city and year to focus your analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">High Risk Areas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">
                {filteredPredictions.filter((p) => p.risk_level === 'High').length}
              </div>
              <p className="text-xs text-red-600">Cities with high risk levels</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Predictions</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{filteredPredictions.length}</div>
              <p className="text-xs text-blue-600">Active monitoring areas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Population Monitored</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {(
                  filteredPredictions.reduce((sum, p) => sum + (p.population_affected || 0), 0) / 1000
                ).toFixed(0)}
                K
              </div>
              <p className="text-xs text-green-600">People under monitoring</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
            <TabsTrigger value="forecasts">Disease Forecasts</TabsTrigger>
          </TabsList>

          {/* Predictions */}
          <TabsContent value="predictions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution Chart */}
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Risk Level Distribution</CardTitle>
                  <CardDescription>Current risk levels across monitored areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk by City Chart */}
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>Risk Levels by City</CardTitle>
                  <CardDescription>Comparative risk assessment across cities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cityRiskAgg}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Low" stackId="a" fill="#10B981" />
                    <Bar dataKey="Medium" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="High" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>


                </CardContent>
              </Card>
            </div>

            {/* Predictions Table */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detailed Risk Predictions</CardTitle>
                <CardDescription>Comprehensive risk assessment for all monitored areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">City</th>
                        <th className="text-left p-3 font-medium">Year</th>
                        <th className="text-left p-3 font-medium">Risk Level</th>
                        <th className="text-left p-3 font-medium">Probability</th>
                        <th className="text-left p-3 font-medium">Population Affected</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPredictions.map((prediction, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{prediction.city}</td>
                          <td className="p-3">{prediction.year ?? '-'}</td>
                          <td className="p-3">
                            <Badge className={getRiskColor(prediction.risk_level)}>{prediction.risk_level}</Badge>
                          </td>
                          <td className="p-3">{((prediction.probability ?? 0) * 100).toFixed(1)}%</td>
                          <td className="p-3">{(prediction.population_affected ?? 0).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecasts */}
          <TabsContent value="forecasts">
            <Card className="chart-container mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Disease Case Forecasts
                </CardTitle>
                <CardDescription>Predicted number of cases over forecast horizon</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={forecastChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" type="number" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {cities.map((city, index) => {
                      const colors = ['#F97316', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
                      return (
                        <Line
                          key={city}
                          type="monotone"
                          dataKey="cases"
                          stroke={colors[index % colors.length]}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          data={forecastChartData.filter((d) => d.city === city)}
                          name={city}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Forecast Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Forecasts</CardTitle>
                <CardDescription>Per-city, per-target predictions with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">City</th>
                        <th className="text-left p-3 font-medium">Year • Target</th>
                        <th className="text-left p-3 font-medium">Predicted Cases</th>
                        <th className="text-left p-3 font-medium">Confidence Interval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredForecasts.map((forecast, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{forecast.city}</td>
                          <td className="p-3">
                            {forecast.year ?? '-'} • {forecast.target || '—'}
                          </td>
                          <td className="p-3">{(forecast.predicted_cases ?? 0).toLocaleString()}</td>
                          <td className="p-3">±{forecast.confidence_interval ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
