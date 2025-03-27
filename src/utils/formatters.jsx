import React from 'react';

/**
 * Formats a number as currency in Indian Rupees (INR)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats a date string into a readable format (e.g., 12 Mar 2025, 04:30 PM)
 */

export const formatDate = (date) => {
  if (!date) return "Invalid Date"; // Prevent errors
  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate.getTime())) return "Invalid Date"; // Handle bad formats

  return parsedDate.toLocaleString(); // Format correctly
};

/*export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};*/



/**
 * Generates a unique ticket ID in the format: PKG-TIMESTAMP-RANDOM
 */
export const generateTicketId = () => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
  const randomStr = Math.random().toString(36).substring(2, 8); // Generate a random alphanumeric string
  return `PKG-${timestamp}-${randomStr}`.toUpperCase(); // Convert everything to uppercase
};

/**
 * Calculates the parking fee based on duration and hourly rate.
 * The time is rounded up to the nearest 0.5 hours.
 */
export const calculateParkingFee = (entryTime, exitTime, hourlyRate) => {
  const start = new Date(entryTime).getTime(); // Convert start time to timestamp
  const end = new Date(exitTime).getTime(); // Convert end time to timestamp
  
  const durationInMs = end - start; // Difference in milliseconds
  const durationInMinutes = durationInMs / (1000 * 60); // Convert to minutes

  if (durationInMinutes <= 30) {
    return hourlyRate; // Charge full hourly rate if parked for 30 mins or less
  }

  const durationInHours = Math.ceil(durationInMinutes / 30) / 2; // Convert to hours, rounded up to 0.5 increments

  return durationInHours * hourlyRate; 
};

/**
 * Gets the current date and time as an ISO string (e.g., 2025-03-25T14:00:00.000Z)
 */
export const getCurrentDateTime = () => {
  return new Date().toISOString();
};

/**
 * Formats time from an ISO string into a readable format (e.g., 04:30 PM)
 */
export const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Ensures AM/PM format
  });
};

export const calculateDuration = (start, end) => {
  if (!end) return null;
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  // Calculate the difference in milliseconds
  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) return "Invalid duration";
  
  // Convert to hours and minutes
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`;
  } else {
    return `${diffMinutes}m`;
  }
};

/**
 * Example JSX Component to Display Formatted Values
 */
const ExampleComponent = () => {
  const sampleAmount = 250.5;
  const sampleDate = getCurrentDateTime();
  const sampleStartTime = getCurrentDateTime();
  const sampleEndTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); 
  const hourlyRate = 80; 
  
  return (
    <div>
      <h2>Formatted Data Example</h2>
      <p>Formatted Currency: {formatCurrency(sampleAmount)}</p>
      <p>Formatted Date: {formatDate(sampleDate)}</p>
      <p>Generated Ticket ID: {generateTicketId()}</p>
      <p>Parking Fee for 2 hours: {formatCurrency(calculateParkingFee(sampleStartTime, sampleEndTime, hourlyRate))}</p>
      <p>Formatted Time: {formatTime(sampleDate)}</p>
    </div>
  );
};

export default ExampleComponent;

