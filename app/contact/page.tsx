import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Shield, Globe, Users, AlertTriangle } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-orange-600" />,
      title: "Headquarters",
      content: "Ministry of Health & Family Welfare\nNirman Bhavan, New Delhi - 110011\nIndia",
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Emergency Helpline",
      content: "+91-11-2306-3359\n+91-11-2306-3360\n(24x7 Available)",
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Support",
      content: "support@swasthyasaathi.gov.in\nemergency@swasthyasaathi.gov.in\ntech@swasthyasaathi.gov.in",
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Office Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nEmergency: 24/7",
    }
  ];

  const emergencyContacts = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      title: "Disease Outbreak Emergency",
      number: "1075",
      description: "Report suspected outbreaks or health emergencies"
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      title: "National Health Helpline",
      number: "104",
      description: "General health information and guidance"
    },
    {
      icon: <Users className="h-5 w-5 text-green-600" />,
      title: "Community Health Support",
      number: "108",
      description: "Emergency medical services and ambulance"
    }
  ];

  const regionalOffices = [
    { region: "Northern Region", city: "Delhi", phone: "+91-11-2306-3359" },
    { region: "Western Region", city: "Mumbai", phone: "+91-22-2652-0100" },
    { region: "Eastern Region", city: "Kolkata", phone: "+91-33-2248-5600" },
    { region: "Southern Region", city: "Chennai", phone: "+91-44-2836-0100" },
    { region: "Central Region", city: "Bhopal", phone: "+91-755-266-7700" },
    { region: "North-Eastern Region", city: "Guwahati", phone: "+91-361-260-0100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 via-white to-green-600 p-4 rounded-full">
                <Globe className="h-16 w-16 text-gray-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="text-orange-600">Swasthya</span><span className="text-green-600">Saathi</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Get in touch with our health monitoring team for support, emergency reporting, 
              or information about our AI-driven disease surveillance system.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-8 bg-red-50 border-y-2 border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold text-red-900">Health Emergency?</h2>
            </div>
            <p className="text-red-800 mb-4">
              For immediate health emergencies or suspected disease outbreaks, contact our 24/7 emergency helpline
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3">
              <Phone className="h-5 w-5 mr-2" />
              Call 1075 - Emergency Hotline
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedicated team is available to assist you with all your health monitoring needs and inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      {info.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 whitespace-pre-line">
                    {info.content}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Contacts */}
          <Card className="mb-16 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Emergency Helplines
              </CardTitle>
              <CardDescription className="text-gray-600">
                Critical health services and emergency response numbers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                    <div className="flex justify-center mb-3">
                      {contact.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contact.title}</h3>
                    <div className="text-2xl font-bold text-red-600 mb-2">{contact.number}</div>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91-98765-43210" />
                </div>
                
                <div>
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <Input id="organization" placeholder="Your organization name" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your inquiry in detail..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Regional Offices */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Regional Offices</CardTitle>
                <CardDescription className="text-gray-600">
                  Contact our regional offices for localized support and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalOffices.map((office, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{office.region}</h3>
                          <p className="text-gray-600">{office.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Direct Line</p>
                          <p className="font-medium text-orange-600">{office.phone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Technical Support</h3>
                  <p className="text-sm text-blue-800">
                    For technical issues with the dashboard or AI system, contact our dedicated tech support team:
                  </p>
                  <p className="font-medium text-blue-700 mt-1">tech@swasthyasaathi.gov.in</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about SwasthyaSaathi
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How accurate are the AI predictions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI models achieve 95% accuracy in predicting water-borne disease outbreaks, 
                  with continuous improvement through real-time data updates and model refinement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How often is the data updated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The dashboard is updated in real-time with new data processed every 6 hours. 
                  Emergency alerts are sent immediately when critical thresholds are detected.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Who can access the system?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The public dashboard is freely accessible to everyone. Administrative functions 
                  are restricted to authorized health officials and government personnel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}