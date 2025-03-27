export const ParkingTicket = {
  licensePlate: '',
  vehicleMake: '',
  vehicleModel: '',
  parkingLocation: '',
  parkingZone: '',
  startTime: '',
  endTime: '',
  entryTime: '',
  exitTime: null,
  parkingDuration: null,
  rate: 0,
  ticketId: '',
  issueDate: '',
  qrCodeData: undefined,
};

export const TicketFormData = (ticket) => {
  const { ticketId, issueDate, qrCodeData, entryTime, exitTime, parkingDuration, ...formData } = ticket;
  return formData;
};

export const ParkingZone = {
  id: '',
  name: '',
  isFull: false,
};
