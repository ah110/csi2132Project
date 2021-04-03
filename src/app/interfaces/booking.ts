export default class Booking {
  booking_id?: number;
  employee_id: number;
  customer_id: number;
  room_id: number;
  status: string;
  occupancy: number;
  rent_from: Date;
  rent_to: Date;
  paid_for: boolean;
  renting_id: number;
}
