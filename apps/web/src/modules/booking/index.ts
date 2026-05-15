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

export {
  parseServiceFormData,
  parseStaffFormData,
  serviceFormSchema,
  slugifyServiceName,
  staffFormSchema,
  type ServiceFormInput,
  type StaffFormInput,
} from "./management";

export {
  bookingRequestSchema,
  calculateBookingEndAt,
  hasBookingConflict,
  parseBookingRequestFormData,
  type BookingRequestInput,
  type ExistingBookingWindow,
} from "./reservation";
