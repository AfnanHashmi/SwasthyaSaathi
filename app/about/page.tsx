import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Brain, Globe, Users, Target, TrendingUp, Heart, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze patterns in health data to identify potential outbreaks before they occur."
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Nationwide Coverage",
      description: "Comprehensive monitoring across major Indian cities and regions, providing unified health intelligence."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Predictive Analytics",
      description: "Sophisticated forecasting models predict disease trends up to 6 months in advance with high accuracy."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Community Protection",
      description: "Protecting millions of citizens through early warning systems and preventive health measures."
    }
  ];

  const objectives = [
    {
      icon: <Target className="h-6 w-6 text-red-600" />,
      title: "Early Detection",
      description: "Identify potential water-borne disease outbreaks 2-4 weeks before traditional surveillance methods."
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      title: "Public Health",
      description: "Reduce morbidity and mortality from preventable water-borne diseases across India."
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      title: "Evidence-Based Policy",
      description: "Provide data-driven insights to support public health policy and resource allocation decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 via-white to-green-600 p-4 rounded-full">
                <Shield className="h-16 w-16 text-gray-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-orange-600">Swasthya</span><span className="text-green-600">Saathi</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              SwasthyaSaathi is India's pioneering AI-driven health monitoring platform designed to provide early warning 
              systems for water-borne diseases. Our mission is to protect public health through intelligent surveillance, 
              predictive analytics, and timely intervention strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To create a comprehensive, AI-powered health surveillance system that enables proactive public health responses 
                to water-borne diseases across India. We strive to bridge the gap between data and action, ensuring that 
                health officials and communities have the insights they need to prevent outbreaks before they occur.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full mt-1">
                    <Shield className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Proactive Prevention</h3>
                    <p className="text-gray-600">Anticipate and prevent health crises before they impact communities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Brain className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Intelligent Analysis</h3>
                    <p className="text-gray-600">Leverage cutting-edge AI to extract actionable insights from health data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community First</h3>
                    <p className="text-gray-600">Prioritize the health and well-being of all Indian communities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-green-50 p-8 rounded-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">50+</div>
                    <div className="text-sm text-gray-600">Cities Monitored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">100M+</div>
                    <div className="text-sm text-gray-600">Lives Protected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Health Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines state-of-the-art artificial intelligence with comprehensive health data 
              to deliver unprecedented insights into disease patterns and trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Strategic Objectives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our focused approach to transforming public health surveillance and disease prevention in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  {objective.icon}
                  <h3 className="font-semibold text-gray-900">{objective.title}</h3>
                </div>
                <p className="text-gray-600">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology & Innovation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built on cutting-edge technologies and methodologies to ensure reliable, scalable, and accurate health monitoring.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Machine Learning</h3>
                  <p className="text-sm text-gray-600">Advanced ML algorithms for pattern recognition and prediction</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Time Series Analysis</h3>
                  <p className="text-sm text-gray-600">Sophisticated forecasting models for disease trends</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Geospatial Analytics</h3>
                  <p className="text-sm text-gray-600">Location-based risk assessment and mapping</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Processing</h3>
                  <p className="text-sm text-gray-600">Continuous data processing and alert systems</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the Fight Against Water-borne Diseases
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Together, we can build a healthier India through intelligent surveillance and proactive health protection. 
            Explore our dashboard to see how AI is transforming public health.
          </p>
        </div>
      </section>
    </div>
  );
}