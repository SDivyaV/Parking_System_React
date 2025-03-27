import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParkingForm from '../components/ParkingForm';
import TicketPreview from '../components/TicketPreview';
import NavBar from '../components/NavBar';
import { generateTicketId, getCurrentDateTime } from '../utils/formatters';


const Index = () => {
  const [ticket, setTicket] = useState(null);

  const currentTime = new Date().toISOString();  

  const handleFormSubmit = (formData) => {
    //Generate QR code data
    const ticketId = generateTicketId();
    const qrCodeData = JSON.stringify({
      ticketId,
      licensePlate: formData.licensePlate,
      zone: formData.zone,
      startTime: formData.startTime,
      endTime: formData.endTime,
      entryTime: currentTime,
    })

    // Generate a complete ticket with ID and issue date
    const completeTicket = {
      ...formData,
      ticketId,
      issueDate: getCurrentDateTime(),
      issueDate: currentTime,
      entryTime: currentTime,
      exitTime: null,
      parkingDuration: null,
      qrCodeData,
    };

    setTicket(completeTicket);
  };

  //Handle recording exit time and calculating duration
  const handleRecordExit = () => {
    if(ticket){
      const exitTime = getCurrentDateTime();
      setTicket({
        ...ticket,
        exitTime,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="page-title">Parking Ticket Generator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Effortlessly generate professional parking tickets with ParkSmart.Simply enter the parking details, and ParkSmart will instantly create a well-designed, organized, and easily readable ticket
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div className="animate-slide-in-right delay-75">
              <ParkingForm onSubmit={handleFormSubmit} />
            </div>
            
            <div className="animate-slide-in-right delay-150">
              {ticket ? (
                <TicketPreview 
                  ticket={ticket} 
                  onRecordExit={handleRecordExit}
                />
              ) : (
                <div className="section-card w-full md:max-w-md flex flex-col justify-center items-center py-16">
                  <div className="bg-primary/10 rounded-full p-6 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary w-8 h-8"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Ticket Generated</h3>
                  <p className="text-center text-muted-foreground">
                    Fill out the form to generate your parking ticket. 
                    It will appear here.
                  </p>
                </div>
              )}
            </div>
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

export default Index;
