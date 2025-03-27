import React, { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TicketFormData } from "../types/ticket";

const ParkingForm = ({ onSubmit }) => {
  const { toast } = useToast();
  const currentDate = new Date();
  const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000);
  const currentTime = new Date().toISOString();  


  // Function to format date-time for input fields
  const formatDateTimeForInput = (date) => {
    return date.toISOString().slice(0, 16);
  };


  const [formData, setFormData] = useState({
    licensePlate: "",
    vehicleCompany: "",
    vehicleType: "",
    parkingLocation: "",
    parkingZone: "A",
    startTime: formatDateTimeForInput(currentDate),
    endTime: formatDateTimeForInput(oneHourLater),
    rate: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.licensePlate || !formData.parkingLocation) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "error",
      });
      return;
    }

    // Check if end time is after start time
    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      toast({
        title: "Invalid time range",
        description: "End time must be after start time.",
        variant: "error",
      });
      return;
    }

    onSubmit(formData);

    toast({
      title: "Ticket generated",
      description: "Your parking ticket has been created successfully.",
      variant: "success",
    });
  };

  return (
    <div className="section-card w-full md:max-w-md">
      <h2 className="section-title">Parking Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="licensePlate" className="form-label">
                License Plate *
              </label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                className="form-input"
                value={formData.licensePlate}
                onChange={handleChange}
                placeholder="ABC-1234"
                required
              />
            </div>

            <div>
              <label htmlFor="parkingZone" className="form-label">
                Zone
              </label>
              <select
                id="parkingZone"
                name="parkingZone"
                className="form-input"
                value={formData.parkingZone}
                onChange={handleChange}
              >
                <option value="A">Zone A</option>
                <option value="B">Zone B</option>
                <option value="C">Zone C</option>
                <option value="D">Zone D</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="parkingLocation" className="form-label">
              Parking Location *
            </label>
            <input
              type="text"
              id="parkingLocation"
              name="parkingLocation"
              className="form-input"
              value={formData.parkingLocation}
              onChange={handleChange}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="vehicleCompany" className="form-label">
                Vehicle Company
              </label>
              <input
                type="text"
                id="vehicleCompany"
                name="vehicleCompany"
                className="form-input"
                value={formData.vehicleCompany}
                onChange={handleChange}
                placeholder="Toyota"
              />
            </div>

            <div>
              <label htmlFor="vehicleType" className="form-label">
                Vehicle Type
              </label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                className="form-input"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="Two-wheeler/Four-wheeler"
              />
            </div>
          </div>

          {/*<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                className="form-input"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="form-input"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>*/}

          <div>
            <label htmlFor="rate" className="form-label">
              Hourly Rate (Rs)
            </label>
            <input
              type="number"
              id="rate"
              name="rate"
              className="form-input"
              value={formData.rate}
              onChange={handleChange}
              step="0.01"
              min="0"
              disabled
            />
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-primary w-full">
            Generate Ticket
          </button>
        </div>
      </form>

      {/* Toast Container (Needed to display toasts) */}
      <ToastContainer />
    </div>
  );
};

export default ParkingForm;
