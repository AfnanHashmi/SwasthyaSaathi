import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingUp, MapPin, AlertTriangle, Users, BarChart3, Activity, Heart } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze health patterns to predict water-borne disease outbreaks before they happen."
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: "Geographic Monitoring",
      description: "Real-time monitoring across multiple cities and regions with detailed geographic insights and risk mapping."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
      title: "Early Warning System",
      description: "Automated alerts and notifications to health officials and communities about potential disease outbreaks."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Interactive Dashboard",
      description: "Comprehensive data visualization with filtering options by city, year, and risk levels for informed decision making."
    }
  ];

  const stats = [
    { icon: <Activity className="h-8 w-8 text-orange-600" />, number: "50+", label: "Cities Monitored" },
    { icon: <Heart className="h-8 w-8 text-green-600" />, number: "95%", label: "Prediction Accuracy" },
    { icon: <Shield className="h-8 w-8 text-blue-600" />, number: "24/7", label: "Real-time Monitoring" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 via-white to-green-600 p-4 rounded-full">
                <Shield className="h-16 w-16 text-gray-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-orange-600">Swasthya</span>
              <span className="text-green-600">Saathi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              AI Driven Health Monitoring Platform
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Protecting communities across India through intelligent early warning systems for water-borne diseases. 
              Leveraging artificial intelligence to predict, prevent, and respond to health crises before they spread.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                  View Dashboard
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 text-lg">
                  Learn More
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Protecting Public Health with Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with public health expertise 
              to create a robust early warning system for water-borne diseases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Explore Health Data Insights?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Access our comprehensive dashboard to view real-time predictions and forecasts 
            for water-borne disease patterns across India.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Access Dashboard
              <BarChart3 className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}