import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  Car,
  Clock,
  Shield,
  CheckCircle2,
  Users,
  Smartphone,
  ChevronRight,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <NavBar />
      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">About ParkSmart</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ParkSmart transforms the parking experience with digital tickets,
              real-time monitoring, and automated fee calculation. Our system
              streamlines operations for parking attendants and provides
              convenience for drivers.
            </p>
          </div>

          {/* Hero Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Simplifying Parking Management
                </h2>
                <p className="text-gray-600 mb-6">
                  ParkSmart transforms the parking experience with digital
                  tickets, real-time monitoring, and automated fee calculation.
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Generate Ticket
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center p-4">
                <Car className="w-32 h-32 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-center text-3xl font-bold mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                    {React.createElement(feature.icon, {
                      className: "h-6 w-6 text-blue-600",
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/*How it works section */}

          <div className="mb-16">
            <h2 className="section-title text-center mb-8">How It Works</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center"
                  >
                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0
                          ? "md:pr-12 md:text-right"
                          : "md:pl-12 md:order-2"
                      }`}
                    >
                      <div className="p-6 bg-white/70 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm">
                        <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center gap-2 justify-start">
                          {index % 2 !== 0 && (
                            <ChevronRight className="h-5 w-5 text-primary" />
                          )}
                          {step.title}
                          {index % 2 === 0 && (
                            <ChevronRight className="h-5 w-5 text-primary ml-auto" />
                          )}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`relative md:w-10 flex justify-center my-4 md:my-0 ${
                        index % 2 === 0 ? "md:order-2" : ""
                      }`}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold shadow-md z-10">
                        {index + 1}
                      </div>
                    </div>
                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0
                          ? "md:order-1 md:pl-12"
                          : "md:order-1 md:pr-12 md:text-right"
                      }`}
                    >
                      <div className="flex justify-start md:justify-end">
                        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                          {React.createElement(step.icon, {
                            className: "h-12 w-12 text-primary/80",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="section-card text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Our team is here to help. Feel free to reach out for any inquiries or support.
            </p>
            <div className="flex justify-center gap-4">
              <button variant="outline" className="btn-primary">Contact Support</button>
              <button variant="default" className="btn-primary">
                <Smartphone className="mr-2 h-4 w-4" />
                Download App
              </button>
            </div>
          </div>
      </main>

      <footer className="border-t border-border/40 bg-white/50 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ParkSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: Car,
    title: "Digital Parking Tickets",
    description:
      "Generate digital parking tickets with QR codes for verification.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Automatically track parking duration and fees.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Provides secure ticket generation with unique identifiers.",
  },
  {
    icon: CheckCircle2,
    title: "Easy Administration",
    description: "Manage parking zones and restrictions easily.",
  },
  {
    icon: Users,
    title: "Multi-user Access",
    description:
      "Allow multiple attendants to access the system with permissions.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access the system on any device with a responsive web app.",
  },
];

const steps = [
  {
    icon: Car,
    title: "Vehicle Entry",
    description: "When a vehicle enters the parking facility, the attendant captures the license plate and vehicle details."
  },
  {
    icon: Clock,
    title: "Ticket Generation",
    description: "The system generates a digital parking ticket with a unique QR code, timestamp, and vehicle information."
  },
  {
    icon: Shield,
    title: "Duration Monitoring",
    description: "Parking duration is tracked in real-time, with automatic fee calculation based on time spent."
  },
  {
    icon: CheckCircle2,
    title: "Vehicle Exit",
    description: "Upon exit, the attendant scans the ticket, records the exit time, and collects the parking fee."
  }
];


export default About;
