export const bookingModule = {
  key: "booking",
  routes: ["/booking", "/dashboard/bookings"],
};

export {
  generateBookingSlots,
  minutesToTime,
  timeToMinutes,
  type AvailabilityException,
  type AvailabilityRule,
  type BookedInterval,
  type BookingSlot,
} from "./availability";
