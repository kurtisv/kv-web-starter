// Donnees mock centralisees pour la demo ZenSlot.
// Toutes les valeurs sont des litteraux statiques — aucun new Date() dans ce fichier.

// ── Produit ──────────────────────────────────────────────────────────────────

export const DEMO_BOOKING_PRODUCT = {
  name: "ZenSlot",
  tagline: "Votre agenda, vos clients, vos revenus — tout dans une seule plateforme.",
  description:
    "ZenSlot aide les studios, cliniques, salons, coachs et professionnels de services a gerer leurs reservations, leurs clients, leurs paiements et leurs rappels depuis une seule plateforme.",
  exampleBusiness: "Seren Studio",
  exampleType: "Studio yoga & bien-etre",
  version: "2.4.1",
};

// ── Navigation ────────────────────────────────────────────────────────────────

export const BOOKING_NAV_ITEMS = [
  { label: "Accueil",    href: "/demo/booking",          exact: true  },
  { label: "Dashboard",  href: "/demo/booking/dashboard", exact: false },
  { label: "Calendrier", href: "/demo/booking/calendar",  exact: false },
  { label: "Services",   href: "/demo/booking/services",  exact: false },
  { label: "Clients",    href: "/demo/booking/clients",   exact: false },
  { label: "Paiements",  href: "/demo/booking/payments",  exact: false },
  { label: "Parametres", href: "/demo/booking/settings",  exact: false },
] as const;

// ── Services ──────────────────────────────────────────────────────────────────

export interface DemoService {
  id: string;
  name: string;
  category: string;
  durationMin: number;
  priceCents: number;
  depositCents: number | null;
  bufferBeforeMin: number;
  bufferAfterMin: number;
  description: string;
  staffIds: string[];
  resourceIds: string[];
  isActive: boolean;
  isGroup: boolean;
  maxGroupSize?: number;
}

export const DEMO_SERVICES: DemoService[] = [
  {
    id: "yoga-hatha",
    name: "Yoga Hatha",
    category: "Yoga",
    durationMin: 60,
    priceCents: 2500,
    depositCents: null,
    bufferBeforeMin: 10,
    bufferAfterMin: 10,
    description: "Seance collective de yoga traditionnel. Tous niveaux.",
    staffIds: ["staff-1", "staff-3"],
    resourceIds: ["room-a"],
    isActive: true,
    isGroup: true,
    maxGroupSize: 12,
  },
  {
    id: "yoga-vinyasa",
    name: "Yoga Vinyasa",
    category: "Yoga",
    durationMin: 75,
    priceCents: 2800,
    depositCents: null,
    bufferBeforeMin: 10,
    bufferAfterMin: 15,
    description: "Flux dynamique synchronise avec la respiration. Niveau intermediaire.",
    staffIds: ["staff-1"],
    resourceIds: ["room-a"],
    isActive: true,
    isGroup: true,
    maxGroupSize: 10,
  },
  {
    id: "pilates-reformer",
    name: "Pilates Reformer",
    category: "Pilates",
    durationMin: 50,
    priceCents: 6500,
    depositCents: 2000,
    bufferBeforeMin: 10,
    bufferAfterMin: 15,
    description: "Seance individuelle sur reformer. Renforcement profond du core.",
    staffIds: ["staff-2"],
    resourceIds: ["reformer-1", "reformer-2"],
    isActive: true,
    isGroup: false,
  },
  {
    id: "massage-relaxant",
    name: "Massage relaxant",
    category: "Massage",
    durationMin: 60,
    priceCents: 7500,
    depositCents: 3000,
    bufferBeforeMin: 5,
    bufferAfterMin: 15,
    description: "Massage suedois complet. Decontraction et detente profonde.",
    staffIds: ["staff-4"],
    resourceIds: ["room-b"],
    isActive: true,
    isGroup: false,
  },
  {
    id: "coaching-perso",
    name: "Coaching personnel",
    category: "Coach",
    durationMin: 60,
    priceCents: 9000,
    depositCents: 4500,
    bufferBeforeMin: 10,
    bufferAfterMin: 10,
    description: "Seance individuelle de coaching bien-etre et posture.",
    staffIds: ["staff-3"],
    resourceIds: ["room-b"],
    isActive: true,
    isGroup: false,
  },
  {
    id: "meditation-guidee",
    name: "Meditation guidee",
    category: "Meditation",
    durationMin: 45,
    priceCents: 1800,
    depositCents: null,
    bufferBeforeMin: 5,
    bufferAfterMin: 10,
    description: "Seance collective de meditation pleine conscience. Tous niveaux.",
    staffIds: ["staff-1", "staff-3"],
    resourceIds: ["room-a"],
    isActive: true,
    isGroup: true,
    maxGroupSize: 15,
  },
  {
    id: "bilan-posture",
    name: "Bilan posture",
    category: "Bilan",
    durationMin: 30,
    priceCents: 0,
    depositCents: null,
    bufferBeforeMin: 5,
    bufferAfterMin: 10,
    description: "Evaluation initiale offerte. Recommandation de programme personnalise.",
    staffIds: ["staff-2", "staff-3", "staff-4"],
    resourceIds: ["room-b"],
    isActive: true,
    isGroup: false,
  },
];

// ── Staff ──────────────────────────────────────────────────────────────────────

export interface DemoStaff {
  id: string;
  name: string;
  role: string;
  bio: string;
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  specialties: string[];
  isActive: boolean;
}

export const DEMO_STAFF: DemoStaff[] = [
  {
    id: "staff-1",
    name: "Lea Fontaine",
    role: "Professeure de yoga",
    bio: "200h RYT certifiee, specialiste Hatha et Vinyasa depuis 8 ans.",
    rating: 4.9,
    reviewCount: 312,
    nextAvailable: "Mardi 15h00",
    specialties: ["Hatha", "Vinyasa", "Meditation"],
    isActive: true,
  },
  {
    id: "staff-2",
    name: "Marc Deschamps",
    role: "Instructeur Pilates",
    bio: "Certifie BASI Pilates. Reformer, mat et Pilates therapeutique.",
    rating: 4.8,
    reviewCount: 198,
    nextAvailable: "Mercredi 10h00",
    specialties: ["Reformer", "Mat Pilates", "Pilates pre/post-natal"],
    isActive: true,
  },
  {
    id: "staff-3",
    name: "Sophie Renard",
    role: "Coach bien-etre",
    bio: "Coach certifiee ICF, formatrice en techniques somatiques.",
    rating: 5.0,
    reviewCount: 87,
    nextAvailable: "Jeudi 14h00",
    specialties: ["Coaching", "Yoga doux", "Meditation"],
    isActive: true,
  },
  {
    id: "staff-4",
    name: "David Moreau",
    role: "Massotherapeute",
    bio: "Massotherapeute agree, 10 ans d experience. Massage suedois, deep tissue.",
    rating: 4.9,
    reviewCount: 445,
    nextAvailable: "Vendredi 11h00",
    specialties: ["Massage suedois", "Deep tissue", "Lymphatique"],
    isActive: true,
  },
];

// ── Locaux & Ressources ───────────────────────────────────────────────────────

export const DEMO_LOCATIONS = [
  { id: "main", name: "Seren Studio — Centre", address: "12 rue de la Paix, Lyon 69002" },
];

export const DEMO_RESOURCES = [
  { id: "room-a", name: "Salle Lotus", type: "room", capacity: 15, locationId: "main" },
  { id: "room-b", name: "Salle Zen", type: "room", capacity: 2, locationId: "main" },
  { id: "reformer-1", name: "Reformer #1", type: "equipment", capacity: 1, locationId: "main" },
  { id: "reformer-2", name: "Reformer #2", type: "equipment", capacity: 1, locationId: "main" },
];

// ── Rendez-vous ───────────────────────────────────────────────────────────────

export interface DemoAppointment {
  id: string;
  service: string;
  serviceId: string;
  staffId: string;
  staffName: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  resourceId: string;
  status: "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
  depositPaid: boolean;
  notes?: string;
  isGroup?: boolean;
  attendeeCount?: number;
  maxAttendees?: number;
}

export const DEMO_APPOINTMENTS_TODAY: DemoAppointment[] = [
  {
    id: "appt-001",
    service: "Yoga Hatha",
    serviceId: "yoga-hatha",
    staffId: "staff-1",
    staffName: "Lea Fontaine",
    clientName: "Classe de 8 participants",
    date: "2026-07-01",
    startTime: "08:00",
    endTime: "09:00",
    resourceId: "room-a",
    status: "completed",
    depositPaid: false,
    isGroup: true,
    attendeeCount: 8,
    maxAttendees: 12,
  },
  {
    id: "appt-002",
    service: "Pilates Reformer",
    serviceId: "pilates-reformer",
    staffId: "staff-2",
    staffName: "Marc Deschamps",
    clientName: "Alice M.",
    date: "2026-07-01",
    startTime: "09:30",
    endTime: "10:20",
    resourceId: "reformer-1",
    status: "completed",
    depositPaid: true,
  },
  {
    id: "appt-003",
    service: "Massage relaxant",
    serviceId: "massage-relaxant",
    staffId: "staff-4",
    staffName: "David Moreau",
    clientName: "Bernard T.",
    date: "2026-07-01",
    startTime: "10:00",
    endTime: "11:00",
    resourceId: "room-b",
    status: "in_progress",
    depositPaid: true,
  },
  {
    id: "appt-004",
    service: "Yoga Vinyasa",
    serviceId: "yoga-vinyasa",
    staffId: "staff-1",
    staffName: "Lea Fontaine",
    clientName: "Classe de 6 participants",
    date: "2026-07-01",
    startTime: "11:30",
    endTime: "12:45",
    resourceId: "room-a",
    status: "confirmed",
    depositPaid: false,
    isGroup: true,
    attendeeCount: 6,
    maxAttendees: 10,
  },
  {
    id: "appt-005",
    service: "Coaching personnel",
    serviceId: "coaching-perso",
    staffId: "staff-3",
    staffName: "Sophie Renard",
    clientName: "Isabelle G.",
    date: "2026-07-01",
    startTime: "14:00",
    endTime: "15:00",
    resourceId: "room-b",
    status: "confirmed",
    depositPaid: true,
  },
  {
    id: "appt-006",
    service: "Meditation guidee",
    serviceId: "meditation-guidee",
    staffId: "staff-3",
    staffName: "Sophie Renard",
    clientName: "Classe de 11 participants",
    date: "2026-07-01",
    startTime: "17:00",
    endTime: "17:45",
    resourceId: "room-a",
    status: "confirmed",
    depositPaid: false,
    isGroup: true,
    attendeeCount: 11,
    maxAttendees: 15,
  },
  {
    id: "appt-007",
    service: "Pilates Reformer",
    serviceId: "pilates-reformer",
    staffId: "staff-2",
    staffName: "Marc Deschamps",
    clientName: "Carlos V.",
    date: "2026-07-01",
    startTime: "18:30",
    endTime: "19:20",
    resourceId: "reformer-2",
    status: "no_show",
    depositPaid: true,
    notes: "Deuxieme absence non signalee",
  },
];

export const DEMO_APPOINTMENTS_UPCOMING: DemoAppointment[] = [
  {
    id: "appt-101",
    service: "Yoga Hatha",
    serviceId: "yoga-hatha",
    staffId: "staff-1",
    staffName: "Lea Fontaine",
    clientName: "Classe de 9 participants",
    date: "2026-07-02",
    startTime: "08:00",
    endTime: "09:00",
    resourceId: "room-a",
    status: "confirmed",
    depositPaid: false,
    isGroup: true,
    attendeeCount: 9,
    maxAttendees: 12,
  },
  {
    id: "appt-102",
    service: "Massage relaxant",
    serviceId: "massage-relaxant",
    staffId: "staff-4",
    staffName: "David Moreau",
    clientName: "Nadia K.",
    date: "2026-07-02",
    startTime: "10:00",
    endTime: "11:00",
    resourceId: "room-b",
    status: "confirmed",
    depositPaid: true,
  },
  {
    id: "appt-103",
    service: "Bilan posture",
    serviceId: "bilan-posture",
    staffId: "staff-3",
    staffName: "Sophie Renard",
    clientName: "Thomas B.",
    date: "2026-07-03",
    startTime: "09:00",
    endTime: "09:30",
    resourceId: "room-b",
    status: "confirmed",
    depositPaid: false,
  },
];

// ── Waitlist ──────────────────────────────────────────────────────────────────

export const DEMO_WAITLIST = [
  { id: "wl-1", clientName: "Fatima A.", service: "Pilates Reformer", preferredDate: "2026-07-08", addedAt: "28 juin 2026" },
  { id: "wl-2", clientName: "Jean-Pierre L.", service: "Massage relaxant", preferredDate: "2026-07-10", addedAt: "29 juin 2026" },
  { id: "wl-3", clientName: "Chloe M.", service: "Pilates Reformer", preferredDate: "2026-07-09", addedAt: "30 juin 2026" },
];

// ── Clients ───────────────────────────────────────────────────────────────────

export interface DemoClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  totalBookings: number;
  noShowCount: number;
  lifetimeValueCents: number;
  tags: string[];
  preferredStaffId?: string;
  notes?: string;
  lastVisit: string;
  upcomingBookingDate?: string;
  segment: "vip" | "regular" | "new" | "at_risk" | "lapsed";
}

export const DEMO_CLIENTS: DemoClient[] = [
  {
    id: "client-1",
    name: "Alice Martin",
    email: "alice.m@example.com",
    phone: "+33 6 12 34 56 78",
    joinedAt: "3 janvier 2025",
    totalBookings: 48,
    noShowCount: 0,
    lifetimeValueCents: 186000,
    tags: ["Pilates", "VIP", "Mensualite"],
    preferredStaffId: "staff-2",
    notes: "Prefere les creneaux matinaux. Genou droit fragile — eviter extensions forcees.",
    lastVisit: "30 juin 2026",
    upcomingBookingDate: "7 juillet 2026",
    segment: "vip",
  },
  {
    id: "client-2",
    name: "Bernard Torres",
    email: "b.torres@example.com",
    phone: "+33 7 65 43 21 09",
    joinedAt: "15 mars 2025",
    totalBookings: 22,
    noShowCount: 1,
    lifetimeValueCents: 96500,
    tags: ["Massage", "Abonnement"],
    preferredStaffId: "staff-4",
    lastVisit: "1 juillet 2026",
    upcomingBookingDate: "15 juillet 2026",
    segment: "regular",
  },
  {
    id: "client-3",
    name: "Isabelle Garnier",
    email: "isabelle.g@example.com",
    phone: "+33 6 88 99 11 22",
    joinedAt: "10 juin 2026",
    totalBookings: 3,
    noShowCount: 0,
    lifetimeValueCents: 18000,
    tags: ["Coaching", "Nouveau"],
    preferredStaffId: "staff-3",
    lastVisit: "28 juin 2026",
    upcomingBookingDate: "1 juillet 2026",
    segment: "new",
  },
  {
    id: "client-4",
    name: "Carlos Vidal",
    email: "carlos.v@example.com",
    phone: "+33 6 44 55 66 77",
    joinedAt: "5 septembre 2024",
    totalBookings: 31,
    noShowCount: 3,
    lifetimeValueCents: 142000,
    tags: ["Pilates", "A risque"],
    preferredStaffId: "staff-2",
    notes: "2 absences non signalees ce trimestre. Politique no-show a rappeler.",
    lastVisit: "1 juillet 2026",
    segment: "at_risk",
  },
  {
    id: "client-5",
    name: "Nadia Khoury",
    email: "nadia.k@example.com",
    phone: "+33 6 11 22 33 44",
    joinedAt: "20 novembre 2024",
    totalBookings: 18,
    noShowCount: 0,
    lifetimeValueCents: 76500,
    tags: ["Massage", "Yoga"],
    lastVisit: "25 juin 2026",
    upcomingBookingDate: "2 juillet 2026",
    segment: "regular",
  },
  {
    id: "client-6",
    name: "Fatima Abdi",
    email: "fatima.a@example.com",
    phone: "+33 6 99 88 77 66",
    joinedAt: "8 avril 2025",
    totalBookings: 9,
    noShowCount: 0,
    lifetimeValueCents: 32000,
    tags: ["Pilates", "Waitlist"],
    lastVisit: "10 juin 2026",
    segment: "lapsed",
  },
  {
    id: "client-7",
    name: "Thomas Beaumont",
    email: "t.beaumont@example.com",
    phone: "+33 6 55 44 33 22",
    joinedAt: "25 juin 2026",
    totalBookings: 1,
    noShowCount: 0,
    lifetimeValueCents: 0,
    tags: ["Nouveau", "Bilan"],
    lastVisit: "25 juin 2026",
    upcomingBookingDate: "3 juillet 2026",
    segment: "new",
  },
];

// ── Intake forms ──────────────────────────────────────────────────────────────

export const DEMO_INTAKE_FORMS: Array<{
  id: string;
  serviceIds: string[];
  title: string;
  fields: Array<{ label: string; type: "radio" | "textarea" | "checkbox"; options?: string[] }>;
}> = [
  {
    id: "intake-pilates",
    serviceIds: ["pilates-reformer"],
    title: "Questionnaire Pilates Reformer",
    fields: [
      { label: "Avez-vous deja pratique le Pilates ?", type: "radio", options: ["Oui", "Non"] },
      { label: "Y a-t-il des zones du corps a proteger ?", type: "textarea" },
      { label: "Etes-vous enceinte ou avez-vous accouche recemment ?", type: "radio", options: ["Oui", "Non", "Non applicable"] },
      { label: "J accepte la politique d annulation (24h)", type: "checkbox" },
    ],
  },
  {
    id: "intake-massage",
    serviceIds: ["massage-relaxant"],
    title: "Questionnaire Massage",
    fields: [
      { label: "Avez-vous des allergies aux huiles essentielles ?", type: "radio", options: ["Oui", "Non"] },
      { label: "Zones a eviter ou points sensibles ?", type: "textarea" },
      { label: "J accepte la politique d annulation (48h) et de depot", type: "checkbox" },
    ],
  },
];

export const DEMO_INTAKE_ANSWERS = {
  "client-1": {
    formId: "intake-pilates",
    answers: {
      "Avez-vous deja pratique le Pilates ?": "Oui",
      "Y a-t-il des zones du corps a proteger ?": "Genou droit — pas d extension forcee.",
    },
    consentAt: "3 janvier 2025",
  },
};

// ── Rappels ───────────────────────────────────────────────────────────────────

export const DEMO_REMINDERS = [
  { id: "rem-1", type: "confirmation",  channel: "email", delay: "0h",  template: "booking-confirmation",  status: "sent",    sentAt: "30 juin 2026 14:12" },
  { id: "rem-2", type: "reminder_24h", channel: "email", delay: "-24h", template: "booking-reminder-24h",  status: "sent",    sentAt: "30 juin 2026 10:00" },
  { id: "rem-3", type: "reminder_1h",  channel: "sms",   delay: "-1h",  template: "booking-reminder-1h",   status: "pending", sentAt: null },
  { id: "rem-4", type: "follow_up",    channel: "email", delay: "+2h",  template: "booking-follow-up",     status: "pending", sentAt: null },
];

// ── Factures & Paiements ───────────────────────────────────────────────────────

export interface DemoInvoice {
  id: string;
  ref: string;
  clientName: string;
  service: string;
  date: string;
  dueDate: string;
  amountCents: number;
  depositCents: number | null;
  status: "paid" | "pending" | "overdue" | "refunded";
  method: "card" | "transfer" | "cash" | null;
}

export const DEMO_INVOICES: DemoInvoice[] = [
  { id: "inv-1", ref: "ZS-2026-0128", clientName: "Alice Martin",   service: "Pilates Reformer x4",   date: "30 juin 2026",   dueDate: "30 juin 2026",   amountCents: 26000, depositCents: null,  status: "paid",    method: "card" },
  { id: "inv-2", ref: "ZS-2026-0127", clientName: "Bernard Torres",  service: "Massage relaxant",       date: "29 juin 2026",   dueDate: "29 juin 2026",   amountCents: 7500,  depositCents: 3000,  status: "paid",    method: "card" },
  { id: "inv-3", ref: "ZS-2026-0126", clientName: "Isabelle Garnier",service: "Coaching personnel",     date: "28 juin 2026",   dueDate: "5 juillet 2026", amountCents: 9000,  depositCents: 4500,  status: "pending", method: null   },
  { id: "inv-4", ref: "ZS-2026-0125", clientName: "Carlos Vidal",    service: "Pilates Reformer",       date: "27 juin 2026",   dueDate: "27 juin 2026",   amountCents: 6500,  depositCents: 2000,  status: "overdue", method: null   },
  { id: "inv-5", ref: "ZS-2026-0124", clientName: "Nadia Khoury",    service: "Massage relaxant",       date: "25 juin 2026",   dueDate: "25 juin 2026",   amountCents: 7500,  depositCents: 3000,  status: "paid",    method: "card" },
  { id: "inv-6", ref: "ZS-2026-0123", clientName: "Carlos Vidal",    service: "Pilates Reformer",       date: "20 juin 2026",   dueDate: "20 juin 2026",   amountCents: 6500,  depositCents: 2000,  status: "refunded",method: "card" },
];

// ── Forfaits & Memberships ────────────────────────────────────────────────────

export const DEMO_PACKAGES = [
  { id: "pkg-yoga-5",    name: "Carte 5 seances yoga",    priceCents: 11000, sessions: 5,  validDays: 60,  serviceIds: ["yoga-hatha", "yoga-vinyasa", "meditation-guidee"] },
  { id: "pkg-yoga-10",   name: "Carte 10 seances yoga",   priceCents: 20000, sessions: 10, validDays: 90,  serviceIds: ["yoga-hatha", "yoga-vinyasa", "meditation-guidee"] },
  { id: "pkg-pilates-4", name: "Carte 4 seances Pilates", priceCents: 24000, sessions: 4,  validDays: 60,  serviceIds: ["pilates-reformer"] },
  { id: "pkg-vip",       name: "Pack VIP bien-etre",      priceCents: 45000, sessions: 10, validDays: 120, serviceIds: ["yoga-hatha", "pilates-reformer", "massage-relaxant", "meditation-guidee"] },
];

export const DEMO_MEMBERSHIPS = [
  { id: "mem-unlimited-yoga", name: "Yoga illimite",         priceCents: 7900,  billingPeriod: "monthly", serviceIds: ["yoga-hatha", "yoga-vinyasa", "meditation-guidee"] },
  { id: "mem-studio-pass",    name: "Studio Pass",            priceCents: 14900, billingPeriod: "monthly", serviceIds: ["yoga-hatha", "yoga-vinyasa", "meditation-guidee", "pilates-reformer"] },
];

export const DEMO_GIFT_CARDS = [
  { id: "gc-50",  valueCents: 5000,  code: "SEREN-GIFT-50",  purchasedBy: "Jean-Pierre L.", purchasedAt: "14 juin 2026", usedAt: null },
  { id: "gc-100", valueCents: 10000, code: "SEREN-GIFT-100", purchasedBy: "Marie D.",       purchasedAt: "20 juin 2026", usedAt: "28 juin 2026" },
];

// ── Politiques ────────────────────────────────────────────────────────────────

export const DEMO_CANCELLATION_POLICY = {
  freeCancellationHours: 24,
  lateCancellationFeePercent: 50,
  noShowFeePercent: 100,
  depositRefundable: true,
  depositRefundDeadlineHours: 48,
};

export const DEMO_NO_SHOW_POLICY = {
  warningAfterCount: 2,
  blockAfterCount: 4,
  feePercent: 100,
  message: "Apres 4 absences non signalees, l acces aux reservations en ligne sera suspendu.",
};

// ── Analytics ─────────────────────────────────────────────────────────────────

export const DEMO_BOOKING_ANALYTICS = {
  today: {
    revenueEuros: 487,
    appointmentsTotal: 7,
    appointmentsCompleted: 2,
    appointmentsUpcoming: 4,
    appointmentsNoShow: 1,
    occupancyPercent: 74,
  },
  week: {
    revenueEuros: 2840,
    appointmentsTotal: 38,
    noShowRate: 4.2,
    newClients: 3,
    repeatClientRate: 82,
  },
  month: {
    revenueEuros: 11200,
    appointmentsTotal: 154,
    noShowRate: 3.8,
    newClients: 12,
    avgBookingLeadTimeDays: 4.2,
    onlineBookingPercent: 78,
    bookingSources: [
      { source: "Page booking en ligne", percent: 58 },
      { source: "Lien Instagram",        percent: 20 },
      { source: "Recommandation",        percent: 12 },
      { source: "Google",                percent: 7  },
      { source: "Autre",                 percent: 3  },
    ],
    conversionFunnel: [
      { step: "Page visitee",   count: 1240 },
      { step: "Service choisi", count: 680  },
      { step: "Creneau choisi", count: 420  },
      { step: "Formulaire",     count: 310  },
      { step: "Confirme",       count: 280  },
    ],
  },
};

// ── Activite recente ─────────────────────────────────────────────────────────

export const DEMO_BOOKING_ACTIVITY = [
  { id: "act-1", type: "booking_new",       label: "Nouvelle reservation",  detail: "Nadia K. — Massage relaxant — 2 juillet",    time: "il y a 12 min",  icon: "calendar" },
  { id: "act-2", type: "booking_cancel",    label: "Annulation",            detail: "Inconnu — Yoga Vinyasa — 2 juillet",          time: "il y a 38 min",  icon: "x" },
  { id: "act-3", type: "payment",           label: "Paiement recu",         detail: "Alice M. — Carte 10 seances — 200 EUR",       time: "il y a 1h",      icon: "credit-card" },
  { id: "act-4", type: "waitlist_notified", label: "Waitlist notifiee",     detail: "Jean-Pierre L. — Massage relaxant ouvert",   time: "il y a 2h",      icon: "bell" },
  { id: "act-5", type: "no_show",           label: "Absence non signalee",  detail: "Carlos V. — Pilates Reformer 18h30",          time: "il y a 3h",      icon: "alert-triangle" },
  { id: "act-6", type: "review",            label: "Avis client",           detail: "Bernard T. — 5/5 — Excellent massage",        time: "il y a 4h",      icon: "star" },
  { id: "act-7", type: "reminder_sent",     label: "Rappel envoye",         detail: "6 rappels email envoyes pour demain",         time: "il y a 6h",      icon: "mail" },
  { id: "act-8", type: "booking_new",       label: "Nouvelle reservation",  detail: "Thomas B. — Bilan posture — 3 juillet",       time: "il y a 8h",      icon: "calendar" },
];

// ── Planning / Disponibilites ─────────────────────────────────────────────────

export const DEMO_SCHEDULE_RULES = [
  { staffId: "staff-1", weekdays: [1, 2, 3, 4, 5], startTime: "08:00", endTime: "14:00" },
  { staffId: "staff-1", weekdays: [2, 4],           startTime: "17:00", endTime: "20:00" },
  { staffId: "staff-2", weekdays: [1, 2, 3, 4, 5], startTime: "09:00", endTime: "19:00" },
  { staffId: "staff-3", weekdays: [1, 3, 5],        startTime: "08:00", endTime: "13:00" },
  { staffId: "staff-3", weekdays: [2, 4],            startTime: "14:00", endTime: "19:00" },
  { staffId: "staff-4", weekdays: [1, 2, 3, 4, 5], startTime: "10:00", endTime: "19:00" },
];

export const DEMO_BLOCKED_TIMES = [
  { staffId: "staff-1", date: "2026-07-08", startTime: "08:00", endTime: "14:00", reason: "Conge" },
  { staffId: "staff-4", date: "2026-07-04", startTime: "10:00", endTime: "14:00", reason: "Formation" },
];

export const DEMO_WEEK_SLOTS = [
  { day: "Lun 1 jul",  slots: ["08:00", "09:00", "11:30", "14:00", "17:00"] },
  { day: "Mar 2 jul",  slots: ["08:00", "09:30", "10:00", "11:30", "14:00", "17:00"] },
  { day: "Mer 3 jul",  slots: ["09:00", "10:30", "14:00", "15:30", "17:00"] },
  { day: "Jeu 4 jul",  slots: ["08:00", "09:30", "11:00", "14:00"] },
  { day: "Ven 5 jul",  slots: ["08:00", "10:00", "11:30", "14:00", "17:00", "18:30"] },
  { day: "Sam 6 jul",  slots: ["09:00", "10:30", "12:00"] },
  { day: "Dim 7 jul",  slots: [] },
];

// ── Stats landing ─────────────────────────────────────────────────────────────

export const DEMO_BOOKING_STATS = [
  { label: "Reservations geres",   value: "850 000+", detail: "par mois sur la plateforme" },
  { label: "Taux de confirmation", value: "96 %",     detail: "des reservations confirmees" },
  { label: "Reduction no-shows",   value: "-62 %",    detail: "grace aux rappels automatiques" },
  { label: "Temps de configuration",value: "15 min",  detail: "pour demarrer depuis zero" },
];

export const DEMO_BOOKING_TESTIMONIALS = [
  {
    quote: "Avant ZenSlot, je gaspillais 2h par jour a repondre aux messages pour les rendez-vous. Maintenant, tout est automatique.",
    author: "Marie-Claire D.",
    role: "Fondatrice, Studio Lumiere — Paris",
    rating: 5,
  },
  {
    quote: "Les rappels automatiques ont reduit mes no-shows de pres de 70 %. Un investissement qui se rembourse en un mois.",
    author: "Karim B.",
    role: "Coach sportif independant",
    rating: 5,
  },
  {
    quote: "Mes clientes adorent pouvoir reserver a 23h depuis leur telephone. Et moi j adore ne plus avoir a repondre a cette heure-la.",
    author: "Sylvie R.",
    role: "Estheticienne, Aix-en-Provence",
    rating: 5,
  },
];

export const DEMO_BOOKING_FAQ = [
  {
    q: "Est-ce que ZenSlot remplace mon systeme actuel ?",
    a: "ZenSlot s integre avec votre agenda Google ou Outlook existant. Vous pouvez migrer graduellement ou basculer completement selon vos besoins.",
  },
  {
    q: "Comment fonctionnent les paiements ?",
    a: "ZenSlot est connecte a un fournisseur de paiement (simulation demo). Vous definissez vos politiques de depot et d annulation. Les paiements arrivent directement sur votre compte.",
  },
  {
    q: "Puis-je gerer plusieurs membres du personnel ?",
    a: "Oui. Chaque intervenant a son propre calendrier, ses regles de disponibilite et son lien de reservation. Vous gerez tout depuis un tableau de bord central.",
  },
  {
    q: "Les donnees sont-elles securisees ?",
    a: "Cette demo utilise uniquement des donnees fictives. La version production inclut le chiffrement TLS, la conformite RGPD et des sauvegardes automatiques quotidiennes.",
  },
  {
    q: "Y a-t-il un engagement minimum ?",
    a: "Non. Tous les plans sont sans engagement. Vous pouvez annuler ou changer de formule a tout moment depuis votre espace client.",
  },
];

// ── Integrations ──────────────────────────────────────────────────────────────

export const DEMO_BOOKING_INTEGRATIONS: Array<{
  id: string;
  name: string;
  status: "connected" | "disconnected" | "pending";
  icon: string;
  description: string;
}> = [
  { id: "google-cal",  name: "Google Calendar",  status: "connected",   icon: "calendar",     description: "Synchronisation bidirectionnelle" },
  { id: "stripe",      name: "Stripe",            status: "connected",   icon: "credit-card",  description: "Paiements et depots en ligne" },
  { id: "mailchimp",   name: "Mailchimp",         status: "connected",   icon: "mail",         description: "Listes et campagnes email" },
  { id: "zoom",        name: "Zoom",              status: "disconnected",icon: "video",        description: "Seances en ligne automatiques" },
  { id: "twilio",      name: "Twilio SMS",        status: "connected",   icon: "message",      description: "Rappels SMS" },
  { id: "outlook",     name: "Outlook Calendar",  status: "disconnected",icon: "calendar",     description: "Alternative Google Calendar" },
];

// ── Plans tarifaires ──────────────────────────────────────────────────────────

export const DEMO_BOOKING_PLANS = [
  {
    id: "starter",
    name: "Solo",
    priceCents: 2900,
    period: "mois",
    features: [
      "1 membre du personnel",
      "Reservations en ligne illimitees",
      "Rappels email automatiques",
      "Paiements en ligne",
      "Page de reservation personnalisee",
    ],
    cta: "Commencer gratuitement",
    isPopular: false,
  },
  {
    id: "pro",
    name: "Studio",
    priceCents: 7900,
    period: "mois",
    features: [
      "Jusqu a 5 membres du personnel",
      "Rappels SMS + email",
      "Classes et sessions de groupe",
      "Formulaires d admission personalises",
      "Analyses et rapports",
      "API & webhooks",
    ],
    cta: "Essayer 14 jours gratuit",
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Reseau",
    priceCents: 19900,
    period: "mois",
    features: [
      "Membres du personnel illimites",
      "Plusieurs etablissements",
      "Marque blanche",
      "Integrations sur mesure",
      "Support dedie",
      "SLA garanti",
    ],
    cta: "Contacter les ventes",
    isPopular: false,
  },
];
