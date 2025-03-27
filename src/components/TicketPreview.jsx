import React, { useRef, useState, useEffect } from "react";
import { ParkingTicket } from "../types/ticket";
import {
  formatCurrency,
  formatDate,
  formatTime,
  calculateParkingFee,
  calculateDuration
} from "../utils/formatters";
import { useToast } from "../hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'

const TicketPreview = ({ ticket, onRecordExit }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  
  const ticketRef = useRef(null);
  const { toast } = useToast();

  const [duration,setDuration] = useState(ticket.parkingDuration);
  
  useEffect(() => {
    if(ticket.entryTime && ticket.exitTime) {
      const calculatedDuration = calculateDuration(ticket.entryTime, ticket.exitTime);
      setDuration(calculatedDuration);
    }
  }, [ticket.entryTime, ticket.exitTime]);

  const parkingFee =
    ticket.entryTimeTime && ticket.exitTime && ticket.rate
      ? calculateParkingFee(ticket.entryTime, ticket.exitTime, ticket.rate)
      : 0;
  
  const handlePrint = () => {
    if (ticketRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Ticket</title>
              <style>
                body { font-family: 'Inter', sans-serif; padding: 20px; }
                .ticket-container { max-width: 300px; margin: 0 auto; }
                .ticket-footer { text-align: center; margin-top: 30px; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="ticket-container">
                ${ticketRef.current.innerHTML}
                <div class="ticket-footer">Thank you for using ParkSmart</div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
      pdf.save(`ticket_${ticket.ticketId}.pdf`);
      toast({
        title: "Ticket downloaded",
        description: "Your parking ticket has been downloaded as a PDF.",
      });
    }
  };

  useEffect(() => {
    if (ticket?.qrCodeData) {
      QRCode.toDataURL(ticket.qrCodeData)
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.log("QR code generation error", err))
    }
  }, [ticket?.qrCodeData]);
  

  const handleExitRecord = () => {
    onRecordExit();
    toast({
      title: 'Exit recorded',
      description: "Vehicle exit time has been recorded",
    })
  }

  return (
    <div className="section-card w-full md:max-w-md flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Parking Ticket</h2>
        <div className="space-x-2">
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Print Ticket"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
              />
            </svg>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Download Ticket"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={ticketRef}
        className="flex-1 bg-white border border-border rounded-lg shadow-soft p-6 transition-all"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Parking Ticket
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(ticket.issueDate)}
            </p>
          </div>
          <div className="bg-primary/10 rounded-lg p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary w-5 h-5"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-2 rounded-lg border">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QRCode" className="mt-4 w-32 h-32 mx-auto" />
            ) : (
              <p className="text-muted-foreground mt-4">Generating QR Code...</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="py-3 border-b border-dashed border-border flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Ticket ID
            </span>
            <span className="font-mono text-sm">{ticket.ticketId}</span>
          </div>

          <div className="py-3 border-b border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Vehicle Details
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                  License Plate
                </span>
                <span className="font-medium">{ticket.licensePlate}</span>
              </div>
              {(ticket.vehicleMake || ticket.vehicleModel) && (
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Vehicle</span>
                  <span className="font-medium">
                    {ticket.vehicleMake && ticket.vehicleModel
                      ? `${ticket.vehicleMake} ${ticket.vehicleModel}`
                      : ticket.vehicleMake || ticket.vehicleModel}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="py-3 border-b border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Parking Details
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Location</span>
                <span className="font-medium">{ticket.parkingLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Zone</span>
                <span className="font-medium">Zone {ticket.parkingZone}</span>
              </div>
            </div>
          </div>  

          {/* Entry and Exit Details */}
          <div className="py-3 border-b border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Entry & Exit Details</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Entry Time</span>
                  <span className="font-medium">{formatDate(ticket.entryTime)}</span>
                </div>

                {ticket.exitTime ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Exit Time</span>
                      <span className="font-medium">{formatDate(ticket.exitTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Duration</span>
                      <span className="font-medium">{duration || 'Calculating...'}</span>
                    </div>
                  </>
                ) : (
                  <div className="mt-2">
                    <button className="w-full flex items-center justify-center gap-2 btn-primary"
                      onClick={handleExitRecord}
                    >
                    <FontAwesomeIcon icon={faClockRotateLeft} className="h-4 w-4"/>
                    Record Exit Time
                    </button>
                  </div>
                )}
              </div>
          </div>
          <div className="py-3 border-b border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Time & Payment
            </h4>
            <div className="space-y-1">
              {/*<div className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                  Start Time
                </span>
                <span className="font-medium">
                  {formatTime(ticket.startTime)}
                </span>
              </div>*/}
              {/*<div className="flex justify-between">
                <span className="text-xs text-muted-foreground">End Time</span>
                <span className="font-medium">
                  {formatTime(ticket.endTime)}
                </span>
              </div>*/}
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Rate</span>
                <span className="font-medium">
                  {formatCurrency(ticket.rate)} / hour
                </span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t border-dashed border-border">
                <span className="text-sm font-medium">Total Fee</span>
                <span className="font-semibold">
                  {formatCurrency(parkingFee)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center">
            <div className="bg-black h-16 w-1.5 rounded-l-full" />
            <div className="border-t-2 border-b-2 border-dashed border-black flex-1 h-16 flex items-center justify-center bg-primary/5">
              <div className="text-center text-xs text-muted-foreground">
                <p>Please display this ticket on your dashboard</p>
                <p className="font-mono mt-1">{ticket.ticketId}</p>
              </div>
            </div>
            <div className="bg-black h-16 w-1.5 rounded-r-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPreview;
